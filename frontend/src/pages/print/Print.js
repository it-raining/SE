import React from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";
import "./Print.css";
import { PrintList } from "./PrintList";
import RedCross from "../../assets/red_cross.png";
import GreenTick from "../../assets/green_tick.png";

function Print() {
    return(
        <div className="Print">
            <div className="file">
                <label>Tiến trình</label>
                <Link id="plus" to="new">+</Link>
            </div>
            <div className="list">
                {PrintList.map((val) => {
                return (
                    <div className="row">
                        <box>{val.title}</box>
                        <div>
                            <img src={GreenTick} height="24px" className="tick" alt=""/>
                            <img src={RedCross} height="24px" className="cross" alt=""/>
                        </div>
                    </div>
                );
                })} 
            </div>
        </div>
    );
}

export default Print;