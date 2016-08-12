
// Service Worker 不使用的时候会被关闭
// 以节省内存
// 所以任何全局状态都可能随时消失
// 
// 如果要做持久化  indexedDB


// ServiceWorker 脚本每次都会检查更新
// 当 ServiceWorker 脚本 scope 下的所有页面关闭之后
// 再重新打开的时候
// 才会使用新版本的 ServiceWorker
// 

console.log("SW startup");
// 首次安装的时候
self.addEventListener('install', function(event) {
    console.log("SW installed");
});


// 旧版本被新版本替代的时候
// 这时候可以做一些缓存清理的工作
self.addEventListener('activate', function(event) {
    console.log("SW activated");
});


self.addEventListener('fetch', function(event) {
    console.log("Caught a fetch!");
    event.respondWith(new Response('hello world~'));
    // event.respondWith(new Response('23333333~'));
});

