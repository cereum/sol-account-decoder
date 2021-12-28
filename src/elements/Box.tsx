import { HTMLAttributes } from "react";

export const Box = {
  Center({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
      <div
        className={`min-h-full flex flex-col justify-center items-center ${className}`}
        {...props}
      />
    );
  },
};
