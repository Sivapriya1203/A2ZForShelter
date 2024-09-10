import React from 'react';

function FormInput({ label, type, options, maxLength, value }) {
  return (
    <div className="form-input">
      <label>{label}</label>
      {type === 'select' ? (
        <select>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea maxLength={maxLength}></textarea>
      ) : (
        <input type={type} maxLength={maxLength} defaultValue={value} />
      )}
    </div>
  );
}

export default FormInput;
