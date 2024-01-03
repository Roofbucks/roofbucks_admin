export const appendParams = (params: any) => {
  let paramString = "";
  const keys = Object.keys(params);

  keys.map((key, index) =>
    params[key] === false || params[key]
      ? (paramString = paramString + `${key}=${params[key]}${index !== keys.length - 1 ? "&" : ""}`)
      : ""
  );

  return paramString;
};
