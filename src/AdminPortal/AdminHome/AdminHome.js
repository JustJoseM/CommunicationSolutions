import React from "react";
import './AdminHome.css';
import ClientBox from "../AdminComponents/ClientBox/ClientBox";
import ConsultationChartDB from "../AdminComponents/AdminCharts/ConsultationChartDB";
import RevenueChart from "../AdminComponents/AdminCharts/RevenueChart";
import ClientSatisfactionChart from "../AdminComponents/AdminCharts/ClientSatisfactionChart";

const AdminHome = () => {

    return(
        <div className="AdminHome">
            <div className="box box1">
                <ClientBox />
            </div>
            <div className="box box2">
                <ConsultationChartDB timePeriod="lastMonth" />
            </div>
            <div className="box box3">
                <RevenueChart timePeriod="lastMonth" />
            </div>
            <div className="box box4">Upcoming Appointments</div>
            <div className="box box5">
                <ClientSatisfactionChart timePeriod="lastMonth"/>
            </div>
            <div className="box box6">Upcoming Tasks</div>
            <div className="box box7">Task List/Notes</div>
        </div>
    )
}

export default AdminHome;