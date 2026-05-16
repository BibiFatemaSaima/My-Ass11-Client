import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;