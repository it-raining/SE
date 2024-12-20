import DocumentDetail from "./components/DocumentDetail";

function Test() {
    const detail = [
        "Số bản sao: 1", 
        "Xếp bộ 1,2,3",
        "In tất cả các trang",
        "In một mặt",
        "Hướng dọc",
        "Khổ giấy A4",
        "1 trang mỗi tờ",
        "Trắng đen",
    ];

    return (
        <div className="Test">
            <DocumentDetail
                fileType="jpg"
                filePath={require("./docs/temp.jpg")}
                fileName="temp.jpg"
                printer="Xerox C235 Colour Multifunction Printer"
                pageNumber={1}
                documentDetail={detail}
                toggle={true}
            />
        </div>
    )
}

export default Test