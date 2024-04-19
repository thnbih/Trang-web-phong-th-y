import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DashBoard from './components/DashBoard';
import BoiBaiTarot from './components/BoiBaiTarot/BoiBaiTarot';
import BoiBai52La from './components/BoiBai52La';
import BoiNgaySinh from './components/BoiNgaySinh';
import './App.css';

function App() {
  const [currentComponent, setCurrentComponent] = useState('Dashboard');

  const handleNavLinkClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'Dashboard':
        return <DashBoard />;
      case 'BoiBaiTarot':
        return <BoiBaiTarot />;
      case 'Tarot':
        return <BoiBai52La />;
      case 'BoiNgaySinh':
        return <BoiNgaySinh />;
      // Add cases for other components as needed
      default:
        return <DashBoard />;
    }
  };

  return (
    <>
      <header>
        <Header onNavLinkClick={handleNavLinkClick} />
      </header>
      <div>{renderComponent()}</div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
