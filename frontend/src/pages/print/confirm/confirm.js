import React, {useState} from "react";
import DocumentDetail from "../../../components/DocumentDetail";
import Huh from "../../../assets/huh.jpg";
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
                filePath={Huh}
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
                <div className="current">
                    <div id="pay"> <p>Số lúa cần trả: tien</p> <img src={Thoc} alt=""/> </div>
                    <div id="current"> <p>Số lúa hiện tại: tien</p> <img src={Thoc} alt=""/> </div>
                </div>
                <button id="confirm"></button>
                <button id="back"></button> 
            </div>
        </div>
    )
}

export default Confirm

