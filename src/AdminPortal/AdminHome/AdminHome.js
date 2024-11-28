import React from "react";
import './AdminHome.css';
import ClientBox from "../AdminComponents/ClientBox/ClientBox";
import ConsultationChart from "../AdminComponents/AdminCharts/ConsultationChart";
import RevenueChart from "../AdminComponents/AdminCharts/RevenueChart";
import ClientSatisfactionChart from "../AdminComponents/AdminCharts/ClientSatisfactionChart";
import NotesBox from "../AdminComponents/NotesBox/NotesBox";
import AppointmentBox from "../AdminComponents/AppointmentBox/AppointBox";
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
            <div className="box box4">
                <AppointmentBox />
            </div>
            <div className="box box5">
                <ClientSatisfactionChart timePeriod="lastMonth"/>
            </div>
            <div className="box box6">Upcoming Tasks</div>
            <div className="box box7">
                <NotesBox />
            </div>
        </div>
    )
}

export default AdminHome;