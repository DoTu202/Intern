import { Routes, Route } from "react-router-dom";
import { BookingScreen } from "./screens/BookingScreen";
import SignIn  from "./screens/auth/SignIn";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/booking" element={<BookingScreen />} />
    </Routes>
  )
}

export default App;