import {Outlet} from 'react-router-dom';
import Navbar from '../../components/Shaired/Navbar/Navbar';
import Footer from '../../components/Shaired/Footer/Footer';

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Layout;