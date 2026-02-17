const isSameJson = (json1: object, json2: object) => {
  return JSON.stringify(json1).localeCompare(JSON.stringify(json2)) === 0;
};

export default isSameJson;
