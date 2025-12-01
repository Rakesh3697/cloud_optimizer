// src/utils/cloudLogic.js

export const initialInputs = {
    // Tech Stack (Page 1)
    frontend: 'React',
    backend: 'Node.js',
    databaseTech: 'PostgreSQL',
    devops: 'GitHub Actions',

    // Configuration (Page 2 - The Screenshot)
    useCase: 'Web Hosting',
    region: 'US-East',
    vCPUs: 16,
    ramPerInstance: 4,
    numInstances: 4,
    storageSize: 2000,
    storageType: 'SSD/Standard',
    dbSize: 500,
    dbType: 'SQL',
    networkingBandwidth: 500,
    pricingModel: 'On-demand',

    // Advanced Toggles
    autoScaling: false,
    serverlessOptions: false,
    aiMlIntegration: true,     // Matches screenshot (Blue)
    highAvailability: true,    // Matches screenshot (Blue)
    sustainabilityFocus: false,

    // Sliders
    performanceWeight: 7,
    futureProjectionMonths: 6
};
// This function now only generates UI text/badges.
// The actual recommendation calculation happens in the Java Backend.
export const useCaseFitAnalysis = (useCase, provider, inputs) => {
    let analysis;
    switch (provider) {
        case 'AWS':
            analysis = {
                strength: `Massive ecosystem (EC2, S3, RDS, Lambda). Highly mature tooling. Excellent for IoT and Enterprise Apps.`,
                weakness: `Can be complex to manage/optimize. Egress costs are often high.`,
                suitability: useCase === 'IoT' || useCase === 'Enterprise Apps' || useCase === 'Web Hosting' ? 'High' : 'Medium',
            };
            break;
        case 'Azure':
            analysis = {
                strength: `Best for enterprises already using Microsoft products (Windows Server, SQL Server). Strong Hybrid Cloud features.`,
                weakness: `Compute pricing can be less flexible than competitors. Less specialized services outside the Microsoft stack.`,
                suitability: useCase === 'Enterprise Apps' || useCase === 'Web Hosting' || useCase === 'Database Management' ? 'High' : 'Medium',
            };
            // Tech stack bonus for .NET
            if (inputs.backend === '.NET') {
                analysis.strength = `Deep .NET integration. ` + analysis.strength;
                analysis.suitability = 'High';
            }
            break;
        case 'GCP':
            analysis = {
                strength: `Strongest in Big Data (BigQuery, Dataflow) and Machine Learning (Vertex AI). Often offers the best initial compute pricing.`,
                weakness: `Smaller market share/community. Less mature global regional footprint compared to AWS/Azure.`,
                suitability: useCase === 'Big Data Analytics' || useCase === 'Machine Learning/AI' || useCase === 'Software Development' ? 'High' : 'Medium',
            };
            break;
        default:
            analysis = { strength: '', weakness: '', suitability: 'Medium' };
    }
    return analysis;
};