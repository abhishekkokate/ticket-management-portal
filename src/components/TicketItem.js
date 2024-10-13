import React, { useState } from "react";
import "../styles/TicketItem.css";
import { ReactComponent as PencilIcon } from "../assets/pencil-solid.svg";
import { ReactComponent as DeleteIcon } from "../assets/trash-can-solid.svg";
import { ReactComponent as OpenIcon } from "../assets/eye-solid.svg";
import TicketMultiPurposeComponent from "./TicketMultiPurposeComponent";
import { toast } from "react-toastify";

const sliceDetailsString = (str) => {
  // If the string length is greater than allowed length, then this function will cut the string and add "..." at the end of the string to prevent overflowing or big cards in case of bigger string
  const lenToAllow = 70;
  if (str.length >= lenToAllow) {
    str = str.slice(0, lenToAllow) + "...";
  }
  return str;
};

function TicketItem({ ticket, index, updateTicketAtIndex }) {
  const [modalMode, setModalMode] = useState(false);
  const performAction = (e, action) => {
    if (e) {
      e.preventDefault();
    }
    if (action === "close") {
      action = false;
    }
    setModalMode(action);
  };
  const deleteTicket = (e, ticketId) => {
    if (e) {
      e.preventDefault();
    }
    const userResp = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (userResp) {
      toast.promise(
        fetch(`https://jsonplaceholder.typicode.com/todos/${ticketId}`, {
          method: "DELETE",
        })
          .then(() => {})
          .catch((err) => {
            toast.error(err.message || "Something went wrong");
          }),
        {
          pending: "Deleting ticket...",
          success: "Ticket deleted successfully",
          error: "Error deleting ticket",
        }
      );
    }
  };
  return (
    <div className="item-container">
      {modalMode && (
        <TicketMultiPurposeComponent
          ticket={ticket}
          mode={modalMode}
          updateModal={performAction}
        />
      )}
      <div className="item-card">
        <span className="item-id">
          <b>Id:</b> {ticket?.id}
        </span>
        <a
          href="/"
          className="action-btn btn-open icon"
          onClick={(e) => performAction(e, "view")}
          title="Open"
        >
          <OpenIcon />
        </a>
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
          onClick={(e) => deleteTicket(e, ticket?.id)}
          title="Delete"
        >
          <DeleteIcon />
        </a>
        <div className="item-details">
          <p>
            <b>Details:</b> {sliceDetailsString(ticket?.title || "")}
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
