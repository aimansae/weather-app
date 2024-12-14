import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";

type ContainerTypes = { className?: string; children: ReactNode };

const Container = ({ className, children }: ContainerTypes) => {
  return (
    <div
      className={cn(
        "w-full bg-white border rounded-xl flex py-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
