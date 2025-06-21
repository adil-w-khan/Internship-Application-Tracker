import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';

const TermsOfService = () => {
  const lastUpdated = "December 2024";

  return (
    <AuthLayout>
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
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to AppTrack By Adil. These Terms of Service ("Terms") govern your use of our 
                internship application tracking service ("Service") operated by Adil ("us", "we", or "our"). 
                By accessing or using our Service, you agree to be bound by these Terms. If you do not 
                agree to these Terms, please do not use our Service.
              </p>
            </section>

            {/* Age Requirement */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Age Requirement</h2>
              <p className="text-gray-700">
                You must be at least 17 years old to use AppTrack By Adil. By using our Service, 
                you represent and warrant that you are at least 17 years of age. If you are under 17, 
                you may not use our Service.
              </p>
            </section>

            {/* Description of Service */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description of Service</h2>
              <p className="text-gray-700 mb-4">
                AppTrack By Adil is an online platform that helps users track and manage their 
                internship applications. Our Service allows you to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Create and manage internship application records</li>
                <li>Track application status and progress</li>
                <li>Store application-related notes and information</li>
                <li>View statistics and analytics about your applications</li>
                <li>Export your application data</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts and Responsibilities</h2>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Account Creation</h3>
              <p className="text-gray-700 mb-4">
                To use our Service, you must create an account by providing a valid email address and password. 
                You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Account Responsibilities</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide accurate and truthful information</li>
                <li>Keep your account information up to date</li>
                <li>Maintain the security of your password</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Use the Service only for lawful purposes</li>
              </ul>
            </section>

            {/* User Content and Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Content and Data</h2>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Your Data</h3>
              <p className="text-gray-700 mb-4">
                You retain ownership of all data and content you submit to our Service, including 
                application information, notes, and other materials ("User Content"). You grant us 
                a limited license to store, process, and display your User Content solely for the 
                purpose of providing our Service to you.
              </p>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">Data Accuracy</h3>
              <p className="text-gray-700 mb-4">
                You are solely responsible for the accuracy and legality of your User Content. 
                We do not verify the accuracy of information you provide and are not responsible 
                for any consequences resulting from inaccurate information.
              </p>
            </section>

            {/* Prohibited Uses */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Prohibited Uses</h2>
              <p className="text-gray-700 mb-4">You may not use our Service:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To transmit or create any harmful, disruptive, or malicious content</li>
                <li>To attempt to gain unauthorized access to our systems or other users' accounts</li>
                <li>To interfere with or disrupt our Service or servers</li>
                <li>To impersonate any person or entity</li>
                <li>To collect personal information about other users</li>
              </ul>
            </section>

            {/* Service Availability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Availability</h2>
              <p className="text-gray-700">
                We strive to provide reliable access to our Service, but we do not guarantee that 
                the Service will be available at all times. We may temporarily suspend or restrict 
                access to some or all of our Service for maintenance, updates, or other operational 
                reasons. We will not be liable for any inconvenience or losses resulting from service 
                interruptions.
              </p>
            </section>

            {/* Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Our collection and use of personal information is 
                governed by our Privacy Policy, which is incorporated into these Terms by reference. 
                By using our Service, you consent to the collection and use of your information as 
                described in our Privacy Policy.
              </p>
            </section>

            {/* Disclaimers */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimers</h2>
              <p className="text-gray-700 mb-4">
                Our Service is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, 
                either express or implied. We specifically disclaim all warranties including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                <li>Warranties that the Service will be uninterrupted, secure, or error-free</li>
                <li>Warranties regarding the accuracy or reliability of any information obtained through the Service</li>
              </ul>
              <p className="text-gray-700">
                AppTrack By Adil is a tool to help organize your internship search. We do not guarantee 
                that using our Service will result in internship offers or employment opportunities.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, we shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited 
                to loss of profits, data, use, goodwill, or other intangible losses, resulting from 
                your use of our Service. Our total liability to you for any claims arising from or 
                related to your use of our Service shall not exceed the amount you have paid us in 
                the past twelve months.
              </p>
            </section>

            {/* Account Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account Termination</h2>
              <p className="text-gray-700 mb-4">
                You may terminate your account at any time by using the account deletion feature 
                in your settings. We may terminate or suspend your account at our discretion if 
                you violate these Terms or engage in prohibited activities.
              </p>
              <p className="text-gray-700">
                Upon termination, your right to use the Service will cease immediately, and we 
                may delete your account and all associated data.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700">
                The Service and its original content, features, and functionality are owned by us 
                and are protected by international copyright, trademark, patent, trade secret, and 
                other intellectual property laws. You may not reproduce, distribute, modify, create 
                derivative works of, publicly display, publicly perform, republish, download, store, 
                or transmit any of our content without our prior written consent.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to These Terms</h2>
              <p className="text-gray-700">
                We reserve the right to update or modify these Terms at any time. We will notify 
                users of any material changes by posting the updated Terms on our website and 
                updating the "Last updated" date. Your continued use of the Service after such 
                modifications constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with the laws of 
                the United States, without regard to conflict of law provisions. Any disputes 
                arising from these Terms or your use of our Service shall be resolved through 
                binding arbitration.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> contact@apptrack.com</p>
                <p className="text-gray-700"><strong>Subject:</strong> Terms of Service Inquiry</p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default TermsOfService;