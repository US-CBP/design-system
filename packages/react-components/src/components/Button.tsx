import { ReactNode } from "react";

interface ButtonProps {
  attributes?: object,
  'aria-label'?: string,
  children: ReactNode,
  disabled?: boolean,
};

export const Button = ({ attributes, children, 'aria-label': ariaLabel, disabled, }: ButtonProps) => {
  return (
    <button
      className="cbp-btn cbp-btn__primary"
      aria-label={ariaLabel}
      disabled={disabled}
      {...attributes}
    >
      {children}
    </button>
  );
};
