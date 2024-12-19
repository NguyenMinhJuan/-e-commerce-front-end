import React from 'react';
import './TermsOfService.css';  // Import CSS file for styling

const TermsOfService = () => {
    return (
        <div className="terms-container">
            <h1>Terms of Service</h1>
            <div className="terms-content">
                <p>Welcome to our platform. These are the terms of service that govern your usage of our services. By accessing our website, you agree to comply with and be bound by the following terms:</p>

                <h2>1. General Terms</h2>
                <p>We reserve the right to modify or update the terms at any time. You should review these terms periodically to stay updated.</p>

                <h2>2. Use of Service</h2>
                <p>You agree to use our services in compliance with all applicable laws and regulations. You may not engage in any activity that disrupts or damages the service.</p>

                <h2>3. Account Responsibility</h2>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account.</p>

                <h2>4. Privacy Policy</h2>
                <p>Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and protect your data.</p>

                <h2>5. Limitation of Liability</h2>
                <p>We will not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.</p>

                <h2>6. Governing Law</h2>
                <p>These terms are governed by the laws of [Your Country]. Any disputes will be handled in the courts of [Your Country].</p>

                <h2>7. Contact Us</h2>
                <p>If you have any questions or concerns regarding our terms, feel free to contact us at [contact@example.com].</p>

                <p>By continuing to use our services, you accept these terms of service.</p>
            </div>
        </div>
    );
};

export default TermsOfService;
