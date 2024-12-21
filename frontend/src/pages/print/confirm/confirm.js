import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "./confirm.css";
import DocumentDetail from "../../../components/DocumentDetail";
import Thoc from "../../../assets/thoc.png";

function Confirm () {
    const fileList = JSON.parse(sessionStorage.getItem('file'));
    const detail = [JSON.parse(sessionStorage.getItem('detail'))];
    const [index, setIndex] = useState(0);
    const fileHandleUp = () => {
        const length = fileList.length;
        setIndex((length + index - 1) % length);
    }

    const fileHandleDown = () => {
        const length = fileList.length;
        setIndex((index + 1) % length);
    }
    
    return (
        <div className="Confirm">
            <DocumentDetail
                fileType="img"
                filePath={JSON.parse(sessionStorage.getItem('preview'))}
                fileName={fileList[index].name}
                fileCount={fileList.length}
                printer={sessionStorage.getItem('printer')}
                actionUp={() => fileHandleUp()}
                actionDown={() => fileHandleDown()}
                pageNumber={1}
                documentDetail={detail}
                toggle={true}
            />
            <div>
                <div className="panel">
                    <div id="pay"> <p>Số lúa cần trả: tien</p> <img src={Thoc} className="thoc" alt=""/> </div>
                    <div id="current"> <p>Số lúa hiện tại: tien</p> <img src={Thoc} className="thoc" alt=""/> </div>
                    <Link></Link><button id="confirm"></button>
                    <button id="back"></button> 
                </div>
            </div>
        </div>
    )
}

export default Confirm

