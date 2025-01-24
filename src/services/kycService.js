// services/kycService.js

const axios = require('axios');
const crypto = require('crypto');

// Configuration for the AES encryption
const AES_KEY = 'z5yK1lw7XYt6YKdP7Pne2Jw3zRkMAziH';
const IV = 'i0kbCAlFTlDXshYV';

const encryptToken = (tokenKey, tokenValue) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(AES_KEY, 'utf8'), Buffer.from(IV, 'utf8'));
  let encrypted = cipher.update(`${tokenKey}|${tokenValue}`, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return Buffer.from(encrypted).toString('base64');
};

const performKYC = async (panNum, dob) => {
  const tokenId = encryptToken('tokenKey', 'tokenValue');  // Replace 'tokenKey' and 'tokenValue' with actual values

  const headers = {
    appId: '******',
    signature: '******',
    timestamp: new Date().toISOString(),
    sessionId: 'dynamic_session_id',  // Update this dynamically as needed
    tokenId,
    applicationCD: 'PARTNERAPP'
  };

  const body = {
    getCkycEkycInputIO: {
      panNum,
      document_type: "PAN",
      id_number: "",
      consent_purpose: "Consent given for KYC",
      dob
    }
  };

  try {
    const url = 'https://apiuat.careinsurance.com/relinterfacerestful/religare/secure/restful/ckycDownload';
    const response = await axios.post(url, body, { headers });
    return response.data;
  } catch (error) {
    console.error('Error in KYC API call:', error);
    throw error;
  }
};

module.exports = { performKYC };
