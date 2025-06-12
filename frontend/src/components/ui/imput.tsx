// Exemplo de componente de Input controlado
import React from "react";

type MyInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input: React.FC<MyInputProps> = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label htmlFor={props.id}>{label}</label>}
    <Input {...props} />
  </div>
);
