import "./App.css";
import PrimeReact from "primereact/api";
import Countries from "./components/countries";

PrimeReact.ripple = true;
PrimeReact.inputStyle = "filled";

function App() {
  return (
    <div className="flex flex-column w-screen h-screen bg-primary-reverse justify-content-center align-items-center">
      <span className="text-3xl w-full text-center p-3">Country Finder</span>
      <Countries />
    </div>
  );
}

export default App;
