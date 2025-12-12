const Await = async () => {
  return new Promise((res) => {
    setTimeout(() => {
      res("");
    }, 3000);
  });
};

export default Await;
