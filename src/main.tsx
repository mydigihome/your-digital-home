import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { bootstrapTheme } from "./lib/localStorage";

// Apply theme BEFORE React renders to prevent flash of wrong color scheme
bootstrapTheme();

createRoot(document.getElementById("root")!).render(<App />);
