import NavBar from "./components/NavBar/NavBar";
import { Detail, Form, Home, Landing } from "./views";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <div>
              <NavBar />
              <Home />
            </div>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <div>
              <NavBar />
              <Detail />
            </div>
          }
        />
        <Route
          path="/create"
          element={
            <div>
              <NavBar />
              <Form />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
