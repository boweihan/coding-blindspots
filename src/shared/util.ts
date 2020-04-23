export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const parseIfJson = (text: string): string => {
  return isJson(text) ? JSON.parse(text) : text;
};
