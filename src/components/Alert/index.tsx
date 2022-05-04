import "./index.css";
import type { ReactElement } from "react";
import { IAlert, TAlert } from "../../types/alert";
import { capitalizeFirstLetter, mergeClass } from "../../util/string";

function getStyleByType(type: TAlert): string {
  return `alert${capitalizeFirstLetter(type)}`;
}

interface AlertProps extends IAlert {
  active: boolean;
  children?: ReactElement;
}

export default function Alert(props: AlertProps) {
  const type = getStyleByType(props.type);

  return (
    <div
      className={mergeClass("alert", type, {
        logic: props.active,
        classlist: "alertActive",
      })}
    >
      <p>{props.message}</p>
      {props.children}
    </div>
  );
}
