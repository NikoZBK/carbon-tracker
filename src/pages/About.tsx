import { Card } from '../components/ui';
import { version } from '../../package.json';

export default function About() {
  return (
    <>
      <h1 className="text-title pb-3">About</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="col-span-3 md:col-span-2">
          <h2 className="text-subtitle mb-4">Carbon Tracker Project</h2>
          <p className="text-body mb-4">
            This carbon footprint tracker helps you monitor and reduce your
            environmental impact by tracking daily activities and their
            associated carbon emissions.
          </p>
          <p className="text-body">
            UMASS Amherst Scalable Web Systems Homework #1 by Nikolay Ostroukhov
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Data Sources</h3>
          <div className="bg-light2 p-4 rounded-lg">
            <p className="mb-2">
              <b>Our World in Data</b> for carbon emissions datasets:
            </p>
            <a
              href="https://ourworldindata.org/co2-and-greenhouse-gas-emissions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
              ourworldindata.org/co2-and-greenhouse-gas-emissions
            </a>
          </div>
        </Card>

        <Card className="md:col-span-1">
          <h2 className="text-subtitle mb-4">Created By</h2>
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-inverse text-2xl font-bold mb-3">
              NO
            </div>
            <h3 className="text-lg font-semibold">Nikolay Ostroukhov</h3>
            <p className="text-dark1 mb-4">Student at UMASS Amherst</p>

            <div className="flex flex-col space-y-2 w-full">
              <a
                href="mailto:ostroukhovnikolay@gmail.com"
                className="text-primary hover:underline flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                ostroukhovnikolay@gmail.com
              </a>
              <a
                href="mailto:nostroukhov@umass.edu"
                className="text-primary hover:underline flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                nostroukhov@umass.edu
              </a>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-subtitle mb-4">Acknowledgements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-light2 p-4 rounded-lg flex flex-col items-center text-center">
            <svg
              className="w-12 h-12 text-primary mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
            <p className="font-medium">
              Professor <span className="font-bold">Tim Richards</span>{' '}
              <span className="easter-egg">🐐</span>
            </p>
            <p className="text-caption">UMASS Amherst</p>
          </div>

          <div className="bg-light2 p-4 rounded-lg flex flex-col items-center text-center">
            <svg
              className="w-12 h-12 text-primary mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="font-medium">
              <span className="font-bold">React & TypeScript</span>
            </p>
            <p className="text-caption">Web Development Framework</p>
          </div>

          <div className="bg-light2 p-4 rounded-lg flex flex-col items-center text-center">
            <svg
              className="w-12 h-12 text-primary mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              ></path>
            </svg>
            <p className="font-medium">
              <span className="font-bold">Our World in Data</span>
            </p>
            <p className="text-caption">Data & Research</p>
          </div>
        </div>
      </Card>

      <div className="flex justify-end mt-6">
        <div className="bg-light2 px-4 py-2 rounded-lg flex items-center text-sm">
          <svg
            className="w-4 h-4 text-primary mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            ></path>
          </svg>
          <span className="font-medium mr-1">Version:</span>
          <span className="text-primary font-bold">{version}</span>
        </div>
      </div>
    </>
  );
}
