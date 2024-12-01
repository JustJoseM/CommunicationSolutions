import React, { useEffect, useState } from "react";
import './Clients.css';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

const Clients = () => {
    const [clients, setClients] = useState([]);
    //Adding New clients
    const [newClient, setNewClient] = useState({
        Photo: '',
        CompanyName: '',
        Email: '',
        Contact: '',
    });

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

    const handleAddClient = async () => {
        try {
            const clientCollection = collection(db, 'Clients');
            const docRef = await addDoc(clientCollection, newClient);
            setClients([...clients, { id: docRef.id, ...newClient }]);
            setNewClient({ Photo: '', CompanyName: '', Email: '', Contact: '' }); 
        } catch (error) {
            console.error('Error adding client:', error);
        }
    };

    const handleDeleteClient = async (id) => {
        try {
            await deleteDoc(doc(db, 'Clients', id));
            setClients(clients.filter(client => client.id !== id));
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    return (
        <div className="ClientPage">
            <h1 className="clientInfo">Client Information</h1>
             {/* Add Client Form */}
             <div className="addClientForm">
                <h2>Add a New Client</h2>
                <input
                    type="text"
                    placeholder="Photo URL"
                    value={newClient.Photo}
                    onChange={(e) => setNewClient({ ...newClient, Photo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Company Name"
                    value={newClient.CompanyName}
                    onChange={(e) => setNewClient({ ...newClient, CompanyName: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newClient.Email}
                    onChange={(e) => setNewClient({ ...newClient, Email: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone Contact"
                    value={newClient.Contact}
                    onChange={(e) => setNewClient({ ...newClient, Contact: e.target.value })}
                />
                <button onClick={handleAddClient}>Add Client</button>
            </div>
            <div className="boxHolder">
                {clients.map(client => (
                    <div key={client.id} className={`clientBox box${client.id}`}>
                        <img src={client.Photo} alt={client.name} className="clientImg"/>
                        <h2 className="clientName">{client.CompanyName}</h2>
                        <p className="clientEmail">Email: {client.Email}</p>
                        <p className="clientPhone">Phone #: {client.Contact}</p>
                        <button className="delete_client_button" onClick={() => handleDeleteClient(client.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clients;
