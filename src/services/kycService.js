const axios = require('axios');
const config = require('/Users/harshulkapoor/Desktop/insurance-integration/src/config/config.js');

const headers = {
  'Content-Type': 'application/json',
  'appId': config.RELIGAREHealthPartnerId,
  'signature': config.RELIGAREHealthSignature,
  'timestamp': config.RELIGAREHealthTimestamp,
  'sessionId': 'dynamic_session_id',  // This should be dynamically generated if required
  'tokenId': 'token_generated_dynamically', // This should be generated as per the encryption requirement
  'applicationCD': 'PARTNERAPP'
};

// Function to generate partner token
async function generatePartnerToken() {
  const response = await axios.post(config.TOKENURL, {
    // Additional data might be required here depending on API requirements
  }, { headers });
  return response.data;
}

// Function to perform CKYC using the API
async function performKYC(panNum, dob) {
  const response = await axios.post(config.CKYCURL, {
    panNum,
    dob
  }, { headers });
  return response.data;
}

// Function to upload KYC document
async function uploadKYCDocument(documentDetails) {
  const response = await axios.post(config.ManualKYCURL, {
    // Construct document upload details here
  }, { headers });
  return response.data;
}

module.exports = { generatePartnerToken, performKYC, uploadKYCDocument };
