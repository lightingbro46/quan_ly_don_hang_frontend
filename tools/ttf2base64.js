import fs from 'fs';
import base64 from 'base64-js';

function convertTTFtoBase64(inputPath, outputPath) {
  // Đọc nội dung file font (TTF)
  const fontBuffer = fs.readFileSync(inputPath);

  // Chuyển đổi sang Base64
  const fontBase64 = base64.fromByteArray(new Uint8Array(fontBuffer));

  // Tạo nội dung Base64 để nhúng vào jsPDF
  const base64Content = `export default "${fontBase64}";`;

  // Ghi vào file JavaScript
  fs.writeFileSync(outputPath, base64Content);
  console.log(`Font đã được chuyển đổi và lưu tại: ${outputPath}`);
}

// Thực hiện chuyển đổi
convertTTFtoBase64('./tools/fonts/times.ttf', './src/assets/fonts/TimesNewRoman.js');
convertTTFtoBase64('./tools/fonts/timesbd.ttf', './src/assets/fonts/TimesNewRomanBold.js');
convertTTFtoBase64('./tools/fonts/timesi.ttf', './src/assets/fonts/TimesNewRomanItalic.js');
convertTTFtoBase64('./tools/fonts/timesbi.ttf', './src/assets/fonts/TimesNewRomanBoldItalic.js');
