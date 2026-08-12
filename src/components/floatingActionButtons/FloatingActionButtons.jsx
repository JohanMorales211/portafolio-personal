import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import './floatingActionButtons.css';

const FloatingActionButtons = ({ language }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const label = language === 'es' ? 'Volver arriba' : 'Back to top';

  if (!showBackToTop) return null;

  return (
    <a href="#inicio" className="fab-back-to-top" aria-label={label} title={label}>
      <IoIosArrowUp />
    </a>
  );
};

export default FloatingActionButtons;
