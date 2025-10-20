import React from "react";
import Home from "./Component/Home";

const App = () => {
  return (
    <div className="bg-white/4">
      <Home />
    </div>
  );
};

export default App;


// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import HomeContent from "./HomeContent";
// import ContactContent from "./ContactContent"; // Assuming you have a ContactContent component

// const App = () => {
//   const [activeTab, setActiveTab] = useState("Home");

//   return (
//     <div>
//       <Navbar setActiveTab={setActiveTab} activeTab={activeTab} />
//       {activeTab === "Home" && <HomeContent setActiveTab={setActiveTab} />}
//       {activeTab === "Contact" && <ContactContent />}
//       {/* Add other tab content components as needed */}
//     </div>
//   );
// };

// export default App;