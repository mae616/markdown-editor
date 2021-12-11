import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../components/header';
import {
    getMemos,
    MemoRecord
} from '../indexeddb/memos';

const HeaderArea = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
`;

const Wrapper = styled.div`
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 3rem;
    padding: 0 1rem;
`;

const Memo = styled.button`
    display: block;
    background-color: white;
    width: 100%;
    padding: 1rem;
    margin: 1rem 0;
    text-align: left;
`;

const MemoTitle = styled.div`
    font-size: 1rem;
    margin-bottom: 0.5rem;
`;

const MemoText = styled.div`
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const History: React.FC = () => {
    const [memos, setMemos] = useState<MemoRecord[]>([]);

    useEffect(() => {
        //  getMemos 関数を実行し、非同期処理が終わったら取得したテキスト履歴を setMemos に渡して更新している。
        //  setMemos によって更新されると再描画が実行される。
        getMemos().then(setMemos);
    }, []);

    return (
        <>
            <HeaderArea>
                <Header title="履歴">
                    <Link to='/editor'>
                        エディタに戻る
                    </Link>
                </Header>
            </HeaderArea>
            <Wrapper>
                {memos.map(memo => (
                    <Memo key={memo.datetime}>
                        <MemoTitle>{memo.title}</MemoTitle>
                        <MemoText>{memo.text}</MemoText>
                    </Memo>
                ))}
            </Wrapper>
        </>
    );
};