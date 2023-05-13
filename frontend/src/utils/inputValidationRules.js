export const notEmptyRule = (value) => value.trim() !== "";

export const emailRule = (value) => value.includes("@");

export const minLengthRule = (length) => {
  return (value) => value.trim().length >= length;
};
