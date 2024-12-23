import React, { useEffect, useState } from "react";
import "./ClientBox.css"
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ClientBox = () => {
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
        <div className="clientHoldingBox">
            <h1>Recent Clients</h1>
            <div className="list">
                {clients.map(recentClients=>(
                    <div className="clientBoxlistItem" key={recentClients.id}>
                        <div className="client">
                            <img src={recentClients.Photo} alt=""/>
                            <div className="clientTexts">
                                <span className="name">{recentClients.CompanyName}</span>
                                <span className="email">{recentClients.Email}</span>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div> 
    )
};

export default ClientBox;