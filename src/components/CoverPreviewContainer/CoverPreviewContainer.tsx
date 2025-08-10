import Download from "@mui/icons-material/Download";
import { Button } from "@mui/material";
import './styles.css';
import { useEffect, useState } from "react";
import imgUtils from "../../util/ImgUtils";

export type Props = {
  selectedSize: number;
  previewSrc?: string;
  downloadSrc?: string;
};

const CoverPreviewContainer = (props: Props) => {

  const { selectedSize, previewSrc, downloadSrc } = props;
  const [downloadMaxSize, setDownloadMaxSize] = useState(50_000);

  const downloadImage = async (url: string) => {
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
  };

  useEffect(() => {
    if(downloadSrc) checkDownloadSize(downloadSrc);
  }, [downloadSrc]);

  const checkDownloadSize = async (url: string) => {
    await fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const dataUrl = window.URL.createObjectURL(blob);
        console.log(dataUrl)
        imgUtils.getSizeForImg(dataUrl, setDownloadMaxSize);
      });
  }

  return (
    <div className="preview-container">
      <img src={previewSrc} alt="cover art preview" width={600} height={600} style={{objectFit: 'cover'}} />
      <Button variant="contained" endIcon={<Download />} onClick={() => downloadImage(downloadSrc!)}>Download</Button>
    </div>
  );
}

export default CoverPreviewContainer;
