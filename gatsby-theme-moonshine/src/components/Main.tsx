import * as React from "react";

interface MainProps {
  style?: React.CSSProperties;
}

const Main: React.FC<MainProps> = ({ style, children }) => (
  <div style={style}>{children}</div>
);

export default Main;
