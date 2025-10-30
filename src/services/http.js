import axios from "axios";

export const baseURL = "https://tipsyapi-production.up.railway.app/tipsyAPI";
// export const baseURL = "http://localhost:3013/tipsyAPI";
export const appid = window.location.href.split("/")[3];

export const getImageMerged = async (data = new FormData()) => {
  let url = `${baseURL}/mergeImg`;
  if (!!appid) data.append("appid", appid);

  const resp = await axios.post(url, data);
  if (resp.status !== 200)
    throw new Error("Error al obtener datos del servidor");

  return resp.data;
};

export const getAssets = async () => {
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
    ? (url = `${baseURL}/img/frames/${appid}`)
    : (url = `${baseURL}/img/frames/standar`);
  return url;
};

export const getSurveys = async () => {
  let url = `${baseURL}/getSurveys`;

  const resp = await axios.get(url);
  if (resp.status !== 200) throw new Error("Error al obtener datos encuentas");

  return resp.data;
};
