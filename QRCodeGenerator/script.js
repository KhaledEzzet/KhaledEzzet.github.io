const dataInput = document.getElementById('data');
const generateBtn = document.getElementById('generate');
const downloadBtn = document.getElementById('download');
const qrcodeImg = document.getElementById('qrcode');

const qrcodeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

generateBtn.addEventListener('click', () => {
  const data = dataInput.value;
  qrcodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${data}`;

  // Generate SVG representation of the QR code
  fetch(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${data}&format=svg`)
    .then(response => response.text())
    .then(svgString => {
      qrcodeSvg.innerHTML = svgString;
    });
});

downloadBtn.addEventListener('click', () => {
  // Create a hidden anchor element to trigger download
  const downloadLink = document.createElement('a');
  downloadLink.download = 'qrcode.svg';
  downloadLink.href = `data:image/svg+xml;base64,${btoa(qrcodeSvg.outerHTML)}`;
  downloadLink.click();
});
