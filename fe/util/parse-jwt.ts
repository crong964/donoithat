export function parseJwt(token: string | undefined) {
  if (!token) {
    return undefined;
  }
  let jwt = null;
  try {
    var base64Url = token.split(".")[1];
    jwt = JSON.parse(Buffer.from(base64Url, "base64").toString());
  } catch (error) {}

  return jwt;
}
