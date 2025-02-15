const crypto = require('crypto');
const config = require('../config/config.js');  // Import configuration

// ✅ Function to encrypt a token using AES-256-CBC
function encryptAES(tokenKey, tokenValue) {
    try {
        console.log("🔒 Encrypting token...");
        const stringToEncrypt = `${tokenKey}|${tokenValue}`;

        const cipher = crypto.createCipheriv(
            'aes-256-cbc', 
            Buffer.from(config.AES_KEY, 'utf-8'), 
            Buffer.from(config.IV, 'utf-8')
        );

        let encrypted = cipher.update(stringToEncrypt, 'utf-8', 'base64');
        encrypted += cipher.final('base64');

        // ✅ Convert to URL-safe Base64
        encrypted = encrypted.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

        console.log("🔐 AES Encrypted Token (URL-Safe Base64):", encrypted);
        return encrypted;
    } catch (error) {
        console.error("❌ Error in AES Encryption:", error.message);
        throw new Error("AES Encryption Failed");
    }
}

module.exports = { encryptAES };
