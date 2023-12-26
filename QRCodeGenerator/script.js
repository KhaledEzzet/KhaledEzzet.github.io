const dataInput = document.getElementById('data');
const generateBtn = document.getElementById('generate');
const downloadBtn = document.getElementById('download');
const qrcodeImg = document.getElementById('qrcode');
const qrcodeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const dataMessage = document.getElementById('data-message');

generateBtn.addEventListener('click', () => {
  const data = dataInput.value;

  // Clear any existing steps
  const stepsList = document.getElementById('steps');
  stepsList.innerHTML = '';

  if (!data) {
    // Display steps with a message for no data
    stepsList.innerHTML = `
      <li>1.  Enter your data in the text field above.</li>
      <li>2.  Click the "Generate QR Code" button.</li>
      <li>⚠️ Oops! You haven't entered any data yet. </li>
    `;
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

      // Add steps with emojis (only if data is present)
      const steps = [
        '1.  Enter your data in the text field above.',
        '2. ️ Click the "Generate QR Code" button.',
        '3.  Your QR code will appear here!',
        '4. ⬇️ Download the QR code as SVG or PNG.'
      ];

      steps.forEach(step => {
        const listItem = document.createElement('li');
        listItem.textContent = step;
        stepsList.appendChild(listItem);
      });
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
