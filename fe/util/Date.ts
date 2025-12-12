export default function dateFormat(s: string) {
  var d = new Date(parseInt(s));

  return `${d.getDate()}-${
    d.getMonth() + 1
  }-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
}
