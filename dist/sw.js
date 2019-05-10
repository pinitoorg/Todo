function precache(){return caches.open(CACHE).then(function(n){return n.addAll(["./index.html","./manifest.json","./robots.txt","css/font-awesome.min.css","css/main.css","images/todo.png","images/todo-icon.ico","images/todo-icon256.png","images/todo-logo256.png","images/todo-logo512.png","js/autosize.min.js","js/highlight.min.js","js/jquery-3.4.0.min.js","js/main.js","js/marked.min.js","js/tail.datetime.min.js","webfonts/fa-brands-400.woff","webfonts/fa-brands-400.woff2","webfonts/fa-regular-400.woff","webfonts/fa-regular-400.woff2","webfonts/fa-solid-900.woff","webfonts/fa-solid-900.woff2","fonts/OpenSans-Bold.ttf","fonts/OpenSans-Italic.ttf","fonts/OpenSans-Light.ttf","fonts/OpenSans-Regular.ttf","fonts/OpenSans-SemiBold.ttf"])})}function fromNetwork(o,s){return new Promise(function(t,n){var e=setTimeout(n,s);fetch(o).then(function(n){clearTimeout(e),t(n)},n)})}function fromCache(t){return caches.open(CACHE).then(function(n){return n.match(t).then(function(n){return n||Promise.reject("no-match")})})}var CACHE="2.1.3";self.addEventListener("install",function(n){n.waitUntil(precache())}),self.addEventListener("fetch",function(n){n.respondWith(fromNetwork(n.request,400).catch(function(){return fromCache(n.request)}))});