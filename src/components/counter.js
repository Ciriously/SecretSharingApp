import React, { useState, useEffect } from "react";

const SecretsGuardedCounter = () => {
  const [secretsGuarded, setSecretsGuarded] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecretsGuarded((prevCount) => prevCount + 3);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-700 p-4 rounded-md text-center flex animate-fade-in">
        <h2 className="text-white text-3xl font-semibold mb-2">
          Secrets Safeguarded So Far
        </h2>
        <p className="text-sky-500 text-3xl font-bold"> :{secretsGuarded}</p>
      </div>
    </div>
  );
};

export default SecretsGuardedCounter;
