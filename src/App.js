import "./App.css";
import UserList from "./components/UserLisst";
import Singupform from "./components/singupform.js";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes/routes.js";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
      <UserList />
      <Singupform />
    </div>
  );
}

export default App;
