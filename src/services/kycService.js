const axios = require('axios');
const config = require('../config/config.js'); // Load configuration
const { encryptAES } = require('./tokenService'); // Import encryption function
const { saveKYCRequest, updateKYCResponse } = require('./dbService'); // Import database functions

// ✅ Generate authentication token
async function generatePartnerToken() {
    try {
        console.log("🔄 Generating Partner Token...");

        const requestHeaders = {
            'Content-Type': 'application/json',
            'appId': config.RELIGAREHealthPartnerId,
            'signature': config.RELIGAREHealthSignature,
            'timestamp': Date.now().toString(), // Ensure timestamp is numeric
            'applicationCD': config.APPLICATION_CD,
            'Cookie': config.COOKIE,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' // Required for some APIs
        };

        const requestBody = {
            partnerTokenGeneratorInputIO: {
                partnerId: config.RELIGAREHealthPartnerId,
                securityKey: config.RELIGAREHealthSecurityKey
            }
        };

        console.log("📩 Request Headers:", requestHeaders);
        console.log("📤 Request Body:", requestBody);

        const response = await axios.post(config.TOKENURL, requestBody, { headers: requestHeaders });

        console.log("✅ Token Response:", JSON.stringify(response.data, null, 2));

        if (!response.data.partnerTokenGeneratorInputIO.sessionId) {
            throw new Error("❌ Error: Token generation response is missing sessionId");
        }

        return response.data;
    } catch (error) {
        console.error("❌ Token Generation Error:", error.response?.data || error.message);
        throw new Error("Failed to generate authentication token");
    }
}



// ✅ Perform KYC verification with Corrected Payload
async function performKYC(kycPayload) {
    try {
        console.log("🔄 Performing KYC with Payload:", JSON.stringify(kycPayload, null, 2));

        // Generate Partner Token
        const tokenResponse = await generatePartnerToken();

        if (!tokenResponse || !tokenResponse.partnerTokenGeneratorInputIO) {
            throw new Error("Invalid token response received.");
        }

        const sessionId = tokenResponse.partnerTokenGeneratorInputIO.sessionId;
        const tokenList = tokenResponse.partnerTokenGeneratorInputIO.listOfToken;

        // Validate tokenList
        if (!tokenList || tokenList.length === 0) {
            throw new Error("No tokens available in the response.");
        }

        // Process the last token
        const selectedToken = tokenList[tokenList.length - 1];
        const tokenKey = selectedToken.tokenKey;
        const tokenValue = selectedToken.tokenValue;

        if (!tokenKey || !tokenValue) {
            throw new Error("Invalid token received from the token list.");
        }

        console.log("🔑 Using Token:", tokenValue, "with Key:", tokenKey);

        const encryptedToken = encryptAES(tokenKey, tokenValue);

        // Prepare the KYC request payload
        const requestBody = {
            getCkycEkycInputIO: {
                panNum: kycPayload.panNum,
                document_type: kycPayload.document_type || "PAN",
                id_number: "",
                consent_purpose: kycPayload.consent_purpose || "KYC Verification",
                dob: kycPayload.dob,
            },
        };

        const requestHeaders = {
            'Content-Type': 'application/json',
            'appId': config.RELIGAREHealthPartnerId,
            'signature': config.RELIGAREHealthSignature,
            'timestamp': Date.now().toString(),
            'sessionId': sessionId,
            'tokenId': encryptedToken,
            'applicationCD': config.APPLICATION_CD,
            'Cookie': config.COOKIE,
        };

        console.log("📩 KYC Request Headers:", requestHeaders);
        console.log("📤 KYC Request Body:", requestBody);

        const response = await axios.post(config.CKYCURL, requestBody, { headers: requestHeaders });

        console.log("✅ KYC Response:", JSON.stringify(response.data, null, 2));

        return response.data;
    } catch (error) {
        console.error("❌ KYC Error:", error.response?.data || error.message);
        throw new Error("KYC Request Failed");
    }
}




// ✅ Ensure proper exports
module.exports = { generatePartnerToken, performKYC };
