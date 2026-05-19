import React from 'react';
import './Animated3DBackground.css';

const Animated3DBackground = () => {
    return (
        <div className="animated-3d-bg">
            {/* Ocean Mesh Background */}
            <div className="ocean-mesh-container">
                <div className="ocean-mesh"></div>
            </div>

            {/* Devices moving left to right */}
            <div className="device-wrapper desktop-wrapper">
                <div className="device desktop">
                    <div className="desktop-monitor"></div>
                    <div className="desktop-stand"></div>
                    <div className="desktop-base"></div>
                </div>
            </div>

            <div className="device-wrapper laptop-wrapper">
                <div className="device laptop">
                    <div className="laptop-screen"></div>
                    <div className="laptop-base"></div>
                </div>
            </div>

            <div className="device-wrapper phone-wrapper">
                <div className="device phone">
                    <div className="phone-screen"></div>
                    <div className="phone-button"></div>
                </div>
            </div>

            <div className="device-wrapper learner-wrapper">
                <div className="learner">
                    <div className="learner-head"></div>
                    <div className="learner-body"></div>
                    <div className="learner-book"></div>
                </div>
            </div>
        </div>
    );
};

export default Animated3DBackground;
