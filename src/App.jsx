import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [catfact, setCatfact] = useState('');

  // Function to fetch a new cat fact
  const fetchData = async () => {
    const { data } = await axios.get('https://catfact.ninja/fact');
    setCatfact(data.fact);
  };

  // Use useEffect to fetch data initially and every 5 seconds
  useEffect(() => {
    fetchData(); // Fetch initial cat fact when the component mounts

    const intervalId = setInterval(() => {
      fetchData(); // Fetch a new fact every 5 seconds
    }, 5000); // 5000 ms = 5 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-gradient-to-r from-red-500 via-green-400 to-green-300">
      <div className="text-center p-5 md:p-8 bg-white shadow-xl rounded-lg max-w-lg w-full">
        <h1 className="text-3xl md:text-4xl font-italic text-purple-600 mb-4 sm:mb-6">
          Cat Fact Generator
        </h1>
        <p className="text-lg sm:text-xl text-gray-800 mb-4">{catfact || 'Loading fact...'}</p>
        <button
          onClick={fetchData}
          className="px-6 py-3 bg-blue-600 text-black font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 ease-in-out transform transition-all duration-300"
        >
          Get New Fact
        </button>
      </div>
    </div>
  );
}

export default App;

