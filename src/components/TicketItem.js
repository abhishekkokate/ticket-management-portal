import React from "react";
import "../styles/TicketItem.css";

const sliceDetailsString = (str) => {
  // If the string length is greater than allowed length, then this function will cut the string and add "..." at the end of the string to prevent overflowing or big cards in case of bigger string
  const lenToAllow = 70;
  if (str.length >= lenToAllow) {
    str = str.slice(0, lenToAllow) + "...";
  }
  return str;
};

function TicketItem({ ticket }) {
  return (
    <div className="item-container">
      <div className="item-card">
        <span className="item-id">
          <b>Id:</b> {ticket?.id}
        </span>
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
