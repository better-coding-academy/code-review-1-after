import classNames from "classnames";
import React from "react";

import "./ResultsList.css";

/**
 * <ResultsList
 *   items={[...]}
 *   onSelect={item => console.log(item.name)}
 *   className="MyResultsList"
 * />
 *
 * @prop {Array} items List of results of form { name: string, state: { abbreviation: string } }
 * @prop {Function} onSelect Callback to execute when item is selected, accepts object.
 * @prop {mixed} ... All other props will be forwarded to the container DOM node.
 */
export default function ResultsList({ className, items, onSelect, ...otherProps }) {
  if (items.length) {
    return (
      <ul {...otherProps} className={classNames("ResultsList", className)}>
        {items.map((item, index) => (
          <li
            className="ResultsList-item"
            key={index}
            onBlur={e => e.target.removeAttribute("aria-selected")}
            onClick={() => onSelect && onSelect(item)}
            onFocus={e => e.target.setAttribute("aria-selected", true)}
          >
            <button className="ResultsList-button">
              {item.name}, {item.state.abbreviation}
            </button>
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <ul {...otherProps} className={classNames("ResultsList", className)}>
        <p>No result found</p>
      </ul>
    );
  }
}
