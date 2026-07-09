const PREFIX = 'gameverse_';

export const getItem = (key) => {
  try {
    const item = localStorage.getItem(PREFIX + key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // localStorage lleno o deshabilitado
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    // ignorar
  }
};
