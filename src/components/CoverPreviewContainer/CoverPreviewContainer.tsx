import Download from "@mui/icons-material/Download";
import WarningIcon from '@mui/icons-material/Warning';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import './styles.css';
import { useEffect, useState } from "react";
import ImageUtils from "../../util/imageUtils";

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
        ImageUtils.getSizeForImage(dataUrl, setDownloadMaxSize);
      });
  }

  return (
    <div className="preview-container">
      <img src={previewSrc} alt="cover art preview" width={600} height={600} style={{objectFit: 'cover'}} />
      <div style={{ display: 'flex', gap: 20, placeItems: 'center' }}>
        <Button variant="contained" endIcon={<Download />} onClick={() => downloadImage(downloadSrc!)}>Download</Button>
        {selectedSize > downloadMaxSize &&
          <Tooltip 
            title={`The highest resolution available from iTunes for this cover is ${downloadMaxSize} px.
            Higher resolutions can be downloaded, but will be upscaled`}
          >
            <IconButton>
              <WarningIcon color="warning" />
            </IconButton>
          </Tooltip>}
      </div>
    </div>
  );
}

export default CoverPreviewContainer;
