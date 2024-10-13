import { ReactComponent as Logo } from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import TicketsList from "./components/TicketsList";

function App() {
  return (
    <div className="App App-body">
      <header className="App-header">
        <h3>
          <Logo className="App-logo" /> Ticket Management Portal
        </h3>
      </header>
      <TicketsList />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
