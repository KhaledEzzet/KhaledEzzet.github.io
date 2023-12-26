const dataInput = document.getElementById('data');
const generateBtn = document.getElementById('generate');
const downloadBtn = document.getElementById('download');
const qrcodeImg = document.getElementById('qrcode');

const qrcodeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

generateBtn.addEventListener('click', () => {
  const data = dataInput.value;

  if (!data) {
    dataMessage.textContent = 'Oops!  Please enter some data to generate the QR code. '; // Add your preferred emoji here
    return;
  }

  // Generate QR code image and SVG
  qrcodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${data}`;
  fetch(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${data}&format=svg`)
    .then(response => response.text())
    .then(svgString => {
      qrcodeSvg.innerHTML = svgString;
    })
    // Enable download buttons after QR code is generated
    .then(() => {
      downloadBtn.disabled = false;
      downloadPNGBtn.disabled = false;
      dataMessage.textContent = ''; // Clear message after successful generation
    });
});

downloadBtn.addEventListener('click', () => {
  // Create a hidden anchor element to trigger download
  const downloadLink = document.createElement('a');
  downloadLink.download = 'qrcode.svg';
  downloadLink.href = `data:image/svg+xml;base64,${btoa(qrcodeSvg.outerHTML)}`;
  downloadLink.click();
});
// ...

const downloadPNGBtn = document.getElementById('download-png');

downloadPNGBtn.addEventListener('click', () => {
  // Get the SVG representation of the QR code
  const svgString = qrcodeSvg.innerHTML;

  // Create a temporary canvas element
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Load the SVG into the canvas
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);

    // Convert the canvas to a PNG data URL
    const pngDataURL = canvas.toDataURL('image/png');

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = pngDataURL;
    link.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
});
