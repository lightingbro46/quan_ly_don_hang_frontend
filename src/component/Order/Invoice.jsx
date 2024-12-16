
import { apiSearch } from "../Common/Utils";

const invoiceTempUrl = "/tmp/invoice_template.pdf";

const getCustomerDetail = (queryParams) => {
    return apiSearch({
        url: "http://localhost:3000/api/customers/detail",
        queryParams
    })
}

const getTruckDetail = (queryParams) => {
    return apiSearch({
        url: "http://localhost:3000/api/trucks/detail",
        queryParams
    })
}

const getTruckCatDetail = (queryParams) => {
    if (queryParams.id = 1) {
        return { name: "Cont 20" };
    }
    if (queryParams.id = 2) {
        return { name: "Cont 40" };
    }
    if (queryParams.id = 3) {
        return { name: "Cont 45" };
    }
}

const editInvoice = async ({ record, pdfDoc, drawText }) => {
    let customer = await getCustomerDetail({ id: record.customer_id });
    let truck = await getTruckDetail({ id: record.truck_id });
    let truck_cat = await getTruckCatDetail({ id: truck.cat_id });
    let data = {
        date: new Date(Date.now()).getDate().toString(),
        month: new Date(Date.now()).getMonth().toString(),
        year: new Date(Date.now()).getFullYear().toString(),
        orderCode: record.id.toString(),
        buyerName: customer.name,
        companyName: customer.company,
        taxCode: `${customer.taxCode}`,
        address: customer.address,
        table: [{
            id: "1",
            description: "Cước vận chuyển đường bộ",
            unit: truck_cat.name,
            quantity: "1",
            unitPrice: `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(record.pricing)}`,
            amount: `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(record.pricing)}`,
        }],
        totalAmount: `${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(record.pricing)}`,
        VATRate: (8).toString(),
        VATAmount: `${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(record.pricing * 0.08)}`,
        totalPayment: `${new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(record.pricing * 1.08)}`,
        amountInWords: ""
    }
    drawText({ text: data.date, x: 239, y: 738 });
    drawText({ text: data.month, x: 326, y: 738 });
    drawText({ text: data.year, x: 396, y: 738 });
    drawText({ text: data.orderCode, x: 500, y: 713 });
    drawText({ text: data.buyerName, x: 232, y: 557 });
    drawText({ text: data.companyName, x: 184, y: 531 });
    drawText({ text: data.taxCode, x: 151, y: 506 });
    drawText({ text: data.address, x: 127, y: 481 });

    let tableLine = 374;
    const tableLineHeight = 21;
    data.table.forEach((val, idx) => {
        if (idx <= 6) {
            drawText({ text: val.id, x: 56, y: tableLine, align: "center" });
            drawText({ text: val.description, x: 85, y: tableLine });
            drawText({ text: val.unit, x: 299, y: tableLine, align: "center" });
            drawText({ text: val.quantity, x: 376, y: tableLine, align: "right" });
            drawText({ text: val.unitPrice, x: 464, y: tableLine, align: "right" });
            drawText({ text: val.amount, x: 552, y: tableLine, align: "right" });
            tableLine -= tableLineHeight;
        }
    })

    drawText({ text: data.totalAmount, x: 552, y: 246, align: "right" });
    drawText({ text: data.VATRate, x: 210, y: 230, align: "right" });
    drawText({ text: data.VATAmount, x: 552, y: 222, align: "right" });
    drawText({ text: data.totalPayment, x: 552, y: 200, align: "right" });
    drawText({ text: data.amountInWords, x: 250, y: 185 });
}

export { invoiceTempUrl, editInvoice };