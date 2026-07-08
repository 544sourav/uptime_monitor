import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { SignInPage } from "./pages/SignInPage";
import DashboardPage from "./pages/DashboardPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useSocketAuth } from "./hooks/useSocketAuth";
import { MonitorPage } from "./pages/MonitorPage";

function App() {
  useSocketAuth();
  return (
    <div className="bg-slate-950 min-h-screen ">
      <Header />
      <Routes>
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:id"
          element={
            <ProtectedRoute>
              <MonitorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
