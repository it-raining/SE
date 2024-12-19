import React from 'react';
import "../../App.css";
import "./Printer.css";
import { PrinterList } from "./PrinterList";

function Printer() {
    return(
        <div className="Printer">
            <div className="printer">
                <label>Máy in</label>
            </div>
            <div className="list">
                {PrinterList.map((val) => {
                return (
                    <div className="row">
                        <box>
                            <img src={require("../../assets/printer2.png")} className="picture" alt=""/>
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


            