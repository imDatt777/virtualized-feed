import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FeedProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <FeedProvider>
            <App />
        </FeedProvider>
    </React.StrictMode>
);
