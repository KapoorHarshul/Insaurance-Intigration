const validateKYCRequest = (req, res, next) => {
    try {
        console.log("🔍 Validating KYC request payload...");

        // Extract `getCkycEkycInputIO` from request body
        const kycData = req.body.getCkycEkycInputIO;
        if (!kycData) {
            throw new Error("Missing `getCkycEkycInputIO` in request body.");
        }

        // Extract individual fields
        const { quote_no, cusType, product_code, product_id, dobForKyc, docNameForKyc, docIDNoForKyc, section } = kycData;

        // Validate required fields
        if (!quote_no || !cusType || !product_code || !product_id || !dobForKyc || !docNameForKyc || !docIDNoForKyc) {
            throw new Error("Missing required fields in KYC request. Ensure all mandatory fields are provided.");
        }

        // Validate date of birth format (yyyy-mm-dd)
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
        const formattedDob = dobForKyc.includes("-") ? dobForKyc.split("-").reverse().join("-") : dobForKyc;
        if (!dobRegex.test(formattedDob)) {
            throw new Error("Invalid `dobForKyc` format. Expected format is yyyy-mm-dd.");
        }

        // Attach validated and formatted data to `req.kycData` for downstream processing
        req.kycData = {
            panNum: docIDNoForKyc,
            dob: formattedDob,
            document_type: docNameForKyc,
            id_number: "", // Hardcoded as per API
            consent_purpose: "this is a consent purpose string pass anything",
        };

        console.log("✅ KYC request payload validated successfully.");
        next(); // Proceed to the controller
    } catch (error) {
        console.error("❌ KYC Validation Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { validateKYCRequest };
