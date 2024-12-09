import React from 'react';
import "../App.css";
import "./Printer.css";
import { PrinterList } from "./PrinterList";
import RedCross from "../assets/red_cross.png";
import GreenTick from "../assets/green_tick.png";

function Printer() {
    return(
        <div className="Printer">
            <div className="file">
                Máy in
            </div>
            <div className="list">
                {PrinterList.map((val) => {
                return (
                    <div className="row">
                        <box>
                            <img src={require("../assets/printer2.png")} className="printer-pic" alt=""/>
                            <t className="name">{val.name}</t>
                            <t className="status" id={val.status === "Rảnh" ? "free" : "busy"}>{val.status}</t>
                        </box>
                    </div>
                );
                })} 
            </div>
        </div>
    );
}

export default Printer;


            