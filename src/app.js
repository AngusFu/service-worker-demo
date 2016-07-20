if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {
        console.log(reg);
        if (reg.installing) {
            console.log('Service worker installing');
        } else if (reg.waiting) {
            console.log('Service worker installed');
        } else if (reg.active) {
            console.log('Service worker active');
        }

    }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
};

// function for loading each image via XHR

function imgLoad(imgJSON) {
    // return a promise for an image loading
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', imgJSON.url);
        request.responseType = 'blob';

        request.onload = function() {
            if (request.status == 200) {
                resolve(request.response);
            } else {
                reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
            }
        };

        request.onerror = function() {
            reject(Error('There was a network error.'));
        };

        // Send the request
        request.send();
    });
};

var body = document.querySelector('body');

window.onload = function() {
    for (i = 0; i <= imgs - 1; i++) {
        imgLoad(imgs[i]).then(function(res) {

            var myImage = document.createElement('img');
            var myFigure = document.createElement('figure');
            var imageURL = window.URL.createObjectURL(res);

            myImage.src = imageURL;
            body.appendChild(myFigure);
            myFigure.appendChild(myImage);

        }, function(Error) {
            console.log(Error);
        });
    };

};
