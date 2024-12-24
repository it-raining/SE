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
        title: "Thanh toan 2",
        time: "4:20 PM",
        date: "1/1/2019",
        amount: 4000,
        status: "Pay"
    },
    {
        pid: 20190101002,
        uid: 2210001,
        title: "Thanh toan 1",
        time: "4:00 PM",
        date: "1/1/2019",
        amount: 6000,
        status: "Pay"
    },
    {
        pid: 20190101001,
        uid: 2210001,
        title: "Nap 1",
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
        cid: 1
    },
    {
        uid: 2210001,
        cid: 2
    }
]

export const PrintingList = [
    {
        uid: 2210001,
        cid: 1,
        progress: -1
    },
    {
        uid: 2210001,
        cid: 2,
        progress: -1
    }
]

export const PrintedList = [
    {
        uid: 2210001,
        cid: 1
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
        colorMode: "colored",
        paperSize: "a4",
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
        colorMode: "colored",
        paperSize: "a4",
        resolution: 300,
        copies: 1
    }
]

export const fileList = [
    {
        fid: 5,
        name: "Baocao.pdf",
        path: require("./docs/Baocao.pdf"),
        pageNumber: 16,
        thumb: require("./assets/thumb.png")
    },
    {
        fid: 4,
        name: "Slide1.pdf",
        path: require("./docs/Slide1.pdf"),
        pageNumber: 16,
        thumb: require("./assets/portrait.png")
    },
    {
        fid: 3,
        name: "giáo trình.pdf",
        path: require("./docs/giáo trình.pdf"),
        pageNumber: 16,
        thumb: require("./assets/portrait.png")
    },
    {
        fid: 2,
        name: "Đồi gió hú.pdf",
        path: require("./docs/Đồi gió hú.pdf"),
        pageNumber: 16,
        thumb: require("./assets/portrait.png")
    },
    {
        fid: 1,
        name: "Tôi thấy hoa vàng trên cỏ xanh.docx",
        path: require("./docs/Tôi thấy hoa vàng trên cỏ xanh.docx"),
        pageNumber: 16,
        thumb: require("./assets/portrait.png")
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
        status: "Rảnh",
        image: require("./assets/printer1.png"),
        details: {
            paper: "Khổ giấy: A4",
            speed: "Tốc độ: 22ppm",
            resolution: "Độ phân giải in: 600x600 dpi",
            location: "Tầng 2, Phòng 203"
        },
    },
    {   
        ptid: 2,
        name: "Ricoh Aficio MP 3352 (2016)",
        color: false,
        paper: ["A4", "A5", "Letter"],
        speed: 22,
        resolution: [3000, 3000],
        location: "Tầng 3, Phòng 305",
        status: "Rảnh",
        image: require("./assets/printer2.png"),
        details: {
            paper: "Khổ giấy: A4 A5",
            speed: "Tốc độ: 22ppm",
            resolution: "Độ phân giải in: 3000x3000 dpi",
            location: "Tầng 3, Phòng 305"
        },
    },
    {
        ptid: 3,
        name: "Toshiba e-STUDIO 3015AC",
        color: true,
        paper: ["A3", "A4", "Letter"],
        speed: 22,
        resolution: [1200, 1200],
        location: "Tầng 2, Phòng 203",
        status: "Bận",
        image: require("./assets/printer1.png"),
        details: {
            paper: "Khổ giấy: A3 A4",
            speed: "Tốc độ: 22ppm",
            resolution: "Độ phân giải in: 1200x1200 dpi",
            location: "Tầng 3, Phòng 305"
        },
    },
];