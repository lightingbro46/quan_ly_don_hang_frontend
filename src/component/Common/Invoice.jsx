import { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button } from 'antd';
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit';

const fetchEmbedFont = async (pdfDoc) => {
    pdfDoc.registerFontkit(fontkit)
    const timesUrl = "/fonts/times.ttf";
    const timesBytes = await fetch(timesUrl).then(res => res.arrayBuffer());
    const timesFont = await pdfDoc.embedFont(timesBytes);
    const timesbdUrl = "/fonts/timesbd.ttf";
    const timesbdBytes = await fetch(timesbdUrl).then(res => res.arrayBuffer());
    const timesbdFont = await pdfDoc.embedFont(timesbdBytes);
    const timesbiUrl = "/fonts/timesbi.ttf";
    const timesbiBytes = await fetch(timesbiUrl).then(res => res.arrayBuffer());
    const timesbiFont = await pdfDoc.embedFont(timesbiBytes);
    const timesiUrl = "/fonts/timesi.ttf";
    const timesiBytes = await fetch(timesiUrl).then(res => res.arrayBuffer());
    const timesiFont = await pdfDoc.embedFont(timesiBytes);
    return {
        timesFont,
        timesbdFont,
        timesbiFont,
        timesiFont
    }
}

const generateInvoice = async (callback) => {
    const data = {
        date: "25",
        month: "01",
        year: "2024",
        orderCode: "11111",
        buyerName: "Nguyễn Văn A",
        companyName: "Công ty TNHH abc",
        taxCode: "122121221",
        address: "Hà Nội",
        table: [
            {
                id: "1",
                description: "Cước vận chuyển đường bộ",
                unit: "Cont 40",
                quantity: "1",
                unitPrice: "1.000.000",
                amount: "1.000.000"
            },
            {
                id: "2",
                description: "Cước vận chuyển đường bộ",
                unit: "Cont 40",
                quantity: "1",
                unitPrice: "1.000.000",
                amount: "1.000.000"
            }
        ],
        totalAmount: "1.000.000",
        VATRate: "8",
        VATAmount: "80.000",
        totalPayment: "1.080.000",
        amountInWords: "Một triệu đồng"
    }
    // Tải file PDF có sẵn
    const invoiceUrl = "/tmp/invoice_template.pdf";
    const pdfBytes = await fetch(invoiceUrl).then(res => res.arrayBuffer());

    // Load PDF bằng pdf-lib
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const { timesFont, timesbdFont, timesbiFont, timesiFont } = await fetchEmbedFont(pdfDoc)

    // Lấy trang đầu tiên
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const drawText = (text, x, y, align = "left") => {
        const fontSize = 12;
        const textColor = rgb(0, 0, 0);
        const fontText = timesFont;
        const textWidth = fontText.widthOfTextAtSize(text, fontSize);
        let cordiX = x;
        let cordiY = y;
        switch (align) {
            case "left":
                cordiX = x;
                break;
            case "center":
                cordiX = x - textWidth / 2;
                break;
            case "right":
                cordiX = x - textWidth;
                break;
        }
        firstPage.drawText(text, {
            x: cordiX,
            y: cordiY,
            size: fontSize,
            font: fontText,
            color: textColor,
        });

    }

    // Chèn text mới vào trang đầu
    drawText(data.date, 239, 738);
    drawText(data.month, 326, 738);
    drawText(data.year, 396, 738);
    drawText(data.orderCode, 500, 713);
    drawText(data.buyerName, 232, 557);
    drawText(data.companyName, 184, 531);
    drawText(data.taxCode, 151, 506);
    drawText(data.address, 127, 481);
    let tableLine = 374;
    const tableLineHeight = 21;
    data.table.forEach((val, idx) => {
        if (idx <= 6) {
            drawText(val.id, 56, tableLine, "center");
            drawText(val.description, 85, tableLine);
            drawText(val.unit, 299, tableLine, "center");
            drawText(val.quantity, 376, tableLine, "right");
            drawText(val.unitPrice, 464, tableLine, "right");
            drawText(val.amount, 552, tableLine, "right");
            tableLine -= tableLineHeight;
        }
    })

    drawText(data.totalAmount, 552, 246, "right");
    drawText(data.VATRate, 210, 230, "right");
    drawText(data.VATAmount, 552, 222, "right");
    drawText(data.totalPayment, 552, 200, "right");
    drawText(data.amountInWords, 250, 185);

    // Lưu file PDF đã chỉnh sửa và Tạo blob từ PDF
    const pdfBytesModified = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytesModified], { type: "application/pdf" });

    // Hiển thị PDF trong iframe
    const pdfUrl = URL.createObjectURL(pdfBlob);
    callback(pdfUrl);
}

const Invoice = forwardRef(({ inputData, ref }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);

    useImperativeHandle(ref, () => ({
        showAlert: () => {
            alert("Hello from Child Component!");
        },
    }));
    
    const showModal = () => {
        generateInvoice((url) => {
            setPdfUrl(url);
        });
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="PDF Viewer"
            open={isModalOpen}
            centered
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
            footer={null}
            destroyOnClose
        >
            <iframe
                id="pdf-viewer"
                src={pdfUrl}
                style={{ width: '100%', height: '90vh', border: '1px solid #ccc', objectFit: "contain" }}
            ></iframe>
        </Modal>
    )
});

export default Invoice;