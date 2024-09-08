import React from "react";
import { Link } from "react-router-dom"
import './Menu.css';
import {menu} from '../../data';

const Menu = () => {
    return(
        <div className="Menu">
            {menu.map(item=>(
                <div className="items" key={item.id}>
                    <span className="title">{item.title}</span>
                    {item.listItems.map((listItem) =>(
                        <Link to={listItem.url} className="listItem" key={listItem.id}>
                        <img src={listItem.icon} alt="" />
                        <span className="listItemTitle">{listItem.title}</span>
                    </Link>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Menu;