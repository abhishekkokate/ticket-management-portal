import { ReactComponent as Logo } from "./logo.svg";
import "./App.css";
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
    </div>
  );
}

export default App;
