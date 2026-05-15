import { RouterProvider } from "react-router-dom";
import { AppStateProvider } from "./context/AppStateProvider";
import { router } from "./routes/router";
import "./styles/globalStyles.css";

function App() {
  return (
    <AppStateProvider>
      <RouterProvider router={router} />
    </AppStateProvider>
  );
}

export default App;
