export type FlexProperty = {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
};

export type FlexProperties = {
  [key: string]: FlexProperty;
};

export type PlaygroundState = {
  display: string;
  flexDirection: string;
  justifyContent: string;
  alignItems: string;
  flexWrap: string;
  gap: string;
};
