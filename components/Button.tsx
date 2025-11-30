import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  isLoading,
  ...props
}) => {
  // Increased text size to text-base (16px) and py-4 for better touch targets
  const baseStyles = "w-full py-4 px-6 rounded-xl font-bold tracking-tight transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-base";

  const variants = {
    primary: "bg-blood-700 text-white shadow-lg shadow-blood-900/20 hover:bg-blood-600 border border-blood-600",
    secondary: "bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700",
    outline: "border-2 border-blood-800 text-blood-500 hover:bg-blood-900/10",
    ghost: "bg-transparent text-neutral-400 hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processando...
        </>
      ) : children}
    </button>
  );
};