import React from "react";

function Field({ label, id, name, value, type = "text", onChange, onBlur, error, touched, options, inputRef }) {
  const isInvalid = !!(touched && error);
  const errorId = `${id}-error`;

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? errorId : undefined}
          className="form-select"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? errorId : undefined}
          className="form-input"
        />
      )}

      {isInvalid && (
        <span id={errorId} role="alert" className="error-message-box">
          {error}
        </span>
      )}
    </div>
  );
}

export default Field;
