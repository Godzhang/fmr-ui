import React, { FC, ChangeEvent, CSSProperties, useState, useRef } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useClickOutside from "../../hooks/useClickOutside";

export interface SelectProps {
  defaultValue?: string;
  value?: string;
  style?: CSSProperties;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = (props) => {
  const { defaultValue, value, style, className, onChange } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [showSearchList, setShowSearchList] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const classes = classnames("fmr-select", className, {
    "is-focus": isFocus,
  });

  useClickOutside(componentRef, () => {
    setIsFocus(false);
    setShowSearchList(false);
  });

  const handleSelectMouseDown = () => {
    setIsFocus(true);
    setShowSearchList(true);
  };
  const renderOptions = () => {
    return (
      <Transition in={showSearchList} timeout={300} animation="zoom-in-top">
        <div className="fmr-select-list"></div>
      </Transition>
    );
  };

  return (
    <div
      ref={componentRef}
      className={classes}
      style={style}
      onMouseDown={handleSelectMouseDown}
    >
      <div className="fmr-select-selector">
        <div className="fmr-select-search">
          {/* 曼联打平南安普顿曼联打平南安普顿 */}
        </div>
        <Icon className="fmr-select-arrow" icon="angle-down" />
      </div>
      {renderOptions()}
    </div>
  );
};

export default Select;
