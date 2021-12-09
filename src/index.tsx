import { render } from 'react-dom';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import { Editor } from './pages/editor';
import { History } from './pages/history';

const GlobalStyle = createGlobalStyle`
    body * {
        box-sizing: border-box;
    }
`;

const Main = (
    <>
        <GlobalStyle />
        <Router>
            <Routes>
                <Route path='editor' element={<Editor />} />
                <Route path='history' element={<History />} />
                <Route path='*' element={<Navigate to='editor'/>} />
            </Routes>
        </Router>
    </>
);

render(Main, document.getElementById('app'));
