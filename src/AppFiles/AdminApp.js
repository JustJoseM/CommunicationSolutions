//Temporary Admin Portal Landing Page

import AdminHome from './AdminPortal/AdminHome/AdminHome';
import Clients from './AdminPortal/AdminClients/Clients';
import SchedulingHome from './AdminPortal/AdminScheduling/SchedulingHome';
import AdminFooter from './AdminPortal/AdminComponents/AdminFooter/AdminFooter';
import AdminNavbar from './AdminPortal/AdminComponents/AdminNavbar/AdminNavbar';
import Menu from './AdminPortal/AdminComponents/AdminMenu/Menu';
import Profile from './AdminPortal/AdminProfile/Profile';
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
            element: <AdminLayout />,
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
                {
                 /* Route for Profile */
                 path:"/admin/profile",
                 element:<Profile />
             }
            ]
        }
      ]);

    return (
        <RouterProvider router={router}/>
    );
}

export default App;