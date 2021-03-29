import { useState } from "react";
import "./App.css";
var createGuest = require("cross-domain-storage/guest");
var createHost = require("cross-domain-storage/host");
var storageHost = createHost([
  {
    origin: "http://localhost:3000",
    allowedMethods: ["get", "set", "remove"],
  },
  {
    origin: "http://localhost:3001",
    allowedMethods: ["get"],
  },
]);

function App() {
  const [localValue, setLocalValue] = useState("");
  const [crossDomainValue, setCrossDomainValue] = useState('')
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to Cross Domain Storage Access Demo</p>
        <input
          placeholder="Enter your value"
          onChange={(e) => {
            setLocalValue(e.target.value);
          }}
          value={localValue}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            localStorage.setItem("localStorageKey", localValue);
            setLocalValue("");
          }}
        >
          Save to Storage
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            var bazStorage = createGuest(
              window.location.href === "http://localhost:3000/"
                ? "http://localhost:3001"
                : "http://localhost:3000"
            );
            bazStorage.get("localStorageKey", function (error, value) {
              // value for the key of 'fizz' will be retrieved from localStorage on www.baz.com
              if(error){
                console.log(error)
              }else{
                setCrossDomainValue(value)
              }
            });
          }}
        >
          Access from Cross Domain Storage
        </button>
        <p>
          Value stored in current Domain Storage:{" "}
          {localStorage.getItem("localStorageKey")}
        </p>
        <p>
          Value stored in cross Domain Storage:{" "}
          {crossDomainValue}
        </p>
      </header>
    </div>
  );
}

export default App;
