import React, {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import classnames from "classnames";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    keyword: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => string; // 暂不支持返回ReactElement
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value = "",
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [highLightIndex, setHighLightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 500);

  useClickOutside(componentRef, () => {
    setShowDropDown(false);
  });
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const result = fetchSuggestions(debouncedValue);
      if (result instanceof Promise) {
        setLoading(true);
        result.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropDown(true);
          }
        });
      } else {
        setSuggestions(result);
        if (result.length > 0) {
          setShowDropDown(true);
        }
      }
    } else {
      setShowDropDown(false);
    }
    setHighLightIndex(-1);
  }, [debouncedValue]);
  const highlight = (index: number) => {
    index = Math.max(0, Math.min(index, suggestions.length - 1));
    setHighLightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highLightIndex]) {
          handleSelect(suggestions[highLightIndex]);
        }
        break;
      case 38: // up
        highlight(highLightIndex - 1);
        break;
      case 40: // down
        highlight(highLightIndex + 1);
        break;
      case 27: // esc
        setShowDropDown(false);
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    // setInputValue(item.value);
    setInputValue(renderOption ? renderOption(item) : item.value);
    setShowDropDown(false);
    triggerSearch.current = false;
    onSelect && onSelect(item);
  };
  const renderTemplates = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropDown || loading}
        timeout={300}
        animation="zoom-in-top"
        onExited={() => setSuggestions([])}
      >
        <ul className="suggestion-list">
          {loading && <Icon icon="spinner" />}
          {suggestions.map((item, i) => {
            const cnames = classnames("suggestion-item", {
              "is-highlight": i === highLightIndex,
            });
            return (
              <li key={i} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplates(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div
      className="fmr-autocomplete"
      onKeyDown={handleKeyDown}
      ref={componentRef}
    >
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
