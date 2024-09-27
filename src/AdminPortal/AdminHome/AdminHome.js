import React from "react";
import './AdminHome.css';
import TopBox from "../AdminComponents/TopBox/TopBox";
import StatisticsWidget from "../AdminWidgets/StatisticsWidget";

const AdminHome = () => {

    const totalConsultations = 15;
    const totalRevenue = "$1000";

    return(
        <div className="AdminHome">
            <div className="box box1">
                <TopBox />
            </div>
            <div className="box box2">
                <StatisticsWidget title="Total Number of Consultations" value={totalConsultations} />
            </div>
            <div className="box box3">
                <StatisticsWidget title="Total Revenue" value={totalRevenue} />
            </div>
            <div className="box box4">Upcoming Appointments</div>
            <div className="box box5">Client Satisfaction</div>
            <div className="box box6">Upcoming Tasks</div>
            <div className="box box7">Task List/Notes</div>
        </div>
    )
}

export default AdminHome;