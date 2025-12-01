import React from 'react';
import { ArrowRight, Database, Code, Wind, Server } from 'lucide-react';
import InputGroup from '../Shared/InputGroup.jsx';

const TechStackPage = ({ inputs, handleChange, setPage }) => (
  <div className="ccc-page-card ccc-tech-stack-card ccc-animate-fade-in">
    <h2 className="ccc-title-2xl ccc-text-gray-800 ccc-mb-2">Step 1: Define Your Technology Stack</h2>
    <p className="ccc-text-gray-500 ccc-mb-6">Tell us about the technologies you're using. This context helps refine our recommendations.</p>
    <div className="ccc-space-y-6">
      <InputGroup icon={<Code size={20} color="#9CA3AF"/>} label="Frontend Framework" name="frontend" value={inputs.frontend} onChange={handleChange} type="select" options={['React','Angular','Vue.js','Svelte','Static HTML/CSS']}/>
      <InputGroup icon={<Server size={20} color="#9CA3AF"/>} label="Backend Language / Framework" name="backend" value={inputs.backend} onChange={handleChange} type="select" options={['Node.js','Python (Django/Flask)','Java (Spring)','Go','.NET','PHP']}/>
      <InputGroup icon={<Database size={20} color="#9CA3AF"/>} label="Primary Database" name="databaseTech" value={inputs.databaseTech} onChange={handleChange} type="select" options={['PostgreSQL','MySQL','MongoDB','Redis','Microsoft SQL Server']}/>
      <InputGroup icon={<Wind size={20} color="#9CA3AF"/>} label="DevOps / CI/CD Tool" name="devops" value={inputs.devops} onChange={handleChange} type="select" options={['GitHub Actions','Jenkins','GitLab CI','Docker','Kubernetes']}/>
    </div>
    <button onClick={() => setPage('configuration')} className="ccc-button-primary ccc-w-full ccc-mt-8 ccc-text-lg ccc-flex-center">
      Next: Configure Deployment <ArrowRight size={20} style={{marginLeft:'0.5rem'}}/>
    </button>
  </div>
);

export default TechStackPage;
