//Temporary Admin Portal Landing Page

import AdminHome from './AdminPortal/Home/AdminHome';
import Clients from './AdminPortal/Clients/Clients';
import SchedulingHome from './AdminPortal/Scheduling/SchedulingHome';
import AdminFooter from './AdminPortal/Components/Footer/AdminFooter';
import AdminNavbar from './AdminPortal/Components/Navbar/AdminNavbar';
import Menu from './AdminPortal/Components/Menu/Menu';
import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet
  } from "react-router-dom";


function App() {

    const Layout =()=> {
        return (
            <div className="App">
                <AdminNavbar />
                <div className="container">
                    <div className="menuContainer">
                        <Menu />
                    </div>
                    <div className="contentContainer">
                        <Outlet />
                    </div>
                </div>
                <AdminFooter />
            </div>
        )
    }

    const router = createBrowserRouter([
        {
            path: "/admin",
            element: <Layout />,
            children:[
                { /* Route for Home*/
                    path:"/admin",
                    element:<AdminHome/>
                },
                { /* Route for Clients*/
                    path:"/admin/clients",
                    element:<Clients/>
                },
                { /* Route for Scheduling*/
                    path:"/admin/schedule",
                    element:<SchedulingHome/>
                },
            ]
        }
      ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App;