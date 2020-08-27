import React, { FC, Children, CSSProperties, useState } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";

type TagType = "default" | "primary" | "success" | "warning" | "danger";
export interface TagProps {
  type?: TagType;
  className?: string;
  style?: CSSProperties;
  closable?: boolean;
}

const Tag: FC<TagProps> = (props) => {
  const { type, className, style, closable, children, ...restProps } = props;
  const [isRender, setIsRender] = useState(true);
  const classes = classnames("fmr-tag", className, {
    [`fmr-tag-${type}`]: type,
  });

  return isRender ? (
    <span className={classes} style={style} {...restProps}>
      {children}
      {closable ? (
        <Icon
          className="fmr-tag-close-icon"
          icon="window-close"
          onClick={() => setIsRender(false)}
        />
      ) : null}
    </span>
  ) : null;
};

Tag.defaultProps = {
  type: "default",
};

export default Tag;
