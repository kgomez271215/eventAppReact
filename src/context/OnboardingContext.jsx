import React, { createContext, useReducer, useEffect } from "react";

const OnboardingContext = createContext();
const initialState = {
  completed: JSON.parse(localStorage.getItem("onboardingCompleted")) || false
};

const onboardingReducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE_ONBOARDING":
      const newState = { ...state, completed: true };
      localStorage.setItem("onboardingCompleted", JSON.stringify(true));
      return newState;
    default:
      return state;
  }
};

const OnboardingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  useEffect(() => {
    const onboardingStatus = JSON.parse(localStorage.getItem("onboardingCompleted"));
    if (onboardingStatus !== null) {
      dispatch({ type: "COMPLETE_ONBOARDING" });
    }
  }, []);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export { OnboardingContext, OnboardingProvider };
