import { API_GRAPHQL_URL as url } from "./constants"

const ACCESS_TOKEN = "tokenResponse"

const defaultHeaders = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

const headersWithAuthorization = () => {
  return {
    ...defaultHeaders(),
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  };
};

const sendRequest = (query, withAuthHeaders) => {
  const headers = withAuthHeaders ? headersWithAuthorization() : defaultHeaders();

  const options = {
    method: "POST",
    body: JSON.stringify(query),
    headers: headers,
  };

  return fetch(url, options)
    .then((response) => Promise.all([response, response.json()]))
    .then(([response, json]) => {
      if (json.errors) {
        let message

        if(Array.isArray(json.errors)){
          message = json.errors.map(error=>error?.message).join(", ")
        }
        else {
          message = json.errors?.message
        }

        throw new Error(message);
      }
      let empty = true

      for(const key of Object.keys(json.data)){
        if (json.data[key]) {
          empty = false
        }
      };

      return { success: response.ok, data: json.data, empty};
    })
    .catch((e) => {
      console.log(e)
      return { success: false, data: handleError(e) };
    });
};

const handleError = (error) => {
  return { message: error.message };
};

export { sendRequest };
