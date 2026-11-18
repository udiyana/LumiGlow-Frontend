const fs = require('fs');
const buf = fs.readFileSync('public/images/home/CTA-Home-PGG-1.png');
console.log('File size:', buf.length, 'bytes');
// PNG IHDR is at byte 8 (after 8-byte signature): length(4) + 'IHDR'(4) + data(13)
// data: width(4), height(4), bitDepth(1), colorType(1), ...
const colorType = buf[25]; // offset 8+4+4+8+1 = 25
console.log('Color type:', colorType, '(6=RGBA, 2=RGB, 4=GA, 0=Grayscale)');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
console.log('Dimensions:', width, 'x', height);
console.log('Has alpha channel:', colorType === 6 || colorType === 4);
