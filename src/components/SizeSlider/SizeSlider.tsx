import { Box, Grid, Slider, Typography } from "@mui/material";
import { useState, type SyntheticEvent } from "react";

export interface Props {
  selectedSize: number;
  setSelectedSize: (size: number) => void;
};

export const MIN_IMAGE_SIZE_PX = 50;
export const MAX_IMAGE_SIZE_PX = 1500;

/* The SizeSlider keeps track of its own values in state so both pieces, the slider and
    the numeric input, can be kept in sync. The separate selectedSize props are only used
    to dispatch updates to the rest of the App when a size is committed, i.e. a selection
    has actually been made, not just passed by on the slider bar. */
const SizeSlider = (props: Props) => {

  const { selectedSize, setSelectedSize } = props;
  const [size, setSize] = useState(selectedSize);

  const handleSliderChange = (_event: Event, newValue: number) => {
    setSize(newValue);
  };

  const handleCommit = (_event: Event | SyntheticEvent, newValue: number) => {
    setSelectedSize(newValue);
  }

  return (
    <Box sx={{ width: 500 }}>
      <Typography id="input-slider" gutterBottom>
        Download Size (px)
      </Typography>
      <Grid container spacing={2} sx={{ placeItems: 'center' }}>
        <Grid size="grow">
          <Slider
            value={size}
            min={MIN_IMAGE_SIZE_PX}
            max={MAX_IMAGE_SIZE_PX}
            step={50}
            onChange={handleSliderChange}
            onChangeCommitted={handleCommit}
            aria-labelledby="input-slider"
          />
        </Grid>
          <Typography fontSize="1rem" style={{ marginBottom: 4 }}>{size}</Typography>
      </Grid>
    </Box>
  );
};

export default SizeSlider;
