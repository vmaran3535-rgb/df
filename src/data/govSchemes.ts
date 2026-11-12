export interface GovScheme {
  id: string;
  name: string;
  category: 'Direct Benefit' | 'Insurance' | 'Irrigation' | 'Credit' | 'Machinery' | 'Soil & Organic';
  shortDesc: string;
  financialAssistance: string;
  eligibility: string[];
  documentsRequired: string[];
  officialPortalUrl: string;
  nodalAgency: string;
  lastUpdated: string;
  stateAvailability: 'All India' | 'Tamil Nadu' | 'State Specific';
}

export const GOV_SCHEMES: GovScheme[] = [
  {
    id: 'pm-kisan',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    category: 'Direct Benefit',
    shortDesc: 'Direct income support of ₹6,000 per year in three equal 4-monthly installments directly into farmers bank accounts.',
    financialAssistance: '₹6,000 per year (3 installments of ₹2,000 each via DBT)',
    eligibility: [
      'All landholding farmer families with cultivable land in their names',
      'Small and marginal farmers as well as medium and large landholders',
      'Excludes institutional landholders and constitutional post holders'
    ],
    documentsRequired: [
      'Aadhaar Card linked to Mobile Number',
      'Bank Account details (DBT/NPCI enabled)',
      'Land Ownership Record (Pattadar Passbook / Khasra-Khatauni / Chitta)'
    ],
    officialPortalUrl: 'https://pmkisan.gov.in',
    nodalAgency: 'Ministry of Agriculture & Farmers Welfare, GoI',
    lastUpdated: 'November 2026',
    stateAvailability: 'All India'
  },
  {
    id: 'pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    category: 'Insurance',
    shortDesc: 'Comprehensive crop insurance coverage against non-preventable natural risks from pre-sowing to post-harvest stages.',
    financialAssistance: 'Farmer pays nominal premium: 2% for Kharif, 1.5% for Rabi, 5% for Annual Commercial/Horticultural crops. Balance subsidized by Govt.',
    eligibility: [
      'All farmers growing notified crops in notified areas',
      'Both loanee and non-loanee farmers are eligible',
      'Sharecroppers and tenant farmers with valid land tenancy proof'
    ],
    documentsRequired: [
      'Sowing Certificate issued by Village Administrative Officer (VAO/Patwari)',
      'Pattadar Passbook / Land Record',
      'Aadhaar and Bank Passbook copy'
    ],
    officialPortalUrl: 'https://pmfby.gov.in',
    nodalAgency: 'Department of Agriculture & Cooperation',
    lastUpdated: 'November 2026',
    stateAvailability: 'All India'
  },
  {
    id: 'pmksy',
    name: 'Pradhan Mantri Krishi Sinchayee Yojana (Per Drop More Crop - PMKSY)',
    category: 'Irrigation',
    shortDesc: 'Financial subsidy for installation of Micro Irrigation systems (Drip and Sprinkler) to improve water-use efficiency.',
    financialAssistance: 'Up to 55% subsidy for Small & Marginal farmers, 45% for other farmers; Tamil Nadu provides 100% subsidy for SF/MF and 75% for others.',
    eligibility: [
      'All farmers having assured water source (open well, borewell, or farm pond)',
      'Minimum cultivable land holding of 0.5 acre'
    ],
    documentsRequired: [
      'Chitta / Adangal / Land ownership documents',
      'Borewell / Well certificate and water test report',
      'Electricity connection certificate / NOC',
      'Field Sketch / Map'
    ],
    officialPortalUrl: 'https://pmksy.gov.in',
    nodalAgency: 'Department of Agriculture & State Horticulture Depts',
    lastUpdated: 'October 2026',
    stateAvailability: 'All India'
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC) & Interest Subvention Scheme',
    category: 'Credit',
    shortDesc: 'Adequate and timely institutional credit for crop cultivation, animal husbandry, post-harvest expenses, and farm maintenance.',
    financialAssistance: 'Loans up to ₹3 Lakhs at concessional 7% interest rate; prompt repaying farmers get 3% prompt repayment incentive, making effective rate 4%. Collateral-free up to ₹1.60 Lakh.',
    eligibility: [
      'All farmers - individuals / joint borrowers who are owner cultivators',
      'Tenant farmers, oral lessees, and sharecroppers',
      'Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers'
    ],
    documentsRequired: [
      'Duly completed application form',
      'Identity & Address proof (Aadhaar / Voter ID)',
      'Land records verified by Revenue Official',
      'Cropping pattern declaration'
    ],
    officialPortalUrl: 'https://www.myscheme.gov.in/schemes/kcc',
    nodalAgency: 'NABARD & Commercial Banks / RRBs / Co-operative Banks',
    lastUpdated: 'November 2026',
    stateAvailability: 'All India'
  },
  {
    id: 'smam',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    category: 'Machinery',
    shortDesc: 'Subsidies on tractors, power tillers, rotavators, combine harvesters, laser land levellers, and agricultural drones.',
    financialAssistance: '40% to 50% subsidy on farm implements (special 50% for SC/ST, women, and small/marginal farmers); up to 10 Lakhs for Custom Hiring Centres.',
    eligibility: [
      'Individual farmers who have not availed machinery subsidy in previous 3-5 years',
      'Farmer Producer Organizations (FPOs) and Primary Agricultural Credit Societies (PACS)'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Land revenue document',
      'Bank passbook copy',
      'Quotation from authorized implement dealer'
    ],
    officialPortalUrl: 'https://agrimachinery.nic.in',
    nodalAgency: 'Ministry of Agriculture & Farmers Welfare',
    lastUpdated: 'November 2026',
    stateAvailability: 'All India'
  },
  {
    id: 'tn-kalaignar-scheme',
    name: 'Kalaignarin All Village Integrated Agriculture Development Programme',
    category: 'Soil & Organic',
    shortDesc: 'Holistic agricultural transformation across village panchayats in Tamil Nadu: distribution of coconut saplings, horticulture toolkits, and farm ponds.',
    financialAssistance: '100% free distribution of coconut seedlings, pulse mini-kits, vegetable seeds, and farm pond excavation subsidies.',
    eligibility: [
      'Farmers residing in the selected village panchayats for the current phase',
      'Preference to small/marginal farmers, women farmers, and adi dravidar farmers'
    ],
    documentsRequired: [
      'Aadhaar Card',
      'Patta / Chitta in Uzhavan App / TN Agrisnet',
      'Bank Account details'
    ],
    officialPortalUrl: 'https://www.tnagrisnet.tn.gov.in',
    nodalAgency: 'Department of Agriculture & Farmers Welfare, Govt of Tamil Nadu',
    lastUpdated: 'November 2026',
    stateAvailability: 'Tamil Nadu'
  }
];
