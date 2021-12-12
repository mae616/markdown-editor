// Web Worker と同じように self はサービスワーカー自身を指します
self.addEventListener('install', (event) => {
    console.log('ServiceWorker install:', event);
});

self.addEventListener('activate', (event) => {
    console.log('ServiceWorker activate:', event);
});

// fetch イベント時に実行する処理を登録
self.addEventListener('fetch', (event) => {
    console.log('Fetch to:', event.request.url);
    // ネットワークリクエストを行って結果をメインスレッドに戻す処理
    // event.respondWith は、非同期処理（Promise）の実行終了まで待機してくれるメソッド
    event.respondWith(fetch(event.request));
});