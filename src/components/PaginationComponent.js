import React from "react";
import "../styles/PaginationComponent.css";

function PaginationComponent({
  totalCount = 0,
  skip = 0,
  limit = 10,
  updatePagination,
}) {
  const updateLimit = (e) => {
    const value = e?.target?.value || 10;
    updatePagination({ limit: value });
  };
  const updatePageNo = (e) => {
    if (e.key === "Enter") {
      const value = e?.target?.value || 1;
      updatePagination({ skip: (value - 1) * limit });
    }
  };
  return (
    <div className="pagination-container">
      <div className="pagination-container-inner">
        Showing
        <select
          className="limit-input is-big-input"
          name="limit"
          id="limit"
          value={limit}
          onChange={updateLimit}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        {limit} of {totalCount} |{" "}
        <input
          className="page-input"
          type="number"
          defaultValue={Math.floor(skip / limit) + 1}
          onKeyDown={updatePageNo}
        />
        of {Math.floor(totalCount / limit) + 1} Pages
      </div>
    </div>
  );
}

export default PaginationComponent;
