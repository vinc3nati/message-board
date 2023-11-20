export const fetchHelper = async (endPoint: string, options?: RequestInit) => {
  try {
    const resultJson = await fetch(endPoint, {
      ...options,
      headers: {
        Authorization: `${process.env.REACT_APP_TOKEN}`,
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    if (options?.method !== "DELETE") {
      const data = await resultJson.json();
      return data;
    }
    return undefined;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
