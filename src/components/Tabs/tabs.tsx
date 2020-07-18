import React, { useState, useEffect, useRef, useMemo } from "react";
import classnames from "classnames";
import { TabItemProps } from "./tabItem";

export interface TabsProps {
  defaultActiveKey?: number;
  type?: string;
  className?: string;
  onChange?: (key: number) => void;
}

const Tabs: React.FC<TabsProps> = (props) => {
  const { defaultActiveKey, type, className, onChange, children } = props;
  const [selectedKey, setSelectedKey] = useState(defaultActiveKey);
  const [lineStyle, setLineStyle] = useState({});
  const navRef = useRef<HTMLUListElement>(null);
  const classes = classnames("fmr-tabs", className, {
    "tabs-card": type === "card",
  });

  const calcLineStyle = (index: number) => {
    if (navRef && navRef.current) {
      const selectedItem = navRef.current.childNodes[index] as HTMLLIElement;
      let lineWidth = selectedItem.offsetWidth;
      let lineLeft = selectedItem.offsetLeft;
      if (type === "card") {
        lineWidth -= 2;
        lineLeft += 1;
      }
      setLineStyle({
        width: lineWidth + "px",
        left: lineLeft + "px",
      });
    } else {
      setLineStyle({});
    }
  };

  const handleClick = (key: number, disabled: boolean) => {
    if (disabled) return;
    setSelectedKey(key);
    onChange && onChange(key);
  };

  const renderLabels = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        TabItemProps
      >;
      const { label, disabled } = childElement.props;
      const classes = classnames("tabs-nav-item", {
        "is-active": selectedKey === index,
        "is-disabled": disabled,
      });
      return (
        <li
          className={classes}
          key={index}
          onClick={() => handleClick(index, !!disabled)}
        >
          {label}
        </li>
      );
    });
  };

  const renderContents = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        TabItemProps
      >;
      const { className } = childElement.props;
      const { displayName } = childElement.type;
      const classes = classnames(className, {
        "is-active": selectedKey === index,
      });
      if (displayName === "TabItem") {
        return React.cloneElement(childElement, { className: classes });
      } else {
        console.error(
          "Warning: Tab has a child which is not a TabItem component"
        );
      }
    });
  };

  useEffect(() => {
    calcLineStyle(selectedKey as number);
  }, [selectedKey]);

  return (
    <div className={classes} role="tab">
      <ul className="tabs-nav-list" ref={navRef}>
        {renderLabels()}
        <li className="tabs-nav-active-line" style={lineStyle}></li>
      </ul>
      <div className="tabs-content">{renderContents()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultActiveKey: 0,
  type: "line",
};

export default Tabs;
