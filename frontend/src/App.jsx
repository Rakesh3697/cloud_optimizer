import React, { useState } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

// Import Components
import TechStackPage from './components/Pages/TechStackPage';
import ConfigurationPage from './components/Pages/ConfigurationPage';
import ResultsPage from './components/Pages/ResultsPage';

// Import Utils & Services
import { initialInputs } from './utils/cloudLogic';
import { fetchCloudCosts } from './services/api'; 
import './App.css';

// --- Internal Component: Step Indicator ---
const StepIndicator = ({ currentStep }) => {
    const steps = ['Tech Stack', 'Configuration', 'Results'];
    const stepMap = { techStack: 1, configuration: 2, results: 3 };
    const currentStepNum = stepMap[currentStep];

    return (
        <div className="ccc-step-indicator-wrapper">
            {steps.map((step, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStepNum;
                const isCompleted = stepNum < currentStepNum;
                return (
                    <React.Fragment key={step}>
                        <div className="ccc-flex-items">
                            <div className={`ccc-step-circle ${isActive ? 'ccc-step-active' : isCompleted ? 'ccc-step-completed' : 'ccc-step-default'}`}>
                                {isCompleted ? <CheckCircle size={20} /> : stepNum}
                            </div>
                            <span className={`ccc-step-label ${isActive ? 'ccc-step-label-active' : 'ccc-step-label-default'}`}>{step}</span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`ccc-step-line ${isCompleted ? 'ccc-step-line-completed' : isActive ? 'ccc-step-line-active' : 'ccc-step-line-default'}`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

// --- Main Application Component ---
const App = () => {
    const [page, setPage] = useState('techStack'); // 'techStack', 'configuration', 'results'
    const [inputs, setInputs] = useState(initialInputs);
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Generic Change Handler for all inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'range' || type === 'number' ? parseFloat(value) || 0 : value),
        }));
    };

    const handleReset = () => {
        setInputs(initialInputs);
        setResults(null);
        setError(null);
        setPage('techStack');
    };

    const runComparison = async () => {
        setIsLoading(true);
        setError(null);
        setResults(null);

        // Map React State to Java Backend DTO (Inputs.java)
        // Ensure variable names match exactly what the Spring Controller expects
        const backendPayload = {
            // Tech Stack (Page 1)
            frontend: inputs.frontend,
            backend: inputs.backend,
            databaseTech: inputs.databaseTech,
            devops: inputs.devops,

            // Basic Config (Page 2)
            useCase: inputs.useCase,
            region: inputs.region,
            
            // Compute Resources
            vCPUs: inputs.vCPUs,              // Raw vCPU per instance
            ram: inputs.ramPerInstance,       // Raw RAM per instance
            numInstances: inputs.numInstances,
            
            // Storage & DB
            storageSize: inputs.storageSize,
            storageType: inputs.storageType,
            dbSize: inputs.dbSize,
            dbType: inputs.dbType,
            
            // Networking & Pricing
            bandwidth: inputs.networkingBandwidth,
            pricingModel: inputs.pricingModel,
            
            // Advanced Toggles (Booleans)
            // Note: handleChange sets these to boolean true/false, so we pass them directly
            autoScaling: inputs.autoScaling,
            serverless: inputs.serverlessOptions,
            aiMlIntegration: inputs.aiMlIntegration,
            highAvailability: inputs.highAvailability,
            sustainabilityFocus: inputs.sustainabilityFocus,
            
            // Projections
            performanceWeight: inputs.performanceWeight,
            futureProjectionMonths: inputs.futureProjectionMonths
        };

        try {
            // Call Spring Boot API
            const data = await fetchCloudCosts(backendPayload);
            
            setResults(data);
            setPage('results');
        } catch (err) {
            console.error(err);
            setError("Could not connect to the Backend API. Ensure your Spring Boot app is running on port 8080.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ccc-main-container">
            <header className="ccc-header-wrapper">
                <h1 className="ccc-title-4xl">
                    <RefreshCw size={32} style={{ marginRight: '0.75rem' }} color="#4F46E5" />
                    Cloud Cost Comparator & Advisor
                </h1>
                <p className="ccc-text-lg ccc-text-gray-500 ccc-mt-2">A guided multi-cloud cost analysis for your specific stack.</p>
            </header>

            <div className="ccc-max-w-7xl ccc-mx-auto">
                <StepIndicator currentStep={page} />

                {error && (
                    <div className="ccc-error-banner">
                        <AlertTriangle size={24} style={{marginRight: '10px'}} />
                        {error}
                    </div>
                )}

                {page === 'techStack' && (
                    <TechStackPage 
                        inputs={inputs} 
                        handleChange={handleChange} 
                        setPage={setPage} 
                    />
                )}
                
                {page === 'configuration' && (
                    <ConfigurationPage 
                        inputs={inputs} 
                        handleChange={handleChange} 
                        runComparison={runComparison} 
                        setPage={setPage} 
                        isLoading={isLoading} 
                    />
                )}
                
                {page === 'results' && (
                    <ResultsPage 
                        results={results} 
                        inputs={inputs} 
                        handleReset={handleReset} 
                        setPage={setPage} 
                    />
                )}
            </div>
        </div>
    );
};

export default App;