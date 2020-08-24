import React, { FC } from "react";
import classnames from "classnames";

export interface OptionProps {
  value: string;
  className?: string;
}

const Option: FC<OptionProps> = (props) => {
  const { value, className } = props;
  const classes = classnames("fmr-option", className);
  return <li className={classes}>{props.children}</li>;
};

Option.displayName = "Option";

export default Option;
