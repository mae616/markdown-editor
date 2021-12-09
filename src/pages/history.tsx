import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';

export const History: React.FC = () =>{
    const navigate = useNavigate();

    return (
        <>
            <h1>History</h1>
            <Button onClick={() => navigate('/editor')}>
                エディタへ戻る
            </Button>
        </>
    );
};