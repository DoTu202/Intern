import { Routes, Route } from "react-router-dom";
import { BookingScreen } from "./screens/BookingScreen";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BookingScreen />} />
    </Routes>
  )
}

export default App;