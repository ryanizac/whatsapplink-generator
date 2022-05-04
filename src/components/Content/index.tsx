import Form from "../Form";
import "./index.css";

interface ContentProps {}

export default function Content(props: ContentProps) {
  return (
    <div className="content">
      <img src="/images/whatsapp.png" alt="whatsappimage" />
      <h1>Whatsapp Link - Generator</h1>
      <Form />
    </div>
  );
}
