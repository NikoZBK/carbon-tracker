import React from 'react';
import { Link } from 'react-router-dom';

interface GetStartedProps {
  description: string;
  steps: string[];
  buttonText: string;
  buttonLink: string;
}

const GetStartedSection: React.FC<GetStartedProps> = ({
  description,
  steps,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="get-started-section mt-10 mb-8 p-6 flex flex-col md:flex-row items-center justify-center">
      {/* Content centered in card */}
      <div className="text-center max-w-2xl">
        <p className="text-body mb-8">{description}</p>

        <ul className="mb-6 space-y-3 text-caption w-full pl-5">
          {steps.map((step, index) => (
            <li key={index} className="mt-5 flex items-start text-left">
              <div className="ml-6 mr-3 w-2 h-2 mt-1.5 rounded-full bg-primary-hover flex-shrink-0"></div>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button centered below content with reduced margin */}
      <div className="mt-2">
        <Link
          to={buttonLink}
          className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
        >
          {buttonText}
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default GetStartedSection;
