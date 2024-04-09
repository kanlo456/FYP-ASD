import { Outlet } from 'react-router-dom';
import ASDNavbar from './Navbar';

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