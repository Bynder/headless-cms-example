const { GATHERCONTENT_API_USERNAME, GATHERCONTENT_API_KEY } = process.env;

export const get = async (url) => {
  let credentials = `${GATHERCONTENT_API_USERNAME}:${GATHERCONTENT_API_KEY}`;
  let base64credentials = Buffer.from(credentials).toString("base64");

  const response = await fetch(`https://api.gathercontent.com${url}`, {
    headers: {
      Accept: "application/vnd.gathercontent.v2+json",
      Authorization: `Basic ${base64credentials}`,
    },
  });

  const json = await response.json();

  return json.data;
};
