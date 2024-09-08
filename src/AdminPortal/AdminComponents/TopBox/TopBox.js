import "./TopBox.css"
import { recentClients } from "../../data2";

const TopBox = () => {
    return (    
        <div className="topBox">
            <h1>Recent Clients</h1>
            <div className="list">
                {recentClients.map(recentClients=>(
                    <div className="topBoxlistItem" key={recentClients.id}>
                        <div className="client">
                            <img src={recentClients.img} alt=""/>
                            <div className="clientTexts">
                                <span className="name">{recentClients.name}</span>
                                <span className="email">{recentClients.email}</span>
                            </div>
                        </div>
                        <span className="name">{recentClients.number}</span>
                    </div>
                ))}
            </div>
        </div> 
    )
}

export default TopBox;