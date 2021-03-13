import Config from '../../config';

/**
 * Uploads a file for a workpiece
 * @param workpieceId {string} the ID of the workpiecce
 * @param file {object} the File Object to upload
 * @param type {string} the category of file : "art","lyrics","scores","audio","midi"
 * @param visibility {string} either "public" or "private
 * @param onProgress a function to track progress for large files
 * @returns {Promise<*>}
 */
export async function uploadDocFile(
  workpieceId,
  file,
  type,
  visibility = 'private',
  onProgress,
) {
  if (type === 'art') visibility = 'public';
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // listen for `upload.load` event
    xhr.upload.onload = () => {
      console.log(`The upload is completed: ${xhr.status} ${xhr.response}`);
      console.log(xhr.response);
      console.log(xhr.responseText);
      xhr.responseType;
      resolve(xhr.response);
    };
    xhr.addEventListener('readystatechange', () => {
      if (this.readyState === 4) {
        console.log(xhr.responseText);
      }
    });

    // listen for `upload.error` event
    xhr.upload.onerror = (e) => {
      console.error('Upload failed.');
      reject(e);
    };

    // listen for `upload.abort` event
    xhr.upload.onabort = () => {
      console.error('Upload cancelled.');
      reject();
    };

    // listen for `progress` event
    xhr.upload.onprogress = (event) => {
      console.log(event.loaded / event.total);
      onProgress(event.loaded / event.total);
    };

    // open request
    xhr.open(
      'POST',
      `${Config.apiUrl}/workpieces/${workpieceId}/documentation/files/${type}/`,
    );
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    xhr.setRequestHeader(
      'Authorization',
      bearer,
    );
    // prepare a file object
    //const files = document.querySelector("[name=file]").files
    const formData = new FormData();
    formData.append('file', file.file, file.file.name);
    formData.append('visibility', visibility);

    // send request
    xhr.send(formData);
  });
}
export default uploadDocFile;
