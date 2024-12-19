import React from 'react';
import "../../App.css";
import "./Help.css";
import SearchBlue from "../../assets/searchblue.png";
import RightArrowBlue from "../../assets/rightarrowblue.png";

function Help() {
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
                        top: "20px",
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
            </div>
        </div>
    );
}

export default Help;