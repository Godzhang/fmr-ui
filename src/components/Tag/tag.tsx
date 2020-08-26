import React, {
  FC,
  Children,
  CSSProperties,
  useState,
  useRef,
  createContext,
} from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export interface TagProps {
  type?: string;
  className?: string;
}

const Tag: FC<TagProps> = (props) => {
  const { type, className, children, ...restProps } = props;
  const classes = classnames("fmr-tag", className);
  return (
    <div className={classes} {...restProps}>
      {children}
    </div>
  );
};

Tag.defaultProps = {
  type: "default",
};

export default Tag;
