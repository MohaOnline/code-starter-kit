export type GridProperty = {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
};

export type GridProperties = {
  [key: string]: GridProperty;
};

export type PlaygroundState = {
  display: string;
  gridTemplateColumns: string;
  gridTemplateRows: string;
  gridAutoFlow: string;
  gridGap: string;
  justifyItems: string;
  alignItems: string;
  justifyContent: string;
  alignContent: string;
};
