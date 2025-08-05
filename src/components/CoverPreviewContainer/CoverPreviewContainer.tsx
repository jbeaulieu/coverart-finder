export type Props = {
  imgSrc?: string;
};


const CoverPreviewContainer = (props: Props) => {
  const { imgSrc } = props;

  const download = async (imgSrc: string) => {
        try {
            await fetch(imgSrc, {
              method: 'GET',
              headers: {
                'Content-Type': 'image/png',
              },
            })
            .then((response) => response.blob())
            .then((blob) => {
              // Create blob link to download
              const url = window.URL.createObjectURL(blob);

              const link = document.createElement('a');
              link.href = url;
              link.setAttribute(
                'download',
                `FileName.pdf`,
              );

              // Append to html link element page
              document.body.appendChild(link);

              // Start download
              link.click();

              // Clean up and remove the link
              link.parentNode?.removeChild(link);
            });
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };
  return (
    <div className="preview">
      {/* <img src={imgSrc} width={300} height={300} style={{objectFit: 'cover'}} /> */}
      <a
        href={imgSrc}
        download
        onClick={() => download(imgSrc!)}
      >
        Download
      </a>
      <br />
      <a href={imgSrc} target="_blank" download>A second download</a>
      <br />
      <a href={imgSrc} download="myimage"><img src={imgSrc} />A third download</a>
    </div>
  );
}

export default CoverPreviewContainer;
