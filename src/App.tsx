import {useState} from 'react';

import './App.css'

function App() {
  const [ viewScreen, setViewScreen ] = useState<'welcome' | 'login' | 'signup' | 'planner'>('welcome');

  return (
     <div className="min-h-screen flex flex-col items-center justify-center font-sans py-6">

      {/* 1. Welcome Screen */}
      {viewScreen === 'welcome' && (
        <div className="bg-surface p-10 rounded-3xl border border-slate-800 shadow-2xl max-w-md w-full text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-text-main tracking-tight">Welcome to Trip Checkr</h1>
            <p className="text-lg text-text-dim ">Plan the drive. Know the cost.</p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setViewScreen('signup')}
              className="w-full bg-primary hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20"
            >
              Sign Up
            </button>
            <button 
              onClick={() => setViewScreen('login')}
              className="w-full bg-transparent border border-slate-700 hover:bg-slate-700/50 active:scale-[0.98] text-text-main font-semibold py-4 rounded-xl transition-all"
            >
              Log In
            </button>
            <button 
              onClick={() => setViewScreen('planner')}
              className="text-text-dim hover:text-accent transition-colors text-sm pt-2 cursor-pinter font-medium"

            >
              Just Curious? Skip for now.
            </button>
          </div>
        </div>
      )}

      {/* Future Screens Placeholder */}
      {viewScreen === 'login' && (
        <div className="text-text-main">Login Screen (To be implemented)</div>
      )}
      {viewScreen === 'signup' && (
        <div className="text-text-main">Signup Screen (To be implemented)</div>
      )}
      {viewScreen === 'planner' && (
        <div className="text-text-main">Trip Planner Screen (To be implemented)</div>
      )}
     </div>
  )
}

export default App
