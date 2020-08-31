import React, { FC, useContext, MouseEvent } from "react";
import classnames from "classnames";
import { SelectContext } from "./select";

export interface OptionProps {
  value: string | number;
  className?: string;
  disabled?: boolean;
}

const Option: FC<OptionProps> = (props) => {
  const { handleOptionClick, mode } = useContext(SelectContext);
  const { value, className, disabled } = props;
  const classes = classnames("fmr-option", className, {
    "is-disabled": disabled,
  });

  const handleClick = () => {
    if (disabled) return;
    handleOptionClick(value);
  };

  return (
    <li
      className={classes}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={() => handleClick()}
    >
      {props.children}
    </li>
  );
};

Option.displayName = "Option";

export default Option;
