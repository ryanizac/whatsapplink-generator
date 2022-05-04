import type { FormEvent } from "react";
import { useState } from "react";
import { useAlertContext } from "../../context/AlertContext";
import makeLink from "../../core/makeLink";
import useArray from "../../hooks/useArray";
import useObject from "../../hooks/useObject";
import { Device } from "../../types/Device";
import { copyTextToClipboard } from "../../util/string";
import "./index.css";

interface FormProps {}

interface IForm {
  number: number | null;
  message: string | null;
  device: Device;
}

type KForm = keyof IForm;

type IStatus = "notStarted" | "okay" | "error";

export default function Form(props: FormProps) {
  const alertContext = useAlertContext();

  const { state: hasFocused, addOnly: addOnlyFocused } = useArray<KForm>([]);
  const { state: form, update: updateForm } = useObject<IForm>({
    number: null,
    message: null,
    device: Device.desktop,
  });

  function validateInput(key: KForm): IStatus {
    const isFocused = hasFocused.includes(key);
    const isWrited = form[key] !== null;
    if (isWrited) return "okay";
    else if (isFocused) return "error";
    else return "notStarted";
  }

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("generate link");
    if (form.number !== null && form.message !== null) {
      const link = makeLink(form.number, form.message, form.device);
      console.log(link);
      copyTextToClipboard(link);
      alertContext.show("success", "link copiado para a área de transferência");
    } else {
      console.log("error");
      alertContext.show("error", "Há campos inválidos");
    }
  }

  function getClasslistInput(key: KForm): string {
    const state = validateInput(key);
    const relations: Record<IStatus, string> = {
      notStarted: "",
      okay: "isOkay",
      error: "hasError",
    };
    return relations[state];
  }

  function showNumber(value: number | null): string {
    if (value !== null) {
      const sValue = String(value);
      const matches = sValue.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      if (matches)
        return (
          (matches[1] ? `(${matches[1]})` : "") +
          (matches[2] ? " " + matches[2] : "") +
          (matches[3] ? "-" + matches[3] : "")
        );
    }
    return "";
  }

  function changeNumber(value: string) {
    console.log("changeNumber", value);
    if (value.length === 0) {
      updateForm({ number: null });
    } else {
      const onlyNumbers = value.match(/\d+/g);
      if (onlyNumbers) {
        const newNumber = Number(onlyNumbers.join(""));
        if (newNumber === form.number) {
          updateForm({ number: Number(newNumber.toString().slice(0, -1)) });
        } else updateForm({ number: newNumber });
      }
    }
  }

  function changeText(value: string) {
    console.log("changeText");
    if (value.length > 0) updateForm({ message: String(value) });
    else updateForm({ message: null });
  }

  function changeRadio(value: string) {
    console.log("changeRadio");
    if (value in Device) updateForm({ device: Device[value as Device] });
  }

  return (
    <form onSubmit={submitForm} className="form">
      <div>
        <input
          type="text"
          name="number"
          value={showNumber(form.number)}
          onFocus={() => addOnlyFocused("number")}
          onChange={(e) => changeNumber(e.target.value)}
          placeholder="(00) 90000-0000"
          className={getClasslistInput("number")}
        />
      </div>
      <div>
        <input
          type="text"
          name="message"
          value={form.message || ""}
          onFocus={() => addOnlyFocused("message")}
          onChange={(e) => changeText(e.target.value)}
          placeholder="escreva algo ;)"
          className={getClasslistInput("message")}
        />
      </div>
      <div>
        <input
          type="radio"
          name="device"
          id="device"
          value="mobile"
          onChange={(e) => changeRadio(e.target.value)}
          checked={form.device === "mobile"}
        />
        <label htmlFor="mobile" onClick={(e) => changeRadio("mobile")}>
          mobile
        </label>
      </div>
      <div>
        <input
          type="radio"
          name="device"
          id="device"
          value="desktop"
          onChange={(e) => changeRadio(e.target.value)}
          checked={form.device === "desktop"}
        />
        <label htmlFor="desktop" onClick={(e) => changeRadio("desktop")}>
          desktop
        </label>
      </div>
      <button type="submit">Gerar</button>
    </form>
  );
}
