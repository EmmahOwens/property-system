
import { useState, useEffect } from "react";

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
}

const CurrencyDisplay = ({ amount, className = "" }: CurrencyDisplayProps) => {
  const [formattedAmount, setFormattedAmount] = useState("");
  
  useEffect(() => {
    // Format as UGX with thousands separators
    const formatter = new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    setFormattedAmount(formatter.format(amount));
  }, [amount]);
  
  return <span className={className}>{formattedAmount}</span>;
};

export default CurrencyDisplay;
