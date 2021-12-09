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
database.version(1).stores({ memos: '&datetime'});
// MemoRecord(TypeScriptのデータの型), string(キーとなるデータ、今回はdatetimeの型)
const memos: Dexie.Table<MemoRecord, string> = database.table('memos');

export const putMemo = async (title: string, text: string): Promise<void> => {
    const datetime = new Date().toISOString();
    await memos.put({datetime, title, text});
}