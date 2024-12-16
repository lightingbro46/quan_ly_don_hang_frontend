import { useState, useEffect } from 'react';
import { Modal } from "antd";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit';
import Page500 from './Page500';

const embedTimesFont = async (pdfDoc) => {
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

const genPdfUrl = async (pdfTempUrl, editPdfDoc) => {
    const pdfBytes = await fetch(pdfTempUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const TimesFont = await embedTimesFont(pdfDoc);
    const defaultFontSize = 12;
    const defaultFont = TimesFont.timesFont;
    const defaultTextColor = rgb(0, 0, 0);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const drawText = ({
        page = firstPage,
        text = "",
        x = 0,
        y = 0,
        fontText = defaultFont,
        fontSize = defaultFontSize,
        textColor = defaultTextColor,
        align = "left"
    }) => {
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
        page.drawText(text, {
            x: cordiX,
            y: cordiY,
            size: fontSize,
            font: fontText,
            color: textColor,
        });
    }

    await editPdfDoc({
        pdfDoc: pdfDoc,
        TimesFont: TimesFont,
        drawText,
    })

    const pdfBytesModified = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytesModified], { type: "application/pdf" });

    const pdfUrl = URL.createObjectURL(pdfBlob);
    return pdfUrl;
}

const PDFViewer = ({ isModalVisible, setIsModalVisible, pdfTempUrl, editPdfDoc, ...props }) => {
    const [loading, setLoading] = useState(true);
    const [pdfUrl, setPdfUrl] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (isModalVisible) {
            genPdfUrl(pdfTempUrl, editPdfDoc)
                .then(url => setPdfUrl(url))
                .catch(e => {
                    console.log(e);
                    setPdfUrl(null);
                })
                .finally(() => {
                    setLoading(false)
                })

        }
    }, [isModalVisible]);

    return (
        <Modal
            title="PDF Viewer"
            open={isModalVisible}
            loading={loading}
            centered
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
            footer={null}
            destroyOnClose
            {...props}
        >
            {pdfUrl ? (
                <iframe
                    id="pdf-viewer"
                    src={pdfUrl}
                    style={{ width: '100%', height: '90vh', border: '1px solid #ccc', objectFit: "contain" }}
                ></iframe>
            ) : (
                <Page500 />
            )}

        </Modal>
    )
}

export default PDFViewer;