import { useState } from 'react';
import { Button } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import TimesNewRoman from '../../assets/fonts/TimesNewRoman';
import TimesNewRomanBold from '../../assets/fonts/TimesNewRomanBold';
import TimesNewRomanBoldItalic from '../../assets/fonts/TimesNewRomanBoldItalic';
import TimesNewRomanItalic from '../../assets/fonts/TimesNewRomanItalic';

const generateInvoice = () => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: "mm",
        format: "a4",
    });

    doc.addFileToVFS('times.ttf', TimesNewRoman);
    doc.addFont('times.ttf', 'TimesNewRoman', 'normal');
    doc.addFileToVFS('timesbd.ttf', TimesNewRomanBold);
    doc.addFont('timesbd.ttf', 'TimesNewRoman', 'bold');
    doc.addFileToVFS('timesi.ttf', TimesNewRomanItalic);
    doc.addFont('timesi.ttf', 'TimesNewRoman', 'italic');
    doc.addFileToVFS('timesbi.ttf', TimesNewRomanBoldItalic);
    doc.addFont('timesbi.ttf', 'TimesNewRoman', 'bolditalic');

    let marginTop = 10;
    let marginLeft = 10;
    let lineHeight = 7;
    // Tiêu đề
    doc.setFont('TimesNewRoman', "bold");
    doc.setFontSize(16);
    doc.text('HÓA ĐƠN GIÁ TRỊ GIA TĂNG', 70, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "italic");
    doc.setFontSize(12);
    doc.text('(VAT INVOICE)', 95, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "normal");
    doc.text('Ngày (date): 25 tháng (month) 11 năm (year) 2024', 65, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Mã hóa đơn:', 160, marginTop);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('123', 185, marginTop);

    // Phân chia
    marginTop += lineHeight;
    doc.setLineWidth(0.2);
    doc.line(marginLeft, marginTop, 200, marginTop);

    // Thông tin đơn vị bán hàng
    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Đơn vị bán hàng', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Issued):', 41, marginTop);
    doc.setFont('TimesNewRoman', "bold");
    doc.text('CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI VẬN TẢI KHÁNH TOÀN', 58, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Mã số thuế', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Tax code):', 31, marginTop);
    doc.setFont('TimesNewRoman', "bold");
    doc.text('0201646160', 52, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Địa chỉ', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Address):', 24, marginTop);
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Số 15 Đường Trung Lực, Phường Đằng Lâm, Quận Hải An, TP. Hải Phòng, Việt Nam', 43, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Điện thoại', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Phone number):', 30, marginTop);
    doc.setFont('TimesNewRoman', "bold");
    doc.text('02253859969', 60, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Số tài khoản', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Account No.):', 34, marginTop);
    doc.setFont('TimesNewRoman', "bold");
    doc.text('22662688', 60, marginTop);
    doc.text('Tại Ngân hàng ACB chi nhánh Hải Phòng', 90, marginTop);

    // Phân chia
    marginTop += lineHeight;
    doc.setLineWidth(0.2);
    doc.line(marginLeft, marginTop, 200, marginTop);

    // Thông tin người mua hàng
    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Họ tên người mua hàng', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Buyer name):', 54, marginTop);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('Nguyễn Văn A', 80, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Tên đơn vị', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Company name):', 31, marginTop);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('Công ty TNHH A', 63, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Mã số thuế', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Tax code):', 31, marginTop);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('222222222', 52, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Địa chỉ', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Address):', 24, marginTop);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('112 Tran Phu, Hà Đông', 43, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Hình thức thanh toán', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Payment method):', 50, marginTop);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('TM/CK', 84, marginTop);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Số tài khoản', 115, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Account No.):', 139, marginTop);

    marginTop += lineHeight;
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Ghi chú', marginLeft, marginTop);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Note):', 26, marginTop);

    // Bảng chi tiết hàng hóa
    marginTop += lineHeight;

    // Dữ liệu bảng
    const header = [[["STT", "(No.)"], ["Tên hàng hoá, dịch vụ", "(Description)"], ["ĐVT", "(Unit)"], ["Số lượng", "(Quantity)"], ["Đơn giá", "(Unit price)"], ["Thành tiền", "(Amount)"]]]
    const data = [
        ['1', 'Cước vận chuyển đường bộ', 'Cont 40', '1', '1.000.000', '1.000.000'],
        ['2', 'Cước vận chuyển đường bộ', 'Cont 40', '1', '1.000.000', '1.000.000'],
        ['3', 'Cước vận chuyển đường bộ', 'Cont 40', '1', '1.000.000', '1.000.000'],
        ['4', 'Cước vận chuyển đường bộ', 'Cont 40', '1', '1.000.000', '1.000.000'],
        ['5', 'Cước vận chuyển đường bộ', 'Cont 40', '1', '1.000.000', '1.000.000'],
        ['6', 'Cước vận chuyển đường bộ', 'Cont 40', '1', '1.000.000', '1.000.000'],
    ];

    // Tạo bảng với header tùy chỉnh
    doc.autoTable({
        head: header,
        body: data,
        theme: "plain",
        startY: marginTop,
        margin: { left: 10, right: 10 },
        styles: {
            halign: "center",
            valign: "middle",
            lineHeight: lineHeight,
            font: "TimesNewRoman",
            fontStyle: "normal",
            fontSize: 12,
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
        },
        headStyles: {
            fillColor: [255, 255, 255],
            fontStyle: "bold",
        },
        didDrawCell: function (data) {
            const { cell, section, column } = data;
            if (section === 'head') {
                console.log(cell)
                const { x, y, width, height, raw } = cell;

                // Vẽ nội dung tùy chỉnh
                const title = raw[0];
                const subtitle = raw[1];
                const padding = 2; // Khoảng cách padding trong ô

                // Dòng đầu tiên (font 1)
                doc.setFont('TimesNewRoman', 'bold');
                doc.text(title, x + padding, y + lineHeight);

                // Dòng thứ hai (font 2)
                doc.setFont('TimesNewRoman', 'italic');
                doc.setFontSize(12);
                doc.text(subtitle, x + padding, y + lineHeight + 7); // Cách dòng đầu 5 đơn vị

                // Loại bỏ nội dung mặc định
                data.cell.text = [];
            } else if (section == "body") {

            }
        },
    });

    // Tổng tiền
    // marginTop += lineHeight * 4;
    // doc.rect(10, marginTop, 153, 10);

    // Chữ ký
    // marginTop += lineHeight
    // doc.setFont('TimesNewRoman', "bold");
    // doc.text('Người mua hàng', 30, marginTop);
    // doc.setFont('TimesNewRoman', "italic");
    // doc.text('(Buyer)', 61, marginTop);

    // doc.setFont('TimesNewRoman', "bold");
    // doc.text('Người bán hàng', 140, marginTop);
    // doc.setFont('TimesNewRoman', "italic");
    // doc.text('(Seller)', 170, marginTop);

    // Lưu file PDF
    // doc.save('HoaDon.pdf');

    // Tạo blob từ PDF
    const pdfBlob = doc.output('blob');

    // Hiển thị PDF trong iframe
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const iframe = document.getElementById('pdf-viewer');
    iframe.src = pdfUrl;
}

const Invoice = () => {
    return (
        <div>
            <Button type="primary" onClick={generateInvoice}>
                Xuất Hóa Đơn
            </Button>
            <iframe
                id="pdf-viewer"
                style={{ width: '100%', height: '720px', border: '1px solid #ccc', marginTop: '20px' }}
            ></iframe>
        </div>
    )
}

export default Invoice;