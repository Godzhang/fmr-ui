import React, { useState } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";

export enum AlertType {
  Default = "default",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
}

interface BaseAlertProps {
  type?: string;
  message?: string;
  description?: string;
  closable?: boolean;
}
export type AlertProps = BaseAlertProps & React.HTMLAttributes<HTMLDivElement>;

const Alert: React.FC<AlertProps> = (props) => {
  const {
    className,
    type,
    message,
    description,
    closable,
    ...restProps
  } = props;
  const classes = classnames("alert", className, {
    [`alert-${type}`]: type,
    [`alert-with-description`]: description,
    closable,
  });
  const [display, setDisplay] = useState(true);

  return (
    <>
      {display ? (
        <div className={classes} {...restProps}>
          <div className="alert-message">{message}</div>
          {description ? (
            <div className="alert-description">{description}</div>
          ) : null}
          {closable ? (
            <Icon
              className="alert-close-icon"
              icon="window-close"
              onClick={() => setDisplay(false)}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
};

Alert.defaultProps = {
  type: AlertType.Default,
  message: "",
  description: "",
  closable: false,
};

export default Alert;
