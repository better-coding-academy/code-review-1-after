import classNames from "classnames";
import React from "react";

import "./Button.css";
import iconPath from "./icons.svg";

/**
 * <Button
 *   className="MyButton"
 *   onClick={() => console.log('Click')}
 * />
 *
 * @prop {Function} onClick
 * @prop {mixed} ... All other props will be forwarded to the native DOM button.

 */
export default function Button({ className, onClick, ...otherProps }) {
  return (
    <button
      {...otherProps}
      aria-label="Submit"
      className={classNames("Button", className)}
      onClick={onClick}
      type="button"
    >
      <svg viewBox="0 0 24 24" width="24" height="16">
        <use xlinkHref={iconPath + "#dls-icon-arrow-right"} />
      </svg>
    </button>
  );
}
