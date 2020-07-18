import React from "react";
import classnames from "classnames";

export interface TabItemProps {
  label: string | React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { className, children } = props;
  const classes = classnames("tabs-tabpane", className);
  return <div className={classes}>{children}</div>;
};

TabItem.displayName = "TabItem";

export default TabItem;
