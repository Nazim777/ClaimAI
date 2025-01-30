import React from 'react';

const UserGuide = () => {
  return (
    <div className="max-w-3xl mt-8 mx-auto p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-xl text-white">
      <h1 className="text-4xl font-extrabold text-center mb-6">Quick Start Guide</h1>
      
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Step 1: Enter a Valid Username</h2>
          <p className="text-lg">
            Please make sure the username includes the '@' symbol (e.g., <span className="font-semibold">@username</span>).
            This is essential for us to fetch the influencer's details.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Step 2: Wait for Search to Complete</h2>
          <p className="text-lg">
            After entering the username, the search may take a moment. Please note that <strong>Twitter/X has strict rate limiting</strong>.
            If you perform 2-3 searches in quick succession, you might encounter a delay where further searches are temporarily blocked.
            This pause is to comply with their rate-limiting rules. Simply wait for a few moments and try again.
          </p>
        </div>

        {/* Tip */}
        <div className="bg-yellow-100 text-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Pro Tip</h2>
          <p className="text-lg">
            While waiting, rest assured our system is processing the influencer's claims. Once the search limit resets, the results will be displayed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
