import { useState } from 'react';
import { Button } from 'antd';
import jsPDF from 'jspdf';
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

    // Tiêu đề
    doc.setFont('TimesNewRoman', "bold");
    doc.setFontSize(16);
    doc.text('HÓA ĐƠN GIÁ TRỊ GIA TĂNG', 70, 20);

    doc.setFont('TimesNewRoman', "italic");
    doc.setFontSize(12);
    doc.text('(VAT INVOICE)', 95, 27);

    doc.setFont('TimesNewRoman', "normal");
    doc.text('Ngày (date): 25 tháng (month) 11 năm (year) 2024', 65, 35);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Mã hóa đơn:', 160, 45);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('123', 185, 45);

    // Phân chia
    doc.setLineWidth(0.2);
    doc.line(10, 50, 200, 50);

    // Thông tin đơn vị bán hàng
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Đơn vị bán hàng', 10, 60);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Issued):', 41, 60);
    doc.setFont('TimesNewRoman', "bold");
    doc.text('CÔNG TY TNHH ĐẦU TƯ THƯƠNG MẠI VẬN TẢI KHÁNH TOÀN', 58, 60);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Mã số thuế', 10, 70);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Tax code):', 31, 70);
    doc.setFont('TimesNewRoman', "bold");
    doc.text('0201646160', 52, 70);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Địa chỉ', 10, 80);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Address):', 24, 80);
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Số 15 Đường Trung Lực, Phường Đằng Lâm, Quận Hải An, TP. Hải Phòng, Việt Nam', 43, 80);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Điện thoại', 10, 90);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Phone number):', 30, 90);
    doc.setFont('TimesNewRoman', "bold");
    doc.text('02253859969', 60, 90);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Số tài khoản', 10, 100);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Account No.):', 34, 100);
    doc.setFont('TimesNewRoman', "bold");
    doc.text('22662688', 60, 100);
    doc.text('Tại Ngân hàng ACB chi nhánh Hải Phòng', 90, 100);

    // Phân chia
    doc.setLineWidth(0.2);
    doc.line(10, 110, 200, 110);

    // Thông tin người mua hàng
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Họ tên người mua hàng', 10, 120);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Buyer name):', 54, 120);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('Nguyễn Văn A', 80, 120);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Tên đơn vị', 10, 130);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Company name):', 31, 130);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('Công ty TNHH A', 63, 130);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Mã số thuế', 10, 140);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Tax code):', 31, 140);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('222222222', 52, 140);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Địa chỉ', 10, 150);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Address):', 24, 150);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('112 Tran Phu, Hà Đông', 43, 150);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Hình thức thanh toán', 10, 160);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Payment method):', 50, 160);
    doc.setFont('TimesNewRoman', "normal");
    doc.text('TM/CK', 84, 160);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Số tài khoản', 115, 160);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Account No.):', 139, 160);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Ghi chú', 10, 170);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Note):', 26, 170);

    let headers = [
        ["STT (No.)", "Tên hàng hóa, dịch vụ (Description)", "ĐVT (Unit)", "Số lượng (Quantity)", "Đơn giá (Unit price)", "Thành tiền (Amount)"],
    ];

    let data = [
        ["1", "Cước vận chuyển đường bộ", "Cont 40", "1", "1.000.000", "1.000.000"],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
    ]
    // Bảng chi tiết hàng hóa
    doc.table(10, 180, data, headers, {
        autoSize: true,
        fontSize: 10,
        padding: 5,
        border: 1,
        styles: {
            halign: 'center', // Canh giữa nội dung
            valign: 'middle', // Canh giữa nội dung theo chiều dọc
        },
    });

    // Tổng tiền

    // doc.text(' (Total amount): 1.000.000', 20, 140);
    // doc.text('Thuế suất GTGT (VAT rate): 10%', 20, 145);
    // doc.text('Tiền thuế GTGT (VAT amount): 100.000', 20, 150);
    // doc.text('Tổng cộng tiền thanh toán (Total payment): 1.100.000', 20, 155);

    // Chữ ký
    doc.setFont('TimesNewRoman', "bold");
    doc.text('Người mua hàng', 30, 250);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Buyer)', 61, 250);

    doc.setFont('TimesNewRoman', "bold");
    doc.text('Người bán hàng', 140, 250);
    doc.setFont('TimesNewRoman', "italic");
    doc.text('(Seller)', 170, 250);

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