import React, {useState} from "react";
import { Link } from 'react-router-dom';
import "./confirm.css";
import DocumentDetail from "../../../components/DocumentDetail";
import Thoc from "../../../assets/thoc.png";

function Confirm () {

    const styles = {
        container: {
          position: 'fixed',
          top: '121px',
          left: '169px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 121px)',
          width: 'calc(100vw - 169px)',
          backgroundColor: '#333',
        },
        card: {
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '20px',
          textAlign: 'center',
          width: '300px',
        },
        icon: {
          backgroundColor: '#4CAF50',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        },
        checkmark: {
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold',
        },
        message: {
          color: '#4CAF50',
          fontSize: '18px',
          margin: '20px 0',
        },
        buttonContainer: {
          display: 'flex',
          justifyContent: 'space-between',
        },
        button: {
          backgroundColor: '#4CAF50',
          border: 'none',
          borderRadius: '5px',
          color: '#fff',
          fontSize: '14px',
          padding: '10px 15px',
          cursor: 'pointer',
          flex: '1',
          margin: '0 5px',
        },
      };

    const file = JSON.parse(sessionStorage.getItem('file'));
    const detail = [JSON.parse(sessionStorage.getItem('detail'))];
    const [index, setIndex] = useState(0);
    const fileHandleUp = () => {
        const length = file.length;
        setIndex((length + index - 1) % length);
    }

    const fileHandleDown = () => {
        const length = file.length;
        setIndex((index + 1) % length);
    }

    const cost = 500 * ((detail[0].pagesToPrint === "default") ? (file.reduce((sum, file) => sum + file.pageNumber, 0)) : (Number(detail[0].pagesToPrint)));

    const curr = sessionStorage.getItem('current')

    const handlePay = (value) => {
        sessionStorage.setItem('current', value);
        handleConfirm();
    }

    const handleConfirm = () => {
        const fileList = JSON.parse(sessionStorage.getItem('fileList'));
        const configureList = JSON.parse(sessionStorage.getItem('configureList'));
        const printList = JSON.parse(sessionStorage.getItem('printList'));
        const paymentList = JSON.parse(sessionStorage.getItem('paymentList'));

        const date = new Date();

        const newFileList = [
            ...file,
            ...fileList
        ];

        const newConfigureList = [
            {cid: Date.now(),
                fid: file.map((file) => file.fid),
                ...detail},
            ...configureList
        ];

        const newPrintList = [
            {
                uid: Number(sessionStorage.getItem('uid')),
                cid: Date.now()
            },
            ...printList
        ];

        const payCount = sessionStorage.getItem('payCount');

        const newPaymentList = [
            {
                pid: Date.now(),
                uid: Number(sessionStorage.getItem('uid')),
                title: "Thanh toan " + payCount,
                time: (((date.getHours() - 1) % 12 + 1) % 24) + ":" + date.getMinutes() + (date.getHours() < 12 ? " AM" : " PM"),
                date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
                amount: cost,
                status: "Pay"
            },
            ...paymentList
        ];

        sessionStorage.setItem('payCount', payCount + 1);
        sessionStorage.setItem('fileList', JSON.stringify(newFileList));
        sessionStorage.setItem('configureList', JSON.stringify(newConfigureList));
        sessionStorage.setItem('printList', JSON.stringify(newPrintList));
        sessionStorage.setItem('paymentList', JSON.stringify(newPaymentList));

        setConfirmPanel(true);
    };

    const handleToCheckInList = () => {
        window.location.href = "/pay"
        console.log('Navigating to the check-in list...');
    };
    
      const handleToHome = () => {
        window.location.href = "/"
        console.log('Navigating to the home page...');
    };

    const [confirmPanel, setConfirmPanel] = useState(false);

    return (
        <div className="Confirm">
            <DocumentDetail
                fileType="img"
                filePath={JSON.parse(sessionStorage.getItem('preview'))}
                fileName={file[index].name}
                fileCount={file.length}
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
                    <button id="confirm" onClick={() => handlePay(curr - cost)}>Thanh toán</button>
                    <Link to="/print/select">
                        <button id="back">Quay lại</button>
                    </Link>
                </div>
            </div>
            {confirmPanel && (
                <div style={styles.container}>
                <div style={styles.card}>
                  <div style={styles.icon}>
                    <span style={styles.checkmark}>✔</span>
                  </div>
                  <p style={styles.message}>Thanh toán thành công!</p>
                  <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={handleToCheckInList}>
                      Tới danh sách chờ in
                    </button>
                    <button style={styles.button} onClick={handleToHome}>
                      Về trang chủ
                    </button>
                  </div>
                </div>
              </div>
            )}
            {JSON.stringify(detail)}
        </div>
    )
}

export default Confirm

