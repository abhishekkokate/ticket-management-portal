import "../styles/TicketsList.css";
import React, { useState, useEffect } from "react";
import LoaderComponent from "./LoaderComponent";
import TicketItem from "./TicketItem";

function TicketsList() {
  const [tickets, setTickets] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 10,
    skip: 0,
  });

  useEffect(() => {
    setLoading(true);
    const skip = pagination?.skip || 0;
    const limit = pagination?.limit || 10;
    fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data.todos || data?.todos?.length === 0) {
          return;
        }
        setTickets(data.todos);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [pagination]);

  return (
    <div className="tickets-list-container">
      <h5 className="tickets-list-header">Tickets List</h5>
      {loading ? (
        <LoaderComponent />
      ) : (
        tickets.map((ticket) => <TicketItem ticket={ticket} />)
      )}
    </div>
  );
}

export default TicketsList;
