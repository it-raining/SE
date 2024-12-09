import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import "./Print.css";
import { PrintList } from "./PrintList";
import RedCross from "../assets/red_cross.png";
import GreenTick from "../assets/green_tick.png";
import Cross from "../assets/cross.png";
import Tick from "../assets/tick.png";

function Print() {
    return(
        <div className="Print">
            <div className="file">
                Tiến trình
                <a  id="plus"><Link to="new">+</Link></a>
            </div>
            <div className="list">
                {PrintList.map((val) => {
                return (
                    <div className="row">
                        <box>{val.title}</box>
                        <img src={GreenTick} height="24px" className="tick" alt=""/>
                        <img src={RedCross} height="24px" className="cross" alt=""/>
                    </div>
                );
                })} 
            </div>
        </div>
    );
}

export default Print;