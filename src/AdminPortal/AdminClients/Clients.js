import React from "react";
import './Clients.css';
import { recentClients } from "../data2";

const Clients = () => {
    return (
        <div className="ClientPage">
            <h1 className="clientInfo">Client information</h1>
            <div className="boxHolder">
                {recentClients.map(client => (
                    <div key={client.id} className={`clientBox box${client.id}c`}>
                        <img src={client.img} alt={client.name} className="clientImg"/>
                        <h2 className="clientName">{client.name}</h2>
                        <p className="clientEmail">Email: {client.email}</p>
                        <p className="clientPhone">Phone Number: {client.number}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Clients;