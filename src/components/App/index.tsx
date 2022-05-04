import { ProviderAlertContext } from "../../context/AlertContext";
import Aside from "../Aside";
import Content from "../Content";
import Footer from "../Footer";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <ProviderAlertContext>
        <Content />
        <Aside />
        <Footer />
      </ProviderAlertContext>
    </div>
  );
}
