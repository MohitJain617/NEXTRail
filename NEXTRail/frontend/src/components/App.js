import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./HomePage";

function App(){
    return (
        <HomePage />
    );
};

const appDiv = document.getElementById('app');
const root = createRoot(appDiv);
root.render(<App />);
