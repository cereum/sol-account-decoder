import { HTMLAttributes } from "react";

export function Button({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-center ${className}`}
      {...props}
    />
  );
}
