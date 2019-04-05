import classNames from "classnames";
import React from "react";

import "./Input.css";

/**
 * <Input
 *   className="MyInput"
 *   data-something="Value"
 *   value="Hello, World!"
 *   onChange={(value) => console.log('You typed', value)}
 * />
 *
 * @prop {Function} onChange Callback that will receive current input value.
 * @prop {string} placeholder The placeholder text.
 * @prop {string} value The default value for the input.
 * @prop {mixed} ... All other props will be forwarded to the native DOM input.
 */
export default function Input({ className, onChange, value, ...otherProps }) {
  return (
    <input
      {...otherProps}
      aria-label="Suburb name"
      className={classNames("Input", className)}
      onChange={event => onChange(event.target.value)}
      type="text"
      value={value}
    />
  );
}
