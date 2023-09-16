import { createRoot } from "react-dom/client";
import App from "./app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/content");

const root = document.createElement("div");
root.id = "mytabs-extention";

document.body.append(root);

createRoot(root).render(<App />);
