// src/pages/SignUpPage.tsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// A simple styled input component for the form
const FormInput = ({ label, placeholder, type = 'text' }: { label: string, placeholder: string, type?: string }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
    />
  </div>
);

const SignUpPage = () => {
  return (
    <div className="bg-dark-bg text-white">
      <Header />
      <main className="py-20 lg:py-24" style={{ background: 'linear-gradient(135deg, #4f0093 0%, #1f004d 100%)' }}>
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Want to Acquire a Business?
              <br />
              We'll Fund You!
            </h1>
            <p className="text-lg text-slate-200 max-w-lg">
              At Passet, We back experienced operators with the capital, playbooks, and expert support needed to acquire and grow subscription-based Internet Businesses.
            </p>
          </div>

          <div className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Name" placeholder="Your full name" />
                <FormInput label="Email" placeholder="you@example.com" type="email" />
                <FormInput label="Phone number (include country code)" placeholder="+1 (555) 000-0000" />
                <FormInput label="LinkedIn profile" placeholder="linkedin.com/in/yourprofile" />
                <FormInput label="Your Acquisition Budget:" placeholder="$100,000" />
                <FormInput label="Git Profile (if any)" placeholder="github.com/yourprofile" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Briefly describe why you are interested:</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input id="terms" type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to all the <a href="#" className="font-medium text-purple-600 hover:underline">Terms</a> and <a href="#" className="font-medium text-purple-600 hover:underline">Privacy policy</a>
                </label>
              </div>

              <button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <span>Get in Touch</span>
                <span className="transform -rotate-45 group-hover:translate-x-1">→</span>
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;