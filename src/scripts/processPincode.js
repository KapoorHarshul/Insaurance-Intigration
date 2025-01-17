const XLSX = require('xlsx');
const path = require('path');

// Path to the files
const masterFilePath = path.join(__dirname, '../data/care-pincode-master.xlsx'); // Update with actual file name
const delhiNcrFilePath = path.join(__dirname, '../data/delhi-ncr-surat-pincode.xlsx'); // Update with actual file name

// Function to read and parse Excel files
const readExcelFile = (filePath) => {
  try {
    // Read the workbook
    const workbook = XLSX.readFile(filePath);

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log(`Data from ${filePath}:`, data);

    return data;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
};

// Process the files
const carePincodeData = readExcelFile(masterFilePath);
const delhiNcrData = readExcelFile(delhiNcrFilePath);

// Example: Filter Delhi NCR pincodes
const filterByCity = (data, city) => {
  return data.filter((row) => row.City && row.City.toLowerCase() === city.toLowerCase());
};

const delhiPincodes = filterByCity(delhiNcrData, 'Delhi');
console.log('Delhi Pincodes:', delhiPincodes);
