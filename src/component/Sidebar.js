
import LoginPage from '@/app/login/page';
import MSGPage from '@/app/msg/page';

export default function Sidebar({children}) {
    return (
        <>
            <div>
                <LoginPage/>
                <MSGPage/>
            </div>
        </>
    )
}