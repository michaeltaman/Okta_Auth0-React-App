import React from 'react';

export const ExitButtonContext = React.createContext({
    showExitButton: false,
    setShowExitButton: (value: boolean) => {},
  });