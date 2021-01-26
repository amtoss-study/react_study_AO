import { partial } from "ramda";

const baseUrl = "http://localhost:3001/";

const processResponse = (response: Response): Promise<any> => {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Server returned error ${response.statusText}`);
  }
};

const processUnknownError = () => Promise.reject("Unknown error");

export const get = (url: string) =>
  fetch(baseUrl + url)
    .then(processResponse)
    .catch(processUnknownError);

const postPutPatch = (
  method: "POST" | "PUT" | "PATCH",
  url: string,
  requestData: object
) =>
  fetch(baseUrl + url, {
    method,
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(processResponse)
    .catch(processUnknownError);

export const post = partial(postPutPatch, ["POST"]);

export const put = partial(postPutPatch, ["PUT"]);

export const patch = partial(postPutPatch, ["PATCH"]);

export const del = (url: string) =>
  fetch(baseUrl + url, {
    method: "DELETE",
  })
    .then(processResponse)
    .catch(processUnknownError);
    
const api = { get, post, put, patch, del };
export default api;