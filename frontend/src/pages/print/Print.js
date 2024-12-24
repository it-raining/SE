import React from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";
import "./Print.css";
import RedCross from "../../assets/red_cross.png";
import GreenTick from "../../assets/green_tick.png";

function Print() {    

    const filtered = () => {

        const printList = JSON.parse(sessionStorage.getItem('printList')).filter((print) => {
            return print.uid === Number(sessionStorage.getItem('uid'));
        });

        const fileList = JSON.parse(sessionStorage.getItem('fileList'));

        const newPrintList = printList.map((print) => {
            const configure = JSON.parse(sessionStorage.getItem('configureList')).find((conf) => {
                return conf.cid === print.cid;
            });
    ;
            return configure ? { ...print, ...configure } : {};
        });

        newPrintList.map((print) => {
            for (let i = 0; i < print.fid.length; i++) {
                print.fid[i] = fileList.find((file) => {return file.fid === print.fid[i]}).name + ", ";
            }

            return print;
        });
        
        return newPrintList;
    }

    return(
        <div className="Print">
            <div className="file">
                <label>Tiến trình</label>
                <Link id="plus" to="upload">+</Link>
            </div>
            <div className="list">
                {filtered().map((val) => {
                return (
                    <div className="row">
                        <box>{val.fid}</box>
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