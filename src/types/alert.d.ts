export type TAlert = "success" | "warn" | "error" | "any";

export interface IAlert {
  type: TAlert;
  message: string;
}
