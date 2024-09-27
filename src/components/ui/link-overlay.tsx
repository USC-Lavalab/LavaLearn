import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface OverlayLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export const LinkOverlay: React.FC<OverlayLinkProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <a
      className={`mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 ${className}`}
      {...props}
    >
      {children}
      <ArrowRight className="ml-1 h-4 w-4" />
    </a>
  );
};

interface LinkOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const LinkBox: React.FC<LinkOverlayProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`group relative ${className}`} {...props}>
      <div className="absolute inset-0 z-0 pointer-events-none bg-gray-100 opacity-0 group-hover:opacity-10 transition-opacity" />
      {children}
    </div>
  );
};
