import React, { useState } from "react";
import "../styles/TicketMultiPurposeComponent.css";
import { ReactComponent as CloseIcon } from "../assets/xmark-solid.svg";
import { toast } from "react-toastify";

function TicketMultiPurposeComponent({
  ticket,
  mode = "view",
  updateModal = () => {
    console.error("No updateModal function provided");
  },
}) {
  const [ticketDetails, setTicketDetails] = useState(ticket);

  const handleValueChange = (field, value) => {
    if (field === "completed") {
      // Converting "true" String to true Boolean as html option gives us string
      try {
        value = JSON.parse(value);
      } catch (err) {
        console.error(err);
      }
    }
    setTicketDetails({ ...ticketDetails, [field]: value });
  };

  const handleSave = () => {
    let url = "";
    const payloadToSend = {};

    for (let key in ticketDetails) {
      if (ticketDetails[key] !== ticket[key]) {
        payloadToSend[key] = ticketDetails[key];
      }
    }

    if (Object.keys(payloadToSend).length === 0) {
      alert("No changes to save");
      return;
    }

    if (mode === "edit") {
      url = `https://jsonplaceholder.typicode.com/todos/${ticket?.id}`;
    } else {
      url = "https://jsonplaceholder.typicode.com/todos/add";
    }
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error?.message || "Something went wrong");
      });
  };
  return (
    <div
      className="ticket-view-edit-container"
      onClick={() => updateModal(null, "close")}
    >
      <div
        className="ticket-view-edit-container-inner"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="page-title">
          <h3>{mode === "edit" ? "Edit" : "View"} Ticket</h3>
          <CloseIcon
            className="icon btn-close"
            onClick={() => updateModal(null, "close")}
          />
        </div>
        <div
          className="ticket-inputs ticket-id"
          title={mode !== "edit" ? "Id cannot be edited" : "Id of the ticket"}
        >
          <p>Id:</p>
          <input type="text" defaultValue={ticket?.id} readOnly />
        </div>
        <div className="ticket-inputs ticket-detials">
          <p>Detials:</p>
          <textarea
            defaultValue={ticket?.title}
            onChange={(e) => handleValueChange("title", e.target.value)}
            readOnly={mode === "view"}
          />
        </div>
        <div className="ticket-inputs ticket-detials">
          <p>User Id:</p>
          <input
            type="text"
            defaultValue={ticket?.userId}
            onChange={(e) => handleValueChange("userId", e.target.value)}
            readOnly={mode === "view"}
          />
        </div>
        <div className="ticket-inputs ticket-status">
          <p>Status:</p>
          <select
            name="status"
            defaultValue={ticket?.completed}
            onChange={(e) => handleValueChange("completed", e.target.value)}
            readOnly={mode === "view"}
          >
            <option value={false}>Pending</option>
            <option value={true}>Done</option>
          </select>
        </div>
        {mode === "view" && (
          <div className="ticket-action">
            <button
              className="btn btn-save"
              onClick={(e) => updateModal(e, "edit")}
            >
              Edit
            </button>
          </div>
        )}
        {mode !== "view" && (
          <div className="ticket-action">
            <button className="btn btn-save" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketMultiPurposeComponent;
