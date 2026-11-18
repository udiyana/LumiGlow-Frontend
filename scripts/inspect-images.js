import fs from 'fs';
import path from 'path';

const userDir = 'C:/Users/ASUS/.gemini/antigravity/brain/94ce7d8a-c3e2-48ee-a896-cb94f1303ddc/.user_uploaded/';
const files = [
  'media_1794466526033_2769d248.png',
  'media_1794466572754_fde0c140.png',
  'media_1794466578435_ba15632b.jpg',
  'media_1794466582766_f2c925e7.png',
  'media_1794466586636_8202e455.png'
];

let html = `<html><body style="background:#333;color:#fff;font-family:sans-serif;padding:20px;">`;
files.forEach(f => {
  const p = path.join(userDir, f);
  if (fs.existsSync(p)) {
    const data = fs.readFileSync(p).toString('base64');
    const mime = f.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
    html += `<h2>${f}</h2><img src="data:${mime};base64,${data}" style="max-width:100%;border:2px solid #666;margin-bottom:30px;"><br/>`;
  }
});
html += `</body></html>`;
fs.writeFileSync('inspect-uploaded.html', html);
console.log('inspect-uploaded.html written');

