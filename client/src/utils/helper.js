export const getUserInitials = (name) => {
  return name
    ?.split(" ")
    .filter((_, i) => i < 2)
    .map((item) => item[0].toUpperCase())
    .join("");
};

export const getLocalStorageData = (key) => {
  if (typeof localStorage !== "undefined") {
    const data = localStorage.getItem(key);
    return data;
  } else {
    // Handle the case where window is not available (e.g., during server-side rendering)
    return null;
  }
};
