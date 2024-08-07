import ReactDOM from "react-dom/client";

import App from "@/App.tsx";

import "./styles/index.css";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        const swUrl = `${import.meta.env.VITE_BASE_URL}/service-worker.js`;

        navigator.serviceWorker
            .register(swUrl)
            .then(() => {
                console.log("Service Worker registrado con éxito");
            })
            .catch((error) => {
                console.error("Error al registrar el Service Worker:", error);
            });
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
