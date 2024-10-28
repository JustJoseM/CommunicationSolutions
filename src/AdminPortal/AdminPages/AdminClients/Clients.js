import React, { useEffect, useState } from "react";
import './Clients.css';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Clients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const clientCollection = collection(db, 'Clients'); 
                const clientSnapshot = await getDocs(clientCollection);
                const clientData = clientSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setClients(clientData);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, []);

    return (
        <div className="ClientPage">
            <h1 className="clientInfo">Client Information</h1>
            <div className="boxHolder">
                {clients.map(client => (
                    <div key={client.id} className={`clientBox box${client.id}`}>
                        <img src={client.Photo} alt={client.name} className="clientImg"/>
                        <h2 className="clientName">{client.CompanyName}</h2>
                        <p className="clientEmail">Email: {client.Email}</p>
                        <p className="clientPhone">Phone Number: {client.Contact}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clients;
