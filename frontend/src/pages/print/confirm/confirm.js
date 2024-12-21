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

    const cost = 500 * detail[0].pagesToPrint;

    const curr = sessionStorage.getItem('current')

    const handlePay = (value) => {
        sessionStorage.setItem('current', value);
    }

    const [confirmPanel, setConfirmPanel] = useState(false);

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
                    <div id="pay" className="current"> <p>Số lúa cần trả: <t className="money">{cost}</t> &nbsp;</p> <img src={Thoc} className="thoc" alt=""/> </div>
                    <div id="curr" className="current"> <p>Số lúa hiện tại: <t className="money">{curr}</t> &nbsp;</p> <img src={Thoc} className="thoc" alt=""/> </div>
                    <div id="after" className="current"> <p>= <t className="money">{curr - cost}</t>&nbsp; </p> <img src={Thoc} className="thoc" alt=""/> </div>
                    <button id="confirm" onClick={() => {handlePay(curr); setConfirmPanel(!confirmPanel)}}>Thanh toán</button>
                    <Link to="/print/select">
                        <button id="back">Quay lại</button>
                    </Link>
                </div>
            </div>
            {confirmPanel && (
                <div className="ConfirmPanel">
                    <div className="ConfirmPanel-content">
                        <h4>Xác nhận nạp lúa</h4>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <p>Số lúa: <b></b> </p>
                            <img src={Thoc} height="16px" style={{
                                paddingTop: "12px",
                                paddingLeft: "4px",
                            }}
                            alt=""/>
                        </div> 
                        <p>Số tiền cần trả: <b> VND</b></p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Confirm

