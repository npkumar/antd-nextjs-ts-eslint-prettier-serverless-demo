export const getQueryValue = (value): string | undefined =>
  Array.isArray(value) ? value[0] : value;
