import React from 'react';

const InputToggle = ({ label, name, checked, onChange, icon: Icon, color }) => {
    return (
        <div className="ccc-flex-items" style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div className="ccc-flex-items">
                {/* Apply the color prop to the Icon */}
                {Icon && <Icon size={18} color={color} style={{ marginRight: '10px' }} />}
                <span className="ccc-text-gray-700" style={{ fontSize: '0.95rem' }}>{label}</span>
            </div>
            
            <label className="ccc-switch">
                <input 
                    type="checkbox" 
                    name={name} 
                    checked={checked} 
                    onChange={onChange} 
                />
                <span className="ccc-slider ccc-round"></span>
            </label>
        </div>
    );
};

export default InputToggle;