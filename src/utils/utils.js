/**
 * 
 * @param {*} resp 
 * Convertir base64 a File[] y URL blob
 */
export const setMergedFile= async (resp)=> {
  console.log(resp);
  let blob, imageType, filename
  if (resp.type=='video') {
    imageType= 'video/mp4'
    filename= "mimomento.mp4"
    blob = await fetch(resp.streamUrl).then(r=> r.blob());
  } 
  else {
    imageType= 'image/jpeg'
    filename= "mimomento.jpg"
    // Decode Base64 string
    const decodedData = window.atob(b64);
    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);
    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // Return BLOB image after conversion
    blob= new Blob([uInt8Array], {type: imageType});
  }
  // Setting new fileArray and file to navigator.share
  let _file = new File([blob], filename, {type: imageType});
  let filesArray = [_file];
  return {
    files: filesArray, 
    blob: URL.createObjectURL(_file)
  }
}