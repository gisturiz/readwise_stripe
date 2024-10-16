// src/components/CurrencySelector.js
import React, { useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';

const CurrencySelector = () => {
  const { currency, setCurrency } = useContext(CurrencyContext);

  return (
    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      {/* Add more currencies as needed */}
    </select>
  );
};

export default CurrencySelector;
