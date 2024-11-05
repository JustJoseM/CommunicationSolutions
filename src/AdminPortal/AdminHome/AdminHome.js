import React from "react";
import './AdminHome.css';
import ClientBox from "../AdminComponents/ClientBox/ClientBox";
import ConsultationChart from "../AdminComponents/AdminCharts/ConsultationChart";
import RevenueChart from "../AdminComponents/AdminCharts/RevenueChart";
import ClientSatisfactionChartDB from "../AdminComponents/AdminCharts/ClientSatisfactionChartDB";

const AdminHome = () => {

    return(
        <div className="AdminHome">
            <div className="box box1">
                <ClientBox />
            </div>
            <div className="box box2">
                <ConsultationChart timePeriod="lastMonth" />
            </div>
            <div className="box box3">
                <RevenueChart timePeriod="lastMonth" />
            </div>
            <div className="box box4">Upcoming Appointments</div>
            <div className="box box5">
                <ClientSatisfactionChartDB timePeriod="lastMonth"/>
            </div>
            <div className="box box6">Upcoming Tasks</div>
            <div className="box box7">Task List/Notes</div>
        </div>
    )
}

export default AdminHome;