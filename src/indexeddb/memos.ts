import Dexie from 'dexie';

// TypeScriptの型定義（保存するデータ型の定義）
export interface MemoRecord {
    datetime: string
    title: string
    text: string
}

// データベース名 markdown-editor
const database = new Dexie('markdown-editor');
// インデックスとなるデータ名の指定　({テーブル: インデックス})
database.version(1).stores({ memos: '&datetime' });
// MemoRecord(TypeScriptのデータの型), string(キーとなるデータ、今回はdatetimeの型)
const memos: Dexie.Table<MemoRecord, string> = database.table('memos');

export const putMemo = async (title: string, text: string): Promise<void> => {
    const datetime = new Date().toISOString();
    await memos.put({ datetime, title, text });
}

// 1ページあたり10件
const NUM_PER_PAGE: number = 10;

// 全ページ数を取得
export const getMemoPageCount = async (): Promise<number> => {
    const totalCount = await memos.count();
    const pageCount = Math.ceil(totalCount / NUM_PER_PAGE);
    return pageCount > 0 ? pageCount : 1;
}

// pageを元にmemosの配列を取得
// 例えば引数 page に 3 が設定されている場合、30件目から10件（30〜39件目）を取得する
export const getMemos = (page: number): Promise<MemoRecord[]> => {
    // ページ数をもとに、取得する最初に位置（OFFSET）を算出
    const offset = (page - 1) * NUM_PER_PAGE;
    return memos.orderBy('datetime')    // （保存した日時）の昇順（古い順）で取得
        .reverse()  // 並び順を逆にする
        .offset(offset) // offset は取得するリスト内の開始位置
        .limit(NUM_PER_PAGE)    // 取得する件数
        .toArray(); // 取得したデータを配列に変換して返却
}