import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  let buttonClasses = "py-2 px-4 rounded-md border-none cursor-pointer transition duration-300 ease-in-out text-base font-medium ";

  switch (variant) {
    case 'primary':
      buttonClasses += "bg-primary text-white hover:bg-secondary";
      break;
    case 'secondary':
      buttonClasses += "bg-secondary text-white hover:bg-primary";
      break;
    case 'text':
      buttonClasses += "bg-transparent text-primary hover:text-secondary";
      break;
    default:
      buttonClasses += "bg-primary text-white hover:bg-secondary";
  }

  return (
    <button className={`${buttonClasses} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default Button;