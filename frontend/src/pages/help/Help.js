import React, { useEffect } from 'react';
import "../../App.css";
import "./Help.css";
import SearchBlue from "../../assets/searchblue.png";
import RightArrowBlue from "../../assets/rightarrowblue.png";
import RightArrowWhite from "../../assets/rightarrowwhite.png";

function Help() {

    useEffect(() => {
        document.title = 'Hướng dẫn - SPSO';
    }, []);

    return(
        <div className="Help" style={{textAlign: "center",}}>
            <div className="help-panel" style={{alignContent: "center",}}>
                <p style={{
                    fontSize: "40px",
                    color: "#032b91",
                    textAlign: "center",
                    marginBottom: "5px",
                }}>Bạn cần giúp đỡ ư?</p>
                <p style={{
                    fontSize: "20px",
                    color: "#032b91",
                    textAlign: "center",
                    marginBottom: "20px",
                }}>Hãy thử tìm kiếm xem có ai cũng có trải nghiệm tương tự với bạn không.</p>
                <form className="help-search">
                    <img src={SearchBlue} alt="" style={{
                        height: "24px",
                        paddingLeft: "16px",
                        position: "relative",
                        top: "3px",
                    }}/>
                    <input type="search" id="search" style={{
                        border: "hidden",
                        outline: "none",
                        height: "36px",
                        marginLeft: "10px",
                        width: "calc(69vw - 269px)",
                        textIndent: "10px",
                    }}/>
                    <img src={RightArrowBlue} alt="" style={{
                        height: "20px",
                        paddingLeft: "10px",
                        position: "relative",
                        top: "3px",
                    }}/>
                </form>
            </div>
            <div className="help-section" style={{marginTop: "50px",}}>
                <div className="help-request">
                    <p>Nếu bạn cần gửi yêu cầu mới:</p>
                    <button type="button" id="request">Gửi yêu cầu mới</button>
                    <button type="button" id="list">Danh sách yêu cầu đã gửi</button>
                </div>
                <div className="help-list">
                    <button type="button" id="1">
                        <p>Tôi không đăng nhập được.</p>
                        <img src={RightArrowWhite} className="rightarrowwhite" alt=""/>
                    </button>
                    <button type="button" id="2">
                        <p>Tôi nhấn thanh toán nhưng nó không hoạt động.</p>
                        <img src={RightArrowWhite} className="rightarrowwhite" alt=""/>
                    </button>
                    <button type="button" id="3">
                        <p>Tôi bị mất phương hướng khi sử dụng.</p>
                        <img src={RightArrowWhite} className="rightarrowwhite" alt=""/>
                    </button>
                    <button type="button" id="4">
                        <p>Tôi không thể nạp vào tài khoản.</p>
                        <img src={RightArrowWhite} className="rightarrowwhite" alt=""/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Help;