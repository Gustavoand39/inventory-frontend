const debounce = (func: (...args: unknown[]) => void, wait: number = 300) => {
  let timeout: number;

  return (...args: unknown[]) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default debounce;
