import React, { useState, useEffect, useCallback } from 'react';
import { generatePhysicsFact } from './services/geminiService';

// --- UI Helper Components ---

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-7.19c-2.818.554-5.438-.96-6.357-3.643a.75.75 0 0 1 .43-1.003l3.08-1.54A.75.75 0 0 1 9.315 7.584Zm12 6.136a.75.75 0 0 1-1.06 0l-2.122-2.121a.75.75 0 0 1 1.061-1.061l2.121 2.121a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
  </svg>
);

const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
);

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
  </div>
);

interface FactDisplayProps {
  fact: string | null;
  isLoading: boolean;
  error: string | null;
}

const FactDisplay: React.FC<FactDisplayProps> = ({ fact, isLoading, error }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
    <div className="relative min-h-[250px] bg-black rounded-lg p-6 flex items-center justify-center text-center leading-loose">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="flex flex-col items-center gap-4 text-red-400 animate-fade-in">
            <ExclamationTriangleIcon className="w-12 h-12" />
            <p className="font-medium text-lg">{error}</p>
          </div>
        ) : (
          <p className="text-xl md:text-2xl font-light text-gray-200 animate-fade-in">
            {fact}
          </p>
        )}
    </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [fact, setFact] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateFact = useCallback(async () => {
    // For subsequent requests, only set button to loading, keep card content.
    if (!isLoading) {
      setIsLoading(true);
    }
    setError(null);
    
    try {
      const newFact = await generatePhysicsFact();
      setFact(newFact);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      setFact(null);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    // The initial fact generation.
    handleGenerateFact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determine if the card itself should show a loading spinner
  // This is true only on the very first load.
  const isCardLoading = isLoading && !fact && !error;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
        <div className="absolute inset-0 z-0 stars-bg"></div>
        <main className="relative z-10 w-full max-w-2xl mx-auto space-y-10">
            <header className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 pb-2">
                Cosmic Queries
              </h1>
              <p className="text-gray-400 text-lg md:text-xl mt-2">Your Daily Dose of Physics Astonishment</p>
            </header>

            <FactDisplay fact={fact} isLoading={isCardLoading} error={error} />

            <div className="flex justify-center">
              <button
                onClick={handleGenerateFact}
                disabled={isLoading}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
              >
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                 <div className="relative flex items-center">
                    <SparklesIcon className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="relative z-10">{isLoading ? 'Summoning a Fact...' : 'Reveal New Fact'}</span>
                </div>
              </button>
            </div>
        </main>
        <footer className="relative z-10 bottom-4 text-center text-gray-500 text-sm mt-10">
            <p>Powered by Gemini. Discover a new wonder of the cosmos with each click.</p>
        </footer>
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }

          @keyframes tilt {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(1.5deg); }
          }
          .animate-tilt {
            animation: tilt 10s infinite linear;
          }

          .stars-bg {
            background-color: #000;
            background-image: 
              radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
              radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
              radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
              radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
            background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px; 
            background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
            animation: move-stars 300s linear infinite;
          }
          
          @keyframes move-stars {
              from { background-position: 0 0, 40px 60px, 130px 270px, 70px 100px; }
              to   { background-position: -10000px 5000px, -10000px 5000px, -10000px 5000px, -10000px 5000px; }
          }
        `}</style>
    </div>
  );
};

export default App;
