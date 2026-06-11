function generateTrackingNumber() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return `BRGY-${year}${month}${day}-${randomNumber}`;
}

module.exports = generateTrackingNumber;