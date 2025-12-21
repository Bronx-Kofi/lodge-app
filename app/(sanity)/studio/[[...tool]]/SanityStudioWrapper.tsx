"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// Check if Sanity is properly configured
const isSanityConfigured = 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && 
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'mockprojectid';

export default function SanityStudioWrapper() {
  if (!isSanityConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Sanity Studio Not Configured
          </h1>
          <p className="text-gray-600 mb-6">
            To use Sanity Studio, you need to set up your Sanity project credentials.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Setup Instructions:</h2>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Visit <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" className="underline">sanity.io/manage</a></li>
              <li>Create a new project or select an existing one</li>
              <li>Get your Project ID and API Token</li>
              <li>Update your <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> file</li>
            </ol>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Add to .env.local:</h3>
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your-token`}
            </pre>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-2">Current Status:</h3>
            <p className="text-gray-600">
              The website is using <strong>mock data</strong> and will continue to work normally.
              Once Sanity is configured, managers can edit content through this Studio.
            </p>
          </div>

          <div className="mt-6">
            <a 
              href="/SANITY_SETUP.md" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Full Setup Guide
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
