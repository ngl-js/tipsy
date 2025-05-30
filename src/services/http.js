import axios from "axios";

export const surveyURL = "https://mxpqsr50oid.typeform.com/to/lTr4sbqV";
export const baseURL = "https://tipsyapi-production.up.railway.app/tipsyAPI";
// export const baseURL = "http://localhost:3013/tipsyAPI";
const appid = window.location.href.split("/")[4];

export const getImageMerged = async (data = new FormData()) => {
  let url = `${baseURL}/mergeImg`;
  if (!!appid) data.append("appid", appid);

  const resp = await axios.post(url, data);
  if (resp.status !== 200)
    throw new Error("Error al obtener datos del servidor");

  return resp.data;
};

export const getAssets = async () => {
  console.log(appid);
  let url;
  !!appid
    ? (url = `${baseURL}/getAssets/${appid}`)
    : (url = `${baseURL}/getAssets`);

  const resp = await axios.get(url);
  if (resp.status !== 200)
    throw new Error("Error al obtener datos del servidor");

  return resp.data;
};

export const setAssetsUrl = () => {
  let url;
  !!appid
    ? (url = `${baseURL}/img/event/frames`)
    : (url = `${baseURL}/img/frames`);
  return url;
};
