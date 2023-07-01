import React from "react";

const ReusableCategoryForm = ({
  handleFormSubmit,
  value,
  setValue,
  placeholder,
  type,
}) => {
  return (
    <form className="mb-5" onSubmit={handleFormSubmit}>
      <div className="mb-3 w-75">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {type === "update" ? "update" : "Add"}
      </button>
    </form>
  );
};

export default ReusableCategoryForm;
