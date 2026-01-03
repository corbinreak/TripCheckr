import {useState} from 'react';

import './App.css'

function App() {
  const [ viewScreen, setViewScreen ] = useState<'welcome' | 'login' | 'signup' | 'planner'>('welcome');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mpg: 25 // default to 'Average'
  });
  const [tripData, setTripData] = useState({
    origin: '',
    destination: '',
    distance: 0,
  });

  const [isCustomMPG, setIsCustomMPG] = useState(false);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData);

    //Transition to planner screen after signup
    setViewScreen('planner');
  };

  // MPG - Distance Claculation Logic
  const gallonsNeeded = tripData.distance / formData.mpg;
  const estimatedCost = (gallonsNeeded * 3.50).toFixed(2); // assuming $3.50 per gallon


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
       <div className="bg-surface/50 backdrop-blur-xl p-8 rounded-3xl border border-whit/10 shadow-2xl max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-text-main text-center">Create an Account</h2>
        <p className="text-text-dim mt-2">Join Trip Checkr to start planning and save your trips.</p>

        <form className="space-y-4" onSubmit={handleSubmitForm}>
          {/* Email & Password Fields */}
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Email Adress" 
              className="w-full bg-background border border-slate-700 rounded-xl p-4 text-text-main focus:outline-none focus:border-primary transition-all" 
              onChange={(e) => {setFormData({...formData, email: e.target.value})}}
              required />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-background border border-slate-700 rounded-xl p-4 text-text-main focus:outline-none focus:border-primary transition-all" 
              onChange={(e) => {setFormData({...formData, password: e.target.value})}}
              required />
         </div>

         {/*MPG Selection */}
         <div className="space-y-2">
          <label className="text-text-dim text-sm font-semibold uppercase tracking-wider mb-3 block">Vehicle Efficiency(MPG)</label>

          {isCustomMPG ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input 
                  type="number"
                  min="5"
                  max="100"
                  onChange={(e) => setFormData({...formData, mpg: Math.min(100, Math.max(5, Number(e.target.value))) })}
                  className="flex-1 bg-background border border-slate-700 rounded-xl p-4 text-text-main focus:border-primary"
                />
                <button 
                  type="button"
                  onClick={() => setIsCustomMPG(false)}
                  className="bg-slate-800 text-text-main px-4 rounded-xl hover:bg-slate-700 transition-all"
                >
                  Reset
                </button>
              </div>
              <p className="text-[10px] text-text-dim px-1 italic">Enter a value between 5 and 100</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {[
                {label: 'Hybrid', val: 50},
                {label: 'Sedan', val: 25},
                {label: 'SUV', val: 20},
                {label: 'Truck', val: 15}
                
              ].map((v) => (
                <button 
                  key={v.label}
                  type="button"
                  onClick={() => setFormData({...formData, mpg: v.val})}
                  className={`p-3 rounded-xl border transition-all text-sm font-medium ${formData.mpg === v.val ? 'bg-primary border-primary text-white': 'bg-background border-slate-700 text-text-dim hover:border-slate-500'}`}
                >
                  {v.label}
                  {formData.mpg === v.val && ' ✓'}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsCustomMPG(true)}
                className="col-span-2 p-3 text-primary text-sm font-semibold hover:underline"
              >
                + Enter Custom MPG
              </button>
            </div> 
          )}
         </div>

         <button className="w-full bg-accent hover:opacity-90 text-background font-bold py-4 rounded-xl transition-all shadow-lg mt-6">
           Sign Up and Start Planning
         </button>

         <button 
           onClick={() => setViewScreen('welcome')}
           className="w-full bg-transparent border border-slate-700 hover:bg-slate-700/50 active:scale-[0.98] text-text-main font-semibold py-4 rounded-xl transition-all">
            Back to Login
         </button>
        </form>
       </div>
      )}
      {viewScreen === 'planner' && (
       <div className="flex flex-col h-screen bg-background">
        {/* Input Section */}
         <div className="p-6 space-y-4 bg-surface border-b border-slate-800">
          <h2 className="text-xl font-bold text-text-main">Plan Your Trip</h2>
         

         {/* Map Section */}
         <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-dim uppercase">Start</label>
            <input 
              onChange={(e) => setTripData({ ...tripData, origin: e.target.value})}
              type="text"
              placeholder="Enter Starting City"
              className="w-full bg-background border border-slate-700 rounded-lg p-3 text-text-main"            
            />
            <input 
              onChange={(e) => setTripData({ ...tripData, destination: e.target.value})}
              type="text"
              placeholder="Enter Destination City"
              className="w-full bg-background border border-slate-700 rounded-lg p-3 text-text-main"            
            />
            {/* Delete after testing - Slider for distance */}
            <div className="space-y-1">
              <div className="flex justify-between items-end">
                <label className="text-xs font-semibold text-text-dim uppercase tracking-wider">
                  Distance
                </label>
                <span className="text-lg font-bold text-primary">
                  {tripData.distance} <span className="text-xs font-normal text-text-dim">mi</span>
                </span>
            <input 
              type="range"
              min="1"
              max="3000"
              value={tripData.distance}
              onChange={(e) => setTripData({ ...tripData, distance: Number(e.target.value)})}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"

            />
            {/* End Delete */}
            </div>
           </div>
          </div>
         </div>
        </div>


        <div className="flex-1 flex items-center justify-center bg-slate-900 relative">
          <p className="text-text-dim italic">Map Visuality Coming Soon!</p>

          <div className="absolute bottom-6 right-6 bg-primary p-4 rounded-2xl shadow-xl">
            <p className="text-xs font-bold text-blue-200 uppercase">Estimated Trip Cost</p>
            <p className="text-2xl font-bold text-white mt-1">${estimatedCost}</p>
          </div>
        </div>
       </div>
      )}
     </div>
  )
}

export default App
