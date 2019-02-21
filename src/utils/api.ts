export async function callApi(
  method: string,
  url: string,
  path: string,
  data?: any
) {
  const res = await fetch(url + path, {
    method,
    headers: {
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    return await res.json();
  }

  throw new Error(res.statusText);
}
