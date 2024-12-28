import type { PropsWithChildren, FC, HTMLAttributes } from "react";


interface IYFloatableProps {
  y: number;
}

const YFloatable: FC<PropsWithChildren<IYFloatableProps> & Omit<HTMLAttributes<HTMLDivElement>, keyof PropsWithChildren<IYFloatableProps>>> = ({ y, children, style, ...props }) => {
  return (
    <div
      className="relative transition-transform duration-[40ms]"
      {...props}
      style={{ ...style, transform: `translateY(${y}px)` }}
    >
      {children}
    </div>
  );
};


export default YFloatable;
