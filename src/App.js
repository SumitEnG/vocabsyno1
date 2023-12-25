import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import MyList from "./services/MyList";
import Quiz from "./services/quiz";
import Openai from "./pages/Openai";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/sign-in" element={<Signin />} />
          <Route exact path="/sign-up" element={<Signup />} />
          <Route exact path="/sign-in/dashboard" element={<Dashboard />} />
          <Route exact path="/sign-in/dashboard/my-list" element={<MyList />} />
          <Route exact path="/sign-in/dashboard/quiz" element={<Quiz />} />
          <Route exact path="/sign-in/dashboard/ai" element={<Openai />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
