import React from 'react';
import "../App.css";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";

function Sidebar() {
    return (
        <div className="Sidebar"  style={(window.location.pathname === "/login") ? { display: 'none' } : {}}>
            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    return (
                        <li 
                            key={key}
                            className="row"
                            id={window.location.pathname === val.link ? "active" : ""}
                            onClick={()=> {
                            window.location.pathname = val.link
                            }}
                        >
                            {" "}
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;