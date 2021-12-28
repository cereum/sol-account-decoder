import { HTMLAttributes } from "react";

export const Header = {
  Big({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
      <h1
        className={`text-3xl font-extrabold text-gray-800 text-center ${className}`}
        {...props}
      >
        {children}
      </h1>
    );
  },
};
