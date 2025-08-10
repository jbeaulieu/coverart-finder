const imgUtils = {
  /**
  * Gets the size of an image given a data url, e.g. a blob resource.
  * @param {string} dataUrl The data url of the image to be sized.
  * @param {number} callback A method to set the determined size in the requesting
  * component after the image is loaded and sized.
  **/
  getSizeForImg: (dataUrl: string, callback: (size: number) => void) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      console.log("WIDTH: " + img.width);
      console.log("HEIGHT " + img.height);
      callback(img.width);
    };
  },
};

export default imgUtils;
