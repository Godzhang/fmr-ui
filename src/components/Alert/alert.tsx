import React, { useState } from "react";
import classnames from "classnames";

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
type AlertProps = BaseAlertProps & React.HTMLAttributes<HTMLDivElement>;

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
            <i className="alert-close-icon" onClick={() => setDisplay(false)}>
              *
            </i>
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
