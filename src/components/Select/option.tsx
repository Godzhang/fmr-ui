import React, { FC, useContext } from "react";
import classnames from "classnames";
import { SelectContext } from "./select";

export interface OptionProps {
  value: string;
  className?: string;
  disabled?: boolean;
}

const Option: FC<OptionProps> = (props) => {
  const context = useContext(SelectContext);
  const { value, className, disabled } = props;
  const classes = classnames("fmr-option", className, {
    "is-disabled": disabled,
  });

  const handleClick = () => {
    console.log(value);
    if (disabled) return;
    context.handleOptionClick(value);
  };

  return (
    <li className={classes} onClick={handleClick}>
      {props.children}
    </li>
  );
};

Option.displayName = "Option";

export default Option;
