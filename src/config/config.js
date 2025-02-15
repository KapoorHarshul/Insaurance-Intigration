require('dotenv').config(); // Ensuring environment variables are loaded

module.exports = {
    CKYCURL: "https://apiuat.religarehealthinsurance.com/relinterfacerestful/religare/secure/restful/ckycDownload",
    TOKENURL: "https://apiuat.religarehealthinsurance.com/relinterfacerestful/religare/secure/restful/generatePartnerToken",
    ManualKYCURL: "https://apiuat.religarehealthinsurance.com/relinterfacerestful/religare/secure/restful/uploadEkycDocument",

    SocketDomain: "apiuat.religarehealthinsurance.com",
    SocketPort: 443,
    SocketTimeout: 2000,

    RELIGAREHealthPartnerId: process.env.RELIGARE_HEALTH_PARTNER_ID || "476166",
    RELIGAREHealthSignature: process.env.RELIGARE_HEALTH_SIGNATURE || "LnwJqMtnL8XxF0+hRYr97ctwbax6b3/LSf2Hh6PazxQ=",
    RELIGAREHealthSecurityKey: process.env.RELIGARE_HEALTH_SECURITY_KEY || "dkpBQ0Q3cGVGb1NXVnNsWW1EaERWb0ErQVFyTGFhSytNZCtrVzdzRGtrOW1DWktaTDdwWHRWdVZoYnpyV1JseA==",

    APPLICATION_CD: process.env.APPLICATION_CD || "PARTNERAPP",
    COOKIE: process.env.COOKIE || "TS017bd16f=01be89bfcc3f49b14aa74d59e4620be8994864f0ce3a67aaaea77962eb77eade9d05b69d4bd93e47e2329118830a2bf282d8405fac",

    AES_KEY: 'z5yK1lw7XYt6YKdP7Pne2Jw3zRkMAziH',  // 32-byte AES key
    IV: 'i0kbCAlFTlDXshYV'  // 16-byte IV
};
