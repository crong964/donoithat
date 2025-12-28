const time = (curDate: Date) => {
  return `${curDate.getHours()}:${curDate.getMinutes()}:${curDate.getSeconds()}`;
};

export default time;
