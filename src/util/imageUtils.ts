const ImageUtils = {
  /**
   * Gets the size of an image given a data url, e.g. a blob resource.
   * @param {string} dataUrl The data url of the image to be sized.
   */
  getSizeForImage: (dataUrl: string): Promise<number> => {
    const img = new Image();
    img.src = dataUrl;

    return new Promise((resolve, reject) => {
      img.addEventListener('load', () => {
        console.log("WIDTH: " + img.width);
        console.log("HEIGHT " + img.height);
        return resolve(img.width);
      });

      img.addEventListener('error', (event) => {
        console.error(event);
        return reject(new Error(event.message));
      });
    });
  },
  /**
   * Handles the logic for generating a download of an image.
   * @param {string} url The source url of the image to download.
   */
  downloadImage: async (url: string) => {
    await fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
        const a = document.createElement("a");
        a.style = "display: none";
        document.body.appendChild(a);
        // Create a DOMString representing the blob and point the link element towards it
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = 'cover.jpg';
        // Click the link to trigger the download
        a.click();
        // Release the reference to the file by revoking the Object URL
        window.URL.revokeObjectURL(url);
        // Remove the invisible link element from the DOM
        a.remove();
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default ImageUtils;
