import React, { useState } from "react";
import "../styles/PaginationComponent.css";
import TicketMultiPurposeComponent from "./TicketMultiPurposeComponent";

function PaginationComponent({
  totalCount = 0,
  skip = 0,
  limit = 10,
  updatePagination,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
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
  const performAction = (e, action) => {
    if (e) {
      e.preventDefault();
    }
    if (action === "close") {
      action = false;
    }
    setShowAddModal(action);
  };
  return (
    <div className="pagination-container">
      <button className="btn btn-new" onClick={(e) => performAction(e, "add")}>
        New +
      </button>
      {showAddModal && (
        <TicketMultiPurposeComponent mode={"add"} updateModal={performAction} />
      )}
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
