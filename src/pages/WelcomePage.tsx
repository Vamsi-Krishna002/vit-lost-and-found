import React from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, Package, BellRing, ArrowRightCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Section */}
          <div>
            <span className="text-lg sm:text-xl text-indigo-600 font-medium mb-4 block">
              Find, Return, Reconnect.
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Lost Something on
              <span className="text-indigo-600 block mt-2">Campus?</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-600">
              Connect with the VIT community to find your lost items or help others find theirs.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              {/* Redirect to Login Page */}
              <Link
                to="/login"
                className="group px-6 py-3 bg-red-600 text-white rounded-full text-sm sm:text-lg font-medium hover:bg-red-700 transition-all flex items-center justify-center"
              >
                Report Lost Item
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* How It Works Section */}
          <div>
            <div className="bg-gray-50 py-12 px-6 sm:px-8 rounded-xl shadow-md">
              <h3 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-12">
                How It Works
              </h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                {[
                  {
                    step: 1,
                    title: "Report Item",
                    description: "Quickly post details about lost or found items with location information",
                    icon: Package,
                  },
                  {
                    step: 2,
                    title: "Get Notified",
                    description: "Receive instant alerts when matches are found in the system",
                    icon: BellRing,
                  },
                  {
                    step: 3,
                    title: "Safe Return",
                    description: "Connect and arrange a secure return within campus",
                    icon: ArrowRightCircle,
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center bg-white px-6 py-8 rounded-lg shadow-lg border-t-4 border-indigo-600 max-w-full sm:max-w-sm"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full text-white font-bold mb-4">
                      {feature.step}
                    </div>
                    <feature.icon className="w-8 h-8 text-indigo-600 mb-4" />
                    <h4 className="text-lg sm:text-xl font-semibold mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
