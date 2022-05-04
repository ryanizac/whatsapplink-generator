import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Alert from "../components/Alert";
import { IAlert, TAlert } from "../types/alert";

interface IAlertContext {
  active: boolean;
  show(type: TAlert, message: string, time?: number): void;
}

const initialValue: IAlertContext = {
  active: false,
  show() {},
};

const AlertContext = createContext<IAlertContext>(initialValue);

export function ProviderAlertContext(props: {
  children: ReactNode | ReactNode[];
}) {
  const [show, setShow] = useState<{ active: boolean; time: number }>({
    active: false,
    time: 0,
  });
  const [alert, setAlert] = useState<IAlert>({
    type: "success",
    message: "um alert",
  });

  function showAlert(type: TAlert, message: string, time: number = 3000) {
    setAlert({ type, message });
    setShow({ active: true, time });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow({ active: false, time: 0 });
    }, show.time);
    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <AlertContext.Provider value={{ active: show.active, show: showAlert }}>
      <Alert {...alert} active={show.active} />
      {props.children}
    </AlertContext.Provider>
  );
}

export const useAlertContext = () => useContext(AlertContext);
