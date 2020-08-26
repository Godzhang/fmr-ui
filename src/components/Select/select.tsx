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
import useClickOutside from "../../hooks/useClickOutside";
// import useDidMount from "../../hooks/useDidMount";
import { OptionProps } from "./option";

type SelectMode = "multiple" | "single";
export interface SelectProps {
  defaultValue?: string;
  value?: string;
  mode?: SelectMode;
  style?: CSSProperties;
  className?: string;
  onChange?: (value: string) => void;
  onVisibleChange?: (isVisible: boolean) => void;
}

type OptionClickCallback = (value: string) => void;
interface ISelectContext {
  handleOptionClick: OptionClickCallback;
  mode?: SelectMode;
}

export const SelectContext = createContext<ISelectContext>({
  handleOptionClick: () => {},
});

const Select: FC<SelectProps> = (props) => {
  const { style, className, mode, children, onChange, onVisibleChange } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [showSearchList, setShowSearchList] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const classes = classnames("fmr-select", className, {
    "is-focus": isFocus,
  });

  const fixControlledValue = (value: any) => {
    if (typeof value === undefined || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete props.defaultValue;
    props.value = fixControlledValue(props.value);
  }
  const [selectValue, setSelectValue] = useState(
    props.defaultValue || props.value
  );

  useClickOutside(componentRef, () => {
    if (showSearchList) {
      setIsFocus(false);
      setShowSearchList(false);
      onVisibleChange && onVisibleChange(false);
    }
  });

  const handleOptionClick = (value: string) => {
    setSelectValue(value);
    setShowSearchList(false);
    onChange && onChange(value);
  };

  const passedContext: ISelectContext = {
    handleOptionClick,
    mode,
  };

  const handleSelectMouseDown = () => {
    const isShowSearchList = !showSearchList;
    setIsFocus(isShowSearchList);
    setShowSearchList(isShowSearchList);
    onVisibleChange && onVisibleChange(isShowSearchList);
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
        <div className="fmr-select-search">{selectValue}</div>
        <Icon className="fmr-select-arrow" icon="angle-down" />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition in={showSearchList} timeout={300} animation="zoom-in-top">
          <ul className="fmr-select-list">{renderOptions()}</ul>
        </Transition>
      </SelectContext.Provider>
    </div>
  );
};

Select.defaultProps = {
  mode: "single",
};

export default Select;
