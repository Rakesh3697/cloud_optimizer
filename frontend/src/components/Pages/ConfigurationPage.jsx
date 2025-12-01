import React from 'react';
import { ArrowLeft, BarChart2, Zap, Code, Database, ShieldCheck, Leaf } from 'lucide-react';
import InputGroup from '../Shared/InputGroup';
import InputToggle from '../Shared/InputToggle';

const ConfigurationPage = ({ inputs, handleChange, runComparison, setPage, isLoading }) => {
    
    // Icon color to be used on the Advanced Options
    const iconColor = "#4F46E5"; // Indigo-600

    return (
        <div className="ccc-page-card ccc-animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Split Layout: Left (Forms) & Right (Advanced) */}
            <div className="ccc-config-grid">
                
                {/* --- LEFT COLUMN: Deployment Configuration --- */}
                <div className="ccc-config-col-left">
                    <h2 className="ccc-title-lg ccc-mb-6 ccc-text-gray-800">Deployment Configuration</h2>
                    
                    {/* Row 1: Use Case & Region */}
                    <div className="ccc-grid-2">
                        <InputGroup label="Use Case" name="useCase" value={inputs.useCase} onChange={handleChange} type="select">
                            <option value="Web Hosting">Web Hosting</option>
                            <option value="Enterprise Apps">Enterprise Apps</option>
                            <option value="AI/ML Workload">AI/ML Workload</option>
                        </InputGroup>
                        <InputGroup label="Region" name="region" value={inputs.region} onChange={handleChange} type="select">
                            <option value="US-East">US-East (N. Virginia)</option>
                            <option value="US-West">US-West (Oregon)</option>
                            <option value="EU-West">EU-West (London)</option>
                            <option value="Asia-Pacific">Asia-Pacific (Singapore)</option>
                        </InputGroup>
                    </div>

                    {/* Row 2: vCPU & RAM */}
                    <div className="ccc-grid-2">
                        <InputGroup label="vCPUs per Instance" name="vCPUs" value={inputs.vCPUs} onChange={handleChange} type="number" />
                        <InputGroup label="RAM (GB) per Instance" name="ramPerInstance" value={inputs.ramPerInstance} onChange={handleChange} type="number" />
                    </div>

                    {/* Row 3: Instances (Full Width) */}
                    <InputGroup label="Number of Instances" name="numInstances" value={inputs.numInstances} onChange={handleChange} type="number" />

                    {/* Row 4: Storage */}
                    <div className="ccc-grid-2">
                        <InputGroup label="Total Storage (GB)" name="storageSize" value={inputs.storageSize} onChange={handleChange} type="number" />
                        <InputGroup label="Storage Type" name="storageType" value={inputs.storageType} onChange={handleChange} type="select">
                            <option value="SSD/Standard">SSD/Standard</option>
                            <option value="HDD/Cold">HDD/Cold Storage</option>
                            <option value="NVMe/Premium">NVMe/Premium SSD</option>
                        </InputGroup>
                    </div>

                    {/* Row 5: Database */}
                    <div className="ccc-grid-2">
                        <InputGroup label="Database Size (GB)" name="dbSize" value={inputs.dbSize} onChange={handleChange} type="number" />
                        <InputGroup label="Database Type" name="dbType" value={inputs.dbType} onChange={handleChange} type="select">
                            <option value="SQL">SQL (Relational)</option>
                            <option value="NoSQL">NoSQL (Document/Key-Value)</option>
                        </InputGroup>
                    </div>

                    {/* Row 6: Networking */}
                    <InputGroup label="Networking Egress (GB/month)" name="networkingBandwidth" value={inputs.networkingBandwidth} onChange={handleChange} type="number" />

                    {/* Row 7: Pricing Model */}
                    <InputGroup label="Pricing Model" name="pricingModel" value={inputs.pricingModel} onChange={handleChange} type="select">
                        <option value="On-demand">On-demand (Pay as you go)</option>
                        <option value="Reserved">Reserved (1 Year Commit)</option>
                        <option value="Spot">Spot Instances (Cheapest, interruptible)</option>
                    </InputGroup>
                </div>

                {/* --- RIGHT COLUMN: Advanced Options --- */}
                <div className="ccc-config-col-right">
                    <h2 className="ccc-title-lg ccc-mb-6 ccc-text-gray-800">Advanced Options & Prioritization</h2>

                    <div className="ccc-toggles-container">
                        <InputToggle label="Auto-scaling / Elasticity" name="autoScaling" checked={inputs.autoScaling} onChange={handleChange} icon={Zap} color={iconColor} />
                        <InputToggle label="Serverless options (e.g., Lambda)" name="serverlessOptions" checked={inputs.serverlessOptions} onChange={handleChange} icon={Code} color={iconColor} />
                        <InputToggle label="AI/ML Integration (e.g., specific APIs)" name="aiMlIntegration" checked={inputs.aiMlIntegration} onChange={handleChange} icon={Database} color={iconColor} />
                        <InputToggle label="High Availability (Multi-AZ)" name="highAvailability" checked={inputs.highAvailability} onChange={handleChange} icon={ShieldCheck} color={iconColor} />
                        <InputToggle label="Sustainability focus" name="sustainabilityFocus" checked={inputs.sustainabilityFocus} onChange={handleChange} icon={Leaf} color={iconColor} />
                    </div>

                    {/* Performance Weight Slider */}
                    <div className="ccc-slider-container ccc-mt-8">
                        <div className="ccc-flex-between">
                            <label className="ccc-label-sm">Performance Weight ({inputs.performanceWeight} / 10)</label>
                        </div>
                        <input type="range" name="performanceWeight" min="1" max="10" value={inputs.performanceWeight} onChange={handleChange} className="ccc-range" />
                        <div className="ccc-flex-between ccc-text-xs ccc-text-gray-500">
                            <span>Prioritize Cost</span>
                            <span>Prioritize Performance</span>
                        </div>
                    </div>

                    {/* Future Projection Slider (FIXED MONTH DISPLAY) */}
                    <div className="ccc-slider-container ccc-mt-8">
                        <div className="ccc-flex-between">
                            <label className="ccc-label-sm">
                                Future Cost Projection ({inputs.futureProjectionMonths} months)
                            </label>
                        </div>
                        <input 
                            type="range" 
                            name="futureProjectionMonths" 
                            min="1" 
                            max="36" 
                            value={inputs.futureProjectionMonths} 
                            onChange={handleChange} 
                            className="ccc-range" 
                        />
                        <div className="ccc-flex-between ccc-text-xs ccc-text-gray-500">
                            <span>1 month</span>
                            <span>36 months</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="ccc-actions-row">
                <button onClick={() => setPage('techStack')} className="ccc-btn-back">
                    <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back
                </button>
                <button onClick={runComparison} disabled={isLoading} className="ccc-btn-primary">
                    {isLoading ? 'Calculating...' : (
                        <>
                            <BarChart2 size={18} style={{ marginRight: '8px' }} /> Compare Cloud Costs
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ConfigurationPage;