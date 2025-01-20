const calculateQuotes = async (req, res) => {
    try {
      const { members, personalDetails } = req.body;
  
      // Validate input
      if (!members || !Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ error: 'Please provide valid family member details.' });
      }
  
      if (!personalDetails || !personalDetails.mobile || !personalDetails.pincode) {
        return res.status(400).json({ error: 'Please provide valid personal details.' });
      }
  
      // Calculate quotes based on family details
      const quotes = generateQuotes(members, personalDetails);
  
      res.status(200).json({ quotes });
    } catch (error) {
      console.error('Error generating quotes:', error.message);
      res.status(500).json({ error: 'Failed to generate quotes' });
    }
  };
  
  // Quotation generation logic
  const generateQuotes = (members, personalDetails) => {
    const basePremium = 3000; // Base premium amount
    const ageMultiplier = 1.2; // Premium increases by 20% for each decade of age
    const memberDiscount = 0.9; // 10% discount for each additional member
  
    const totalPremium = members.reduce((total, member, index) => {
      const age = calculateAge(member.dob);
      let premium = basePremium * Math.pow(ageMultiplier, Math.floor(age / 10)); // Adjust premium by age
  
      // Apply discount for additional members
      if (index > 0) {
        premium *= memberDiscount;
      }
  
      return total + premium;
    }, 0);
  
    // Example companies
    return [
      { company: 'Insurance Co. A', premium: totalPremium.toFixed(2), coverage: 500000 },
      { company: 'Insurance Co. B', premium: (totalPremium * 1.1).toFixed(2), coverage: 550000 },
      { company: 'Insurance Co. C', premium: (totalPremium * 0.9).toFixed(2), coverage: 450000 },
    ];
  };
  
  // Helper function to calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  module.exports = { calculateQuotes };
  