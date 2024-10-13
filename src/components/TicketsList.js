import "../styles/TicketsList.css";
import React, { useState, useEffect } from "react";
import LoaderComponent from "./LoaderComponent";
import TicketItem from "./TicketItem";
import PaginationComponent from "./PaginationComponent";
import { toast } from "react-toastify";

function TicketsList() {
  // States
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTIckets] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 10,
    skip: 0,
  });

  // Functions
  const updatePagination = ({ skip = 0, limit = 10 }) => {
    setPagination({ skip, limit });
  };

  useEffect(() => {
    setLoading(true);
    const skip = pagination?.skip || 0;
    const limit = pagination?.limit || 10;
    fetch(
      `https://jsonplaceholder.typicode.com/todos?limit=${limit}&skip=${skip}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data || data.length <= 0) {
          setTickets([]);
          setLoading(false);
          return;
        }
        // NOTE: This api doesnt support pagination hence we have to handle it manually with the below code
        const dataToStore = data.slice(skip, limit);

        setTotalTIckets(data.length);
        setTickets(dataToStore);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setLoading(false);
      });
  }, [pagination]);

  return (
    <div className="tickets-list-container">
      <h5 className="tickets-list-header">Tickets List</h5>
      <PaginationComponent
        totalCount={totalTickets || 0}
        skip={pagination?.skip || 0}
        limit={pagination?.limit || 10}
        updatePagination={updatePagination}
      />
      <div className="tickets-list-container-inner">
        {loading && <LoaderComponent />}
        {!loading && !tickets.length && <div> No Data Found! </div>}
        {!loading &&
          tickets.length > 0 &&
          tickets.map((ticket) => (
            <TicketItem
              ticket={ticket}
              key={ticket.id}
            />
          ))}
      </div>
    </div>
  );
}

export default TicketsList;
