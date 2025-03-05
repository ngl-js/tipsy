import axios from "axios"

const baseURL= 'http://localhost:3013/tipsyAPI'

export const getImageMerged= async (data)=> {
  const url= `${baseURL}/mergeImg`
  const resp= await axios.post(url, data);
  if (resp.status!==200)
    throw new Error("Error al generar imagen");
    
  return resp.data;
}