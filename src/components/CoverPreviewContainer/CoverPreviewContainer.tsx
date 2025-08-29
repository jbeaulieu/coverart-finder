import { useEffect, useState } from "react";
import Download from "@mui/icons-material/Download";
import WarningIcon from '@mui/icons-material/Warning';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ImageUtils from "../../util/imageUtils";
import './styles.css';

export interface Props {
  selectedSize: number;
  previewSrc?: string;
  downloadSrc?: string;
};

const CoverPreviewContainer = (props: Props) => {

  const { selectedSize, previewSrc, downloadSrc } = props;
  const [downloadMaxSize, setDownloadMaxSize] = useState(50_000);

  const startDownload = () => void ImageUtils.downloadImage(downloadSrc!);

  useEffect(() => {
    async function checkDownloadSize(url: string) {
      await fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const dataUrl = window.URL.createObjectURL(blob);
          return ImageUtils.getSizeForImage(dataUrl);
        })
        .then(size => setDownloadMaxSize(size))
        .catch((error: Error) => console.error(`Error while sizing image: ${error.message}`));
    }

    if(downloadSrc) void checkDownloadSize(downloadSrc);
  }, [downloadSrc]);

  return (
    <div className="preview-container">
      <img src={previewSrc} alt="cover art preview" width={600} height={600} style={{objectFit: 'cover'}} />
      <div style={{ display: 'flex', gap: 20, placeItems: 'center' }}>
        <Button variant="contained" endIcon={<Download />} onClick={startDownload}>Download</Button>
        {selectedSize > downloadMaxSize &&
          <Tooltip 
            title={`The highest resolution available from iTunes for this cover is ${downloadMaxSize} px.`}
          >
            <IconButton>
              <WarningIcon color="warning" />
            </IconButton>
          </Tooltip>
        }
      </div>
    </div>
  );
}

export default CoverPreviewContainer;
