import { Outlet } from 'react-router'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function UserLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

