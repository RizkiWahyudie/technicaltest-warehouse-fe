export const fetcher = async <T>(
  url: string,
  token: string = "",
  options: RequestInit = {}
): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "An error occurred");
  }

  return json;
};
