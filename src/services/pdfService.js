const PDFDocument = require('pdfkit');
const fs = require('fs');
const { fetchData } = require('./dbService');

async function createPolicyPDF(customerId, policyId, outputFilePath) {
    const data = await fetchData(customerId, policyId);
    const { customer, policy } = data;

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputFilePath);
    doc.pipe(stream);

    // Adding customer and policy information to the PDF
    doc.fontSize(16).text('Policy Details', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Customer Name: ${customer.name}`);
    doc.text(`Customer ID: ${customer.id}`);
    doc.text(`Email: ${customer.email}`);
    doc.moveDown();
    doc.text(`Policy Name: ${policy.name}`);
    doc.text(`Policy ID: ${policy.id}`);
    doc.text(`Premium: ${policy.premium}`);
    doc.text(`Coverage Amount: ${policy.coverageAmount}`);

    // Finalize PDF file
    doc.end();

    stream.on('finish', () => {
        console.log(`PDF has been created and written to ${outputFilePath}`);
    });

    stream.on('error', (error) => {
        console.error('Error writing PDF to disk:', error);
    });
}

module.exports = { createPolicyPDF };
