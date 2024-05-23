interface IDebounceProps {
  func: (query: string) => void;
  wait?: number;
}

const debounce = ({
  func,
  wait = 300,
}: IDebounceProps): ((query: string) => void) => {
  let timeout: number;

  return (query: string) => {
    const later = () => {
      clearTimeout(timeout);
      func(query);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default debounce;
