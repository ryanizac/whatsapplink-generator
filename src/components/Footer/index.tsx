import "./index.css";

interface FooterProps {}

export default function Footer(props: FooterProps) {
  return (
    <footer className="footer">
      <div>warning: All styles were taken from Take Blip.</div>
      <a href="https://www.take.net/" className="simpleLink">
        take blip
      </a>
    </footer>
  );
}
