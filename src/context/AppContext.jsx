/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [viewMode, setViewMode] = useState('public');
  const [activeTab, setActiveTab] = useState(viewMode === 'public' ? 'citizen' : 'fleet');
  const [selectedCity, setSelectedCity] = useState(null);
  const [arMode, setArMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log('[AppContext] ViewMode:', viewMode, '-> ActiveTab:', activeTab);

  // Derived state: activeTab is determined by viewMode
  // When viewMode changes, we reset activeTab to the appropriate default
  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
    setActiveTab(newViewMode === 'public' ? 'citizen' : 'fleet');
  };

  const value = {
    lang, setLang,
    viewMode, setViewMode: handleViewModeChange,
    activeTab, setActiveTab,
    selectedCity, setSelectedCity,
    arMode, setArMode,
    isAuthenticated, setIsAuthenticated
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
