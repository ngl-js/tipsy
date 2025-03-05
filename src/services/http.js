import axios from "axios"

const baseURL= 'https://10.10.20.33:3013/tipsyAPI'

export const getImageMerged= async (data)=> {
  const url= `${baseURL}/mergeImg`

    const resp= await axios.post(url, data);
    if (resp.status!==200)
      throw new Error("Error al obtener datos del servidor");
    
    return resp.data;
}