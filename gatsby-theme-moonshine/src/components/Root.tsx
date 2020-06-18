import * as React from "react";

import "../styles/bootstrap.scss";

interface RootProps {
  className?: string;
}

const Root: React.FC<RootProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export default Root;
