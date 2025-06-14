import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';

const PrivacyPolicy = () => {
  const lastUpdated = "June 2025";

  return (
    <AuthLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-500 mb-4 inline-flex items-center text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to AppTrack
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to AppTrack By Adil ("we," "our," or "us"). This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our internship application tracking 
                service. Please read this privacy policy carefully. If you do not agree with the terms of this 
                privacy policy, please do not access the application.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Email address (for account creation and authentication)</li>
                <li>Password (encrypted and securely stored)</li>
                <li>Internship application data you enter (company names, positions, application dates, notes)</li>
                <li>Account preferences and settings</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Log data (IP address, browser type, access times)</li>
                <li>Device information (operating system, device type)</li>
                <li>Usage data (features used, time spent in application)</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide, operate, and maintain our service</li>
                <li>Create and manage your account</li>
                <li>Store and organize your internship application data</li>
                <li>Send you account-related communications (password resets, updates)</li>
                <li>Improve our service and develop new features</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties. 
                We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
                <li><strong>Legal requirements:</strong> When required by law, regulation, or court order</li>
                <li><strong>Service providers:</strong> With trusted third-party services that help us operate our platform (hosting, email services) under strict confidentiality agreements</li>
                <li><strong>Business transfers:</strong> In connection with any merger, sale of assets, or acquisition</li>
                <li><strong>Protection:</strong> To protect our rights, property, or safety, or that of our users</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Passwords are encrypted using industry-standard hashing algorithms</li>
                <li>Data transmission is secured using HTTPS encryption</li>
                <li>Access to your data is restricted to authorized personnel only</li>
                <li>Regular security audits and updates to our systems</li>
                <li>Secure database storage with backup and recovery procedures</li>
              </ul>
              <p className="text-gray-700 mt-4">
                However, no method of transmission over the internet or electronic storage is 100% secure. 
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information for as long as your account is active or as needed to 
                provide our services. You may delete your account at any time, and we will delete your 
                personal information within 30 days, except where we are required to retain it for legal, 
                regulatory, or legitimate business purposes.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> View the personal information we have about you</li>
                <li><strong>Update:</strong> Correct or update your personal information through your account settings</li>
                <li><strong>Delete:</strong> Request deletion of your account and associated data</li>
                <li><strong>Export:</strong> Download your application data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from non-essential communications</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, please contact us at the email address provided below.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Local Storage</h2>
              <p className="text-gray-700">
                We use browser local storage to store your authentication token and user preferences. 
                This allows you to stay logged in and maintains your application settings. You can 
                clear this data by logging out or clearing your browser's local storage.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Our service may use third-party services for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Email delivery:</strong> For sending password reset and account-related emails</li>
                <li><strong>Hosting:</strong> For application and database hosting</li>
                <li><strong>Analytics:</strong> For understanding usage patterns (anonymized data only)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                These services have their own privacy policies and are not covered by this policy.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our service is intended for users who are at least 17 years old. We do not knowingly 
                collect personal information from children under 17. If we become aware that we have 
                collected personal information from a child under 17, we will take steps to delete 
                such information.
              </p>
            </section>

            {/* International Users */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Users</h2>
              <p className="text-gray-700">
                If you are accessing our service from outside the United States, please be aware that 
                your information may be transferred to, stored, and processed in the United States. 
                By using our service, you consent to this transfer.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new Privacy Policy on this page and updating the "Last updated" 
                date. Your continued use of the service after such modifications constitutes acceptance 
                of the updated Privacy Policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> contact@apptrack.com</p>
                <p className="text-gray-700"><strong>Subject:</strong> Privacy Policy Inquiry</p>
              </div>
              <p className="text-gray-700 mt-4">
                We will respond to your inquiry within 48 hours.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
    </AuthLayout>
  );
};

export default PrivacyPolicy;