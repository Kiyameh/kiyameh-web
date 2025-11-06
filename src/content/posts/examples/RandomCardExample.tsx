import { useState, useMemo } from "react";
import s from "./RandomCardExample.module.css";
import { Dices } from "lucide-react";
import Grapper from "@/components/package/Grapper";

const generateRandomStyles = () => {
  const radius = Math.floor(Math.random() * 50) + 10; // 10 a 60px
  const width = Math.floor(Math.random() * 5) + 1; // 1 a 5px
  const hue = Math.floor(Math.random() * 360); // Tono de color

  return {
    "--card-border-radius": `${radius}px`,
    "--card-border-width": `${width}px`,
    "--card-border-color": `hsl(${hue}, 70%, 50%)`,
  } as React.CSSProperties;
};

const RandomCardExample = () => {
  const [randomKey, setRandomKey] = useState(0);

  const styleVars = useMemo(generateRandomStyles, [randomKey]);

  return (
    <div className={s.container}>
      <button
        className={s.button}
        onClick={() => setRandomKey((prev) => prev + 1)}
      >
        <Dices className={s.dices} />
        Generar Estilos Aleatorios
      </button>

      <div className={s.randomCard} style={styleVars}>
        Soy un rectangulo tremendamente cambiante
      </div>
    </div>
  );
};

export default RandomCardExample;
