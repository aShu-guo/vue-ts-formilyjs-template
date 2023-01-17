export type BaseAny = { [key: string]: unknown };

export interface InnerEnum {
  [key: string]: {
    value: string | number;
    label: string;
  };
}
