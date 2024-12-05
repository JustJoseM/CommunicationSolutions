import React from "react";
import "./AdminFooter.css";

const AdminFooter = () => {
    return(
        <div className="footer">
            <p>@{new Date().getFullYear()} Team Bit Theory, Sacramento State. This is a school project. None of what is displayed here is for profit.</p>
        </div>
    )
}

export default AdminFooter;
