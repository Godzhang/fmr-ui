import React, {
  FC,
  Children,
  ChangeEvent,
  CSSProperties,
  useState,
  useRef,
} from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useClickOutside from "../../hooks/useClickOutside";
import { OptionProps } from "./option";

export interface SelectProps {
  defaultValue?: string;
  value?: string;
  style?: CSSProperties;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = (props) => {
  const { defaultValue, value, style, className, children, onChange } = props;
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
    return Children.map(children, (child) => {
      const childElement = child as React.FunctionComponentElement<OptionProps>;
      const { displayName } = childElement.type;
      if (displayName === "Option") {
        return React.cloneElement(childElement);
      } else {
        console.error(
          "Warning: Select has a child which is not a Option component"
        );
      }
    });
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
      <Transition in={showSearchList} timeout={300} animation="zoom-in-top">
        <ul className="fmr-select-list">{renderOptions()}</ul>
      </Transition>
    </div>
  );
};

export default Select;
