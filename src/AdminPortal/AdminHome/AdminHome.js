import React from "react";
import './AdminHome.css';
import TopBox from "../AdminComponents/TopBox/TopBox";

const AdminHome = () => {
    return(
        <div className="AdminHome">
            <div className="box box1">
                <TopBox />
            </div>
            <div className="box box2">Total Number of Consultations</div>
            <div className="box box3">Total Revenue</div>
            <div className="box box4">Upcoming Appointments</div>
            <div className="box box5">Client Satisfaction</div>
            <div className="box box6">Upcoming Tasks</div>
            <div className="box box7">Task List/Notes</div>
        </div>
    )
}

export default AdminHome;