import './App.css';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/login"
import Register from "./Components/register"
import CreateEntry from "./Components/loggedin"
import EntriesDisplay  from './Components/entriesDisplay';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path ='/' element={<Login/>}/>
        <Route path ='/login' element={<Login/>}/>
        <Route path ='/register' element={<Register/>}/>
        <Route path ='/create-entry' element={<CreateEntry/>}/>
        <Route path ='/entries-display'element={<EntriesDisplay/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
