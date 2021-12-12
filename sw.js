// Web Worker と同じように self はサービスワーカー自身を指します
self.addEventListener('install', (event) => {
    console.log('ServiceWorker install:', event);
});

self.addEventListener('activate', (event) => {
    console.log('ServiceWorker activate:', event);
});