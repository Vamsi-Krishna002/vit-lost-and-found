import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
            VIT Lost & Found
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-sm text-gray-500 sm:text-base md:text-lg md:mt-6 md:max-w-3xl">
            The easiest way to find your lost items or help others find theirs within the VIT community.
          </p>
          <div className="mt-6 flex flex-col items-center sm:flex-row sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/login"
                className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:px-8 sm:py-4 md:text-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-sm text-indigo-600 font-semibold tracking-wide uppercase sm:text-base">
              How It Works
            </h2>
            <p className="mt-3 text-2xl leading-7 font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              Simple and Effective
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                title="Report Lost Items"
                description="Quickly post details about your lost item with description and location information."
                icon={<Search className="h-6 w-6" />}
              />
              <FeatureCard
                title="Get Notified"
                description="Receive instant notifications when someone finds your item or matches are found."
                icon={<Bell className="h-6 w-6" />}
              />
              <FeatureCard
                title="Safe Return"
                description="Connect with the finder and arrange a safe return of your belongings."
                icon={<ArrowRight className="h-6 w-6" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col sm:flex-row items-start">
      <div className="flex-shrink-0 h-12 w-12 rounded-md bg-indigo-500 text-white flex items-center justify-center">
        {icon}
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
