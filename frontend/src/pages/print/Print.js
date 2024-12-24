import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";
import "./Print.css";
import RedCross from "../../assets/red_cross.png";
import GreenTick from "../../assets/green_tick.png";

function Print() {    

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
              backgroundColor: '#d32f2f',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
            },
            x_mark: {
              color: '#fff',
              fontSize: '28px',
              fontWeight: 'bold',
            },
            message: {
              color: '#d32f2f',
              fontSize: '18px',
              margin: '20px 0',
            },
            buttonContainer: {
              display: 'flex',
              justifyContent: 'space-between',
            },
            button_left: {
                backgroundColor: '#fff',
                border: '2px solid #d32f2f',
                borderRadius: '5px',
                color: '#d32f2f',
                fontSize: '14px',
                padding: '10px 15px',
                cursor: 'pointer',
                flex: '1',
                margin: '0 5px',
              },
            button_right: {
              backgroundColor: '#d32f2f',
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

    const filtered = () => {

        const printList = JSON.parse(sessionStorage.getItem('printList')).filter((print) => {
            return print.uid === Number(sessionStorage.getItem('uid'));
        });

        const fileList = JSON.parse(sessionStorage.getItem('fileList'));

        const newPrintList = printList.map((print) => {
            const configure = JSON.parse(sessionStorage.getItem('configureList')).find((conf) => {
                return conf.cid === print.cid;
            });
            const printer = JSON.parse(sessionStorage.getItem('printerList')).find((printer) => {
                return printer.ptid === print.ptid;
            });
    ;
            return configure ? { ...print, ...configure, printer : printer.name } : {};
        });

        newPrintList.map((print) => {
            for (let i = 0; i < print.fid.length; i++) {
                print.fid[i] = fileList.find((file) => {return file.fid === print.fid[i]}).name + ", ";
            }

            return print;
        });
        
        return newPrintList;
    }

    const [confirmDialog, setConfirmDialog] = useState(false);

    const [key, setKey] = useState(0);

    const handleGo = (key) => {
        const confID = filtered()[key].cid;
        sessionStorage.setItem('config', confID);
        window.location.href = "/print/confirm";
    }

    const handleRemove = (key) => {
        setKey(key);
        setConfirmDialog(true);
    };

    const handleClose = () => {
        setConfirmDialog(false);
    };
    
    const handleDelete = () => {
        const newList = JSON.parse(sessionStorage.getItem('printList')).filter((print) => {
            return (print.uid !== filtered()[key].uid) || (print.cid !==  filtered()[key].cid) || (print.ptid !==  filtered()[key].ptid);
        });
        sessionStorage.setItem('printList', JSON.stringify(newList));
        window.location.href = "/print";
    };

    const handleAddClick = () => {
      window.location.href = "/print/upload";
    }

    return(
        <div className="Print">
            <div className="file">
                <label>Tiến trình</label>
                <Link id="plus" to="upload">+</Link>
            </div>
            {!filtered().length && (
              <div style={{
                display: 'flex',
                height: 'calc(100% - 270px)',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#eef0fc',
                cursor: 'pointer',
                alignContent: 'start',
              }} onClick={() => handleAddClick()}>
                <div style={{
                  fontSize: '50vh',
                  color: '#737FA2',
                  marginBottom: '-100px'
                }}>+</div>
                <p style={{
                  fontSize: '20px',
                  color: '#737FA2',
                  textAlign: 'center',
                }}>Đang trống, nhấn vào để thêm mới</p>
              </div>
            )}
            <div className="list" style={!filtered().length ? {display: 'none'} : {}}>
                {filtered().map((val, key) => {
                return (
                    <div className="row">
                        <box>{val.fid}</box>
                        <div>
                            <img src={GreenTick} onClick={() => handleGo(key)} height="24px" className="tick" alt=""/>
                            <img src={RedCross} onClick={() => handleRemove(key)} height="24px" className="cross" alt=""/>
                        </div>
                    </div>
                );
                })} 
            </div>
            {confirmDialog && (
                <div style={styles.container} onClick={() => handleClose()}>
                <div style={styles.card}>
                  <div style={styles.icon}>
                    <span style={styles.x_mark}>✘</span>
                  </div>
                  <p style={styles.message}>Bạn có chắc muốn xóa tiến trình in?</p>
                  <div style={styles.buttonContainer}>
                    <button style={styles.button_left} onClick={() => handleClose()}>
                      Hủy
                    </button>
                    <button style={styles.button_right} onClick={() => handleDelete()}>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
    );
}

export default Print;