import { Lightbulb } from "lucide-react";
import s from "./TipBox.module.css";

export const TipBox = ({
  tip,
  style,
}: {
  tip: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div className={s.container} style={style}>
      <p className={s.title}>
        <Lightbulb color="var(--emphasis)" />
        Tip:
      </p>
      <p className={s.tip}>{tip}</p>
    </div>
  );
};
