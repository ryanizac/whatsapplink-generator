import { Device } from "../types/Device";

export default function makeLink(
  number: number,
  message: string,
  device: Device
) {
  const deviceURL = Device.desktop === device ? "web" : "api";
  const params = `send?phone=${number}&text=${encodeURIComponent(message)}`;
  return `https://${deviceURL}.whatsapp.com/${params}`;
}
