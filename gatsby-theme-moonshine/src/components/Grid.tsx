import * as React from "react";
import { Container as BSContainer, Row as BSRow } from "react-bootstrap";

interface ContainerProps {
  className?: string;
}

interface RowProps {
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children
}) => <BSContainer className={className}>{children}</BSContainer>;

function getColClassNames(colCount: number) {
  const colSpans: { [key: string]: string[] } = {
    1: ["col"],
    2: ["col-sm-12, col-lg-6"],
    3: ["col-sm-12, col-lg-4"],
    4: ["col-sm-12, col-md-6, col-lg-3"],
    6: ["col-sm-6, col-md-4, col-lg-2"],
    12: ["col-sm-6, col-md-3, col-lg-1"]
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const maxColCount of Object.keys(colSpans)) {
    if (colCount <= parseInt(maxColCount, 10)) {
      const colClasses = colSpans[maxColCount];
      return colClasses.join(" ");
    }
  }
  throw new Error("Row has too many columns");
}

export const Row: React.FC<RowProps> = ({ children, className }) => {
  const colCount = React.Children.count(children);
  const colClassNames = getColClassNames(colCount);
  const cols = React.Children.map(children, child => (
    <div className={colClassNames}>{child}</div>
  ));

  return <BSRow className={className}>{cols}</BSRow>;
};
