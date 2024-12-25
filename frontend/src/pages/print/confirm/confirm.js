import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./confirm.css";
import DocumentDetail from "../../../components/DocumentDetail";
import Thoc from "../../../assets/thoc.png";

function Confirm () {

  useEffect(() => {
    document.title = 'Xác nhận';
  }, []);

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
          backgroundColor: 'rgba(0,0,0,0.7)',
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
      
    const confID = Number(sessionStorage.getItem('config'));

    const configure = JSON.parse(sessionStorage.getItem('configureList')).find((conf) => {
        return conf.cid === confID;
    });

    const printList = JSON.parse(sessionStorage.getItem('printList')).find((print) => {
      return print.cid === confID;
    })

    const newPrint = [
      {
        ...printList,
        ...configure,
      }
    ];

    const printerList = JSON.parse(sessionStorage.getItem('printerList'))
  
    const getPrinterName = (ptid) => {
      const printer = printerList.find((printer) => printer.ptid === ptid);
      return printer ? printer.name : "Printer not found";
    };

    const file = () => {
      const fid = newPrint[0].fid;
      const fileList = JSON.parse(sessionStorage.getItem('fileList'));
      return fileList.filter((file) => fid.includes(file.fid));
    }

    const [index, setIndex] = useState(0);
    const fileHandleUp = () => {
        const length = file().length;
        setIndex((length + index - 1) % length);
    }

    const fileHandleDown = () => {
        const length = file().length;
        setIndex((index + 1) % length);
    }

    const cost = 500 * ((newPrint[0].pagesToPrint === "default") ? (file().reduce((sum, file) => sum + file.pageNumber, 0)) : (Number(newPrint[0].pagesToPrint)));

    const curr = sessionStorage.getItem('current');

    const handlePay = (value) => {
        if (value < 0) {alert("Số dư không đủ!"); return;} 
        sessionStorage.setItem('current', value);
        handleConfirm();
    }

    const handleInsert = () => {
      const newList = [
        {
          uid: newPrint[0].uid,
          cid: newPrint[0].cid,
          ptid: newPrint[0].ptid,
          progress: [Date.now() + 5000, Date.now() + 15000],
        },
        ...JSON.parse(sessionStorage.getItem('printingList'))
      ];
      sessionStorage.setItem('printingList', JSON.stringify(newList));
    };

    const handleDelete = () => {
      const newList = JSON.parse(sessionStorage.getItem('printList')).filter((print) => {
          return (print.uid !== newPrint[0].uid) || (print.cid !==  newPrint[0].cid) || (print.ptid !== newPrint[0].ptid);
      });
      sessionStorage.setItem('printList', JSON.stringify(newList));
    };

    const handleConfirm = () => {
        const paymentList = JSON.parse(sessionStorage.getItem('paymentList'));
        const date = new Date();
        const paymentID = Date.now();
        const payCount = sessionStorage.getItem('payCount');

        const newPaymentList = [
            {
                pid: paymentID,
                uid: Number(sessionStorage.getItem('uid')),
                title: "Thanh toán " + payCount,
                time: (((date.getHours() - 1) % 12 + 1) % 24) + ":" + date.getMinutes() + (date.getHours() < 12 ? " AM" : " PM"),
                date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
                amount: cost,
                status: "Pay"
            },
            ...paymentList
        ];

        sessionStorage.setItem('payCount', Number(payCount) + 1);
        sessionStorage.setItem('paymentList', JSON.stringify(newPaymentList));

        handleInsert(); handleDelete();

        setConfirmPanel(true);
    };

    const handleToCheckInList = () => {
        window.location.href = "/history"
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
                filePath={require('../../../assets/wavio.png')}
                fileName={file()[index].fileName}
                fileCount={file().length}
                printer={getPrinterName(newPrint[0].ptid)}
                actionUp={() => fileHandleUp()}
                actionDown={() => fileHandleDown()}
                pageNumber={1}
                documentDetail={newPrint[0]}
                toggle={true}
            />
            <div>
                <div className="panel">
                    <div id="pay" className="current"> <p>Số lúa cần trả: <t className="money">{cost}</t>&nbsp;</p> <img src={Thoc} className="thoc" alt=""/> </div>
                    <div id="curr" className="current"> <p>Số lúa hiện tại: <t className="money">{curr}</t>&nbsp;</p> <img src={Thoc} className="thoc" alt=""/> </div>
                    <div id="after" className="current"> <p>= <t className="money">{curr - cost}</t>&nbsp;</p> <img src={Thoc} className="thoc" alt=""/> </div>
                    <button id="confirm" onClick={() => handlePay(curr - cost)}>Thanh toán</button>
                    <Link to="/print">
                        <button id="back">Quay về hàng chờ</button>
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
        </div>
    )
}

export default Confirm

