// TypeScript 特有の書き方
// 通常の JavaScript であれば、self というグローバル変数でアクセスできます。
// しかし TypeScript だと型定義の兼ね合いで self にアクセスできないと判定されてビルドができません。
// そこで self as any と書くことで型チェックを回避
// any は何でもOKという意味合いで、TypeScript はチェックを行わなくなります。
const worker: Worker = self as any;

// メインスレッドからデータを渡された際に実行する関数を定義
worker.addEventListener('message', (event) => {
    // メインスレッドから渡されたデータをコンソールに出力
    // data というパラメーターが、メインスレッドから渡された値
    console.log('Worker Received', event.data);

    // メインスレッドへ処理結果を送信
    worker.postMessage({ result: event.data });
});