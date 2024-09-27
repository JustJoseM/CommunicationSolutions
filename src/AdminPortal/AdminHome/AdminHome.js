import React from "react";
import './AdminHome.css';
import TopBox from "../AdminComponents/TopBox/TopBox";
import ConsultationChart from "../AdminComponents/AdminCharts/ConsultationChart";
import RevenueChart from "../AdminComponents/AdminCharts/RevenueChart";
import ClientSatisfactionChart from "../AdminComponents/AdminCharts/ClientSatisfactionChart";

const AdminHome = () => {

    const totalConsultations = 15;
    const totalRevenue = "$1000";

    return(
        <div className="AdminHome">
            <div className="box box1">
                <TopBox />
            </div>
            <div className="box box2">
                <ConsultationChart />
            </div>
            <div className="box box3">
                <RevenueChart />
            </div>
            <div className="box box4">Upcoming Appointments</div>
            <div className="box box5">
                <ClientSatisfactionChart />
            </div>
            <div className="box box6">Upcoming Tasks</div>
            <div className="box box7">Task List/Notes</div>
        </div>
    )
}

export default AdminHome;