import { HTMLAttributes } from "react";
import Drop from 'react-dropdown';
export function Dropdown
({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];

  return (
    <Drop
    options={options} value={defaultOption} placeholder="Select an option" 
    className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-center ${className}`}
    />
  );
}
