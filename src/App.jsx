import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Onboarding from "./components/Onboarding";

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("primerIngreso");
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("primerIngreso", "true");
    setShowOnboarding(false);
  };

  return (
    <Router>
      <Routes>
        {showOnboarding ?
          (<Route path="/" element={<Onboarding onFinish={handleOnboardingComplete} />} />) :
          (<Route path="/" element={<Navigate to="/abc" />} />)
        }
      </Routes>
    </Router>
  );
};

export default App;
