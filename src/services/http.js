import axios from "axios"

const baseURL= 'http://localhost:3013/tipsyAPI'

export const getImageMerged= async (data)=> {
  const url= `${baseURL}/mergeImg`
  try {
    const resp= await axios.post(url, data);
    if (resp.status!==200)
      throw new Error("Error al generar imagen");
    
    return {
      data: resp.data,
      error: false
    }
  } catch (error) {
    return {
      data: 'No data catch',
      error: true,
      message: error?.message || 'Error al obtener datos del servidor'
    }
  }
}