const reportTempUrl = "/tmp/revenue_template.pdf";

const editReport = async ({ record, pdfDoc, drawText }) => {
    let data = {
        periodText: record.periodText,
        revenue: `${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(record.revenue)}`,
        profits: `${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(record.profits)}`,
        tax: `${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(record.tax)}`,
        profitsAfterTax: `${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(record.profitsAfterTax)}`,
    }
    drawText({ text: data.periodText, x: 310, y: 680, align: "center" });
    drawText({ text: data.revenue, x: 530, y: 448, align: "right" });
    drawText({ text: data.profits, x: 530, y: 422, align: "right" });
    drawText({ text: data.tax, x: 530, y: 397, align: "right" });
    drawText({ text: data.profitsAfterTax, x: 530, y: 370, align: "right" });
}

export { reportTempUrl, editReport };