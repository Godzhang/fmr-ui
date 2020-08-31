import React, {
  FC,
  Children,
  CSSProperties,
  useState,
  useRef,
  createContext,
  FunctionComponentElement,
} from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
import Tag from "../Tag/tag";
import Transition from "../Transition/transition";
import useClickOutside from "../../hooks/useClickOutside";
import { OptionProps } from "./option";

/**
 * 待完成功能：
 * 1. 支持多选
 */

type SelectMode = "multiple" | "single";
export interface SelectProps {
  defaultValue?: string | string[] | number | number[];
  value?: string | string[] | number | number[];
  mode?: SelectMode;
  style?: CSSProperties;
  className?: string;
  onChange?: (value: string | number) => void;
  onVisibleChange?: (isVisible: boolean) => void;
}

type OptionClickCallback = (value: string | number) => void;
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
    "fmr-select-multiple": mode === "multiple",
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

  const handleOptionClick = (value: string | number) => {
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

  const renderSelectValue = () => {
    if (mode === "single") return selectValue;
    const sv = Array.isArray(selectValue) ? selectValue : [selectValue];
    return sv.map((value) => {
      return (
        <Tag key={value} closable={true} type="primary">
          {value}
        </Tag>
      );
    });
  };

  // 待改进...
  const handleIsSelected = (value: string | number) => {
    if (mode === "single") {
      return selectValue === value;
    } else if (Array.isArray(selectValue) && selectValue.length > 0) {
      return (selectValue as typeof value[]).includes(value);
    } else {
      return false;
    }
  };

  const renderOptions = () => {
    return Children.map(children, (child) => {
      const childElement = child as FunctionComponentElement<OptionProps>;
      const { displayName } = childElement.type;
      if (displayName === "Option") {
        const isSelect = handleIsSelected(childElement.props.value);
        return React.cloneElement(childElement, {
          className: isSelect ? "is-selected" : "",
        });
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
        <div className="fmr-select-search">{renderSelectValue()}</div>
        {mode === "single" && (
          <Icon className="fmr-select-arrow" icon="angle-down" />
        )}
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
