/**
 * 
 * @param {*} b64 
 * Convertir base64 a File[] y URL blob
 */
export const setMergedFile= async (b64)=> {
  const imageType= 'image/jpeg'
  // Decode Base64 string
  const decodedData = window.atob(b64);
  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);
  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i);
  }
  // Return BLOB image after conversion
  const blob= new Blob([uInt8Array], {type: imageType});
  // Setting new fileArray and file to navigator.share
  let _file = new File([blob], "mimomento.jpg", {type: imageType});
  let filesArray = [_file];
  return {
    files: filesArray, 
    blob: URL.createObjectURL(_file)
  }
}