import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SDKProvider } from "@tma.js/sdk-react"; // импортируем SdkProvider
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SDKProvider acceptCustomStyles>
      <App />
    </SDKProvider>
  </StrictMode>
);
