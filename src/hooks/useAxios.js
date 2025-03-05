import { useEffect, useState } from "react"

export const useAxios= (fncReq, initVal)=> {
  const [isLoading, setIsLoading]= useState()
  const [getData, setGetData]= useState()
  const [error, setError]= useState(initVal)

  useEffect(()=> {
    async function gettingData() {
      setIsLoading(true)
      try {
        const data= await fncReq();
        setGetData(data);
      } catch (error) {
        setError({ message: error?.message || 'Error al obtener datos del servidor' })
      }
      setIsLoading(false)
    }
    gettingData()
  }, [fncReq])

  return {
    isLoading,
    getData,
    setGetData,
    error
  }

} // useAxios