import { Outlet } from 'react-router-dom';
import ASDNavbar from '../components/Navbar';

function RootLayout() {
    return (
        <>
            <ASDNavbar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout