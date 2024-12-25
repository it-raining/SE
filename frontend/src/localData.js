export const UserList = [
    {
        username: "vergilchild",
        email: "miyabi@hcmut.edu.vn",
        password: "0",
        uid: 2210002,
        current: 50000
    },
    {
        username: "user",
        email: "toibingu@hcmut.edu.vn",
        password: "0",
        uid: 2210001,
        current: 40000
    }
]

export const PaymentList = [
    {
        pid: 20190101003,
        uid: 2210001,
        title: "Thanh toán 2",
        time: "4:20 PM",
        date: "1/1/2019",
        amount: 4000,
        status: "Pay"
    },
    {
        pid: 20190101002,
        uid: 2210001,
        title: "Thanh toán 1",
        time: "4:00 PM",
        date: "1/1/2019",
        amount: 6000,
        status: "Pay"
    },
    {
        pid: 20190101001,
        uid: 2210001,
        title: "Nạp 1",
        time: "3:00 PM",
        date: "1/1/2019",
        amount: 50000,
        status: "Deposit"
    },
    {
        pid: 20241221001,
        uid: 2210002,
        title: "Nap 1",
        time: "11:45 PM",
        date: "12/21/2024",
        amount: 5000,
        status: "Deposit"
    }
]

export const PrintList = [
    {
        uid: 2210001,
        cid: 1,
        ptid: 1
    },
    {
        uid: 2210001,
        cid: 2,
        ptid: 2
    }
]

export const PrintingList = []

export const PrintedList = [
    {
        uid: 2210001,
        cid: 1,
        ptid: 2,
    }
]

export const ConfigureList = [
    {
        cid: 2,
        fid: [3, 4],
        pageRange: "all",
        pagesToPrint: null,
        orientation: "portrait",
        pagesPerSheet: 1,
        collate: "yes",
        color: "colored",
        paperSize: "A4",
        resolution: 300,
        copies: 1
    },
    {
        cid: 1,
        fid: [1, 2],
        pageRange: "all",
        pagesToPrint: null,
        orientation: "portrait",
        pagesPerSheet: 1,
        collate: "yes",
        color: "monochrome",
        paperSize: "A4",
        resolution: 300,
        copies: 1
    }
]

export const fileList = [
    {
        fid: 5,
        fileName: "Baocao.pdf",
        filePath: "./docs/Baocao.pdf",
        uri: require("./docs/Baocao.pdf"),
        pageNumber: 16,
        fileType: "pdf",
        fileThumbnail: require("./assets/thumb.png")
    },
    {
        fid: 4,
        fileName: "Slide1.pdf",
        filePath: "./docs/Slide1.pdf",
        uri: require("./docs/Slide1.pdf"),
        pageNumber: 16,
        fileType: "pdf",
        fileThumbnail: require("./assets/portrait.png")
    },
    {
        fid: 3,
        fileName: "giáo trình.pdf",
        filePath: "./docs/giáo trình.pdf",
        uri: require("./docs/giáo trình.pdf"),
        pageNumber: 16,
        fileType: "pdf",
        fileThumbnail: require("./assets/portrait.png")
    },
    {
        fid: 2,
        fileName: "Đồi gió hú.pdf",
        filePath: "./docs/Đồi gió hú.pdf",
        uri: require("./docs/Đồi gió hú.pdf"),
        pageNumber: 16,
        fileType: "pdf",
        fileThumbnail: require("./assets/portrait.png")
    },
    {
        fid: 1,
        fileName: "Tôi thấy hoa vàng trên cỏ xanh.docx",
        filePath: "./docs/Tôi thấy hoa vàng trên cỏ xanh.docx",
        uri: require("./docs/Tôi thấy hoa vàng trên cỏ xanh.docx"),
        pageNumber: 16,
        fileType: "docx",
        fileThumbnail: require("./assets/portrait.png")
    }
]

export const PrinterList = [
    {
        ptid: 1,
        name: "Xerox C235 Colour Multifunction Printer",
        color: true,
        paper: ["A4", "Letter"],
        speed: 22,
        resolution: [600, 600],
        location: "Tầng 2, Phòng 203",
        status: "free",
        image: require("./assets/printer1.png"),
    },
    {   
        ptid: 2,
        name: "Ricoh Aficio MP 3352 (2016)",
        color: false,
        paper: ["A4", "A5", "Letter"],
        speed: 22,
        resolution: [3000, 3000],
        location: "Tầng 3, Phòng 305",
        status: "free",
        image: require("./assets/printer2.png"),
    },
    {
        ptid: 3,
        name: "Toshiba e-STUDIO 3015AC",
        color: true,
        paper: ["A3", "A4", "Letter"],
        speed: 22,
        resolution: [1200, 1200],
        location: "Tầng 2, Phòng 203",
        status: "busy",
        image: require("./assets/printer1.png"),
    }
]