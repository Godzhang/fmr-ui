import React, { FC } from "react";

export interface OptionProps {
  value: string;
  className?: string;
}

const Option: FC<OptionProps> = (props) => {
  return <li>{props.children}</li>;
};

export default Option;
