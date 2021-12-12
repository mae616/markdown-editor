// キャッシュの名前を定義
// キャッシュAPIは、このキャッシュ名に応じて別のキャッシュを提供してくれる
const CacheName = 'Cache:v1';

// Web Worker と同じように self はサービスワーカー自身を指します
self.addEventListener('install', (event) => {
    console.log('ServiceWorker install:', event);
});

self.addEventListener('activate', (event) => {
    console.log('ServiceWorker activate:', event);
});

const networkFallingBackToCache = async (request) => {
    // 定義した名前で、キャッシュを開く
    const cache = await caches.open(CacheName);
    try {
        const response = await fetch(request);
        // コピーしたものをキャッシュに保存
        // (レスポンスの内部で一度しか読み取りできない処理があるため)
        await cache.put(request, response.clone());
        // レスポンスを呼び出し元に返却
        return response;
    } catch (err) {
        console.error(err);
        // キャッシュの内容を返却する
        // 適切なキャッシュが無い場合、戻り値は undefined になる
        // (エラーの場合、適切な返却値がないのでそのままで良い)
        return cache.match(request);
    }
}


// fetch イベント時に実行する処理を登録
self.addEventListener('fetch', (event) => {
    console.log('Fetch to:', event.request.url);
    // ネットワークリクエストを行って結果をメインスレッドに戻す処理
    // event.respondWith は、非同期処理（Promise）の実行終了まで待機してくれるメソッド
    event.respondWith(networkFallingBackToCache(event.request));
});