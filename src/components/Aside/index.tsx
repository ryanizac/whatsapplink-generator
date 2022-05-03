import "./index.css";

interface AsideProps {}

export default function Aside(props: AsideProps) {
  return (
    <aside className="aside">
      <h3 className="smallText">TUDO EM UM BLIP</h3>
      <h2>
        Você está gerando links rápidos a partir da maior plataforma de bots ;)
      </h2>
      <p>
        Com o Blip você automatiza conversas com clientes, cria experiências
        personalizadas através de Inteligência Artificial e aumenta os
        resultados do seu negócio.
      </p>
      <a className="link" href="https://www.take.net/contato/">
        Fale com a gente!
      </a>
    </aside>
  );
}
