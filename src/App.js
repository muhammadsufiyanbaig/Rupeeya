import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Expense from "./pages/Expense";
import Nopage from "./pages/Nopage";
import Income from "./pages/Income";
import Footer from "./pages/Footer";
import Statistics from "./pages/Statistics";
import { GlobalProvider } from "./Global";
export default function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
      <Footer/>
    </GlobalProvider>
  );
}
