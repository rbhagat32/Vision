export const capitalize = (word) => {
  return word
    .split("_" && "-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

export const revertCapitalize = (word) => {
  return word
    .split(" ")
    .map((part) => part.charAt(0).toLowerCase() + part.slice(1))
    .join("_");
};
