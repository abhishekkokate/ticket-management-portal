import React from "react";
import "../styles/TicketItem.css";
import { ReactComponent as PencilIcon } from "../assets/pencil-solid.svg";
import { ReactComponent as DeleteIcon } from "../assets/trash-can-solid.svg";

const sliceDetailsString = (str) => {
  // If the string length is greater than allowed length, then this function will cut the string and add "..." at the end of the string to prevent overflowing or big cards in case of bigger string
  const lenToAllow = 70;
  if (str.length >= lenToAllow) {
    str = str.slice(0, lenToAllow) + "...";
  }
  return str;
};

function TicketItem({ ticket }) {
  const performAction = (e, action) => {
    e.preventDefault();
    if (action === "edit") {
      // To be made
    }
  };
  return (
    <div className="item-container">
      <div className="item-card">
        <span className="item-id">
          <b>Id:</b> {ticket?.id}
        </span>
        <a
          href="/"
          className="action-btn btn-edit icon"
          onClick={(e) => performAction(e, "edit")}
          title="Edit"
        >
          <PencilIcon />
        </a>
        <a
          href="/"
          className="action-btn btn-delete icon"
          onClick={(e) => performAction(e, "edit")}
          title="Delete"
        >
          <DeleteIcon />
        </a>
        <div className="item-details">
          <p>
            <b>Details:</b> {sliceDetailsString(ticket?.todo || "")}
          </p>
          <div className="item-assigned">
            <span>
              <b>Assigned to:</b> User-{ticket?.userId}
            </span>
          </div>
        </div>
        <div
          className={`item-status ${ticket?.completed ? "done" : "pending"}`}
        >
          <span>{ticket?.completed ? "Done" : "Pending"}</span>
        </div>
      </div>
    </div>
  );
}

export default TicketItem;
