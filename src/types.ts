export interface Balloon {
  id: number;
  left: string;
  color: string;
  size: string;
  delay: string;
}

export const AppState = {
  CLOSED: "CLOSED",
  OPENING: "OPENING",
  OPENED: "OPENED",
  PROPOSED: "PROPOSED",
} as const;

export type AppState = (typeof AppState)[keyof typeof AppState];
