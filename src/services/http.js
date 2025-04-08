import axios from "axios";

export const surveyURL = "https://mxpqsr50oid.typeform.com/to/lTr4sbqV";
export const baseURL = "https://tipsyapi-production.up.railway.app/tipsyAPI";
// export const baseURL= 'http://localhost:3013/tipsyAPI'

export const getImageMerged = async (data) => {
  const url = `${baseURL}/mergeImg`;

  const resp = await axios.post(url, data);
  if (resp.status !== 200)
    throw new Error("Error al obtener datos del servidor");

  return resp.data;
};

export const getAssets = async () => {
  const url = `${baseURL}/getAssets`;

  const resp = await axios.get(url);
  if (resp.status !== 200)
    throw new Error("Error al obtener datos del servidor");

  return resp.data;
};
