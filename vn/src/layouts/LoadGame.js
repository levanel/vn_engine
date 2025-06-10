import React, { useState } from 'react'; // Import useState for conditional rendering

const CloseTab = () => {
  const [isConfirmed, setIsConfirmed] = useState(false); // Track confirmation state

  const handleCloseTab = () => {
    setIsConfirmed(true); // Set confirmed after confirmation dialog
  };

  const confirmClose = () => {
    window.close(); // Close the tab only if confirmed
  };

  return (
    <div>
      {isConfirmed ? (
        <button onClick={confirmClose}>Confirm Close</button>
      ) : (
        <button onClick={handleCloseTab}>Close Tab</button>
        
      )}
    </div>
  );
};

console.log ("close")
export default CloseTab;