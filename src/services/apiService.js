const axios = require('axios');
const crypto = require('crypto');

// Configuration for AES encryption
const AES_KEY = 'z5yK1lw7XYt6YKdP7Pne2Jw3zRkMAziH';  // Your AES key (hex format)
const IV = 'i0kbCAlFTlDXshYV';  // Your AES Initialization Vector (hex format)

// Function to encrypt token data
function encryptTokenData(tokenKey, tokenValue) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(AES_KEY, 'hex'), Buffer.from(IV, 'hex'));
  let encrypted = cipher.update(`${tokenKey}|${tokenValue}`, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

// API client setup
const apiClient = axios.create({
  baseURL: 'https://apiuat.careinsurance.com/relinterfacerestful/religare/secure/restful',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Function to perform API requests with encrypted token
const fetchPolicyPDF = async (policyNum) => {
  const tokenKey = 'actualTokenKey';  // Replace with the actual token key
  const tokenValue = 'actualTokenValue';  // Replace with the actual token value
  const tokenId = encryptTokenData(tokenKey, tokenValue);

  const headers = {
    'appId': 'actualAppId',  // Replace with your actual App ID
    'signature': 'actualSignature',  // Replace with your actual signature
    'timestamp': new Date().toISOString(),
    'sessionId': 'actualSessionId',  // Should be dynamically generated if required
    'tokenId': tokenId,
    'applicationCD': 'PARTNERAPP',
    'agentId': '20008325'  // Your actual agent ID
  };

  try {
    const response = await apiClient.post('/getPolicyPDFV2', { policyNum }, { headers });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch policy PDF:', error);
    throw error;
  }
};

module.exports = { fetchPolicyPDF };
