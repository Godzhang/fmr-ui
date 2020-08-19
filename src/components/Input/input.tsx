import React, { ChangeEvent } from "react";
import classnames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  className?: string;
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | React.ReactElement;
  append?: string | React.ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  const {
    className,
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props;
  const classes = classnames("fmr-input-wrapper", className, {
    "is-disabled": disabled,
    [`input-size-${size}`]: size,
    "input-group": prepend || append,
    "input-group-prepend": prepend,
    "input-group-append": append,
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === undefined || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="fmr-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        className="fmr-input-inner"
        type="text"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="fmr-input-group-append">{append}</div>}
    </div>
  );
};

Input.defaultProps = {
  size: "sm",
};

export default Input;
