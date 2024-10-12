// import logo from "./logo.svg";
import "./App.css";
import TicketsListComponent from "./components/TicketsListComponent";

function App() {
  return (
    <div className="App App-body">
      <header class="App-header">
        <h3>Ticket Management Portal</h3>
      </header>
      <TicketsListComponent></TicketsListComponent>
    </div>
  );
}

export default App;
