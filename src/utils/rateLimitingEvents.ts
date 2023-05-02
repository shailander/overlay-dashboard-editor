export const debounce = (func: any, time: number) => {
  let timerId: any;
  return (args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => func(args), time);
  };
};

export const throttle = (func: any, time: number) => {
  let timerId: any;
  return (args: any) => {
    if (timerId) return;
    func(args);
    timerId = setTimeout(() => {
      timerId = undefined;
    }, time);
  };
};
