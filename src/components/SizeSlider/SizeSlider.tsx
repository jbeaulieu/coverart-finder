import { Box, Grid, Input, Slider, Typography } from "@mui/material";
import { useState, type SyntheticEvent } from "react";

export type Props = {
  selectedSize: number;
  setSelectedSize: (size: number) => void;
};

export const MIN_IMAGE_SIZE_PX = 50;
export const MAX_IMAGE_SIZE_PX = 1000;

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value === '' ? MIN_IMAGE_SIZE_PX : Number(event.target.value));
  };

  const sanitizeAndCommit = () => {
    if (size < MIN_IMAGE_SIZE_PX) {
      console.log("SANITIZING TO " + MIN_IMAGE_SIZE_PX);
      setSize(MIN_IMAGE_SIZE_PX);
      setSelectedSize(MIN_IMAGE_SIZE_PX);
    } else if (size > MAX_IMAGE_SIZE_PX) {
      console.log("SANITIZING TO " + MAX_IMAGE_SIZE_PX);
      setSize(MAX_IMAGE_SIZE_PX);
      setSelectedSize(MAX_IMAGE_SIZE_PX);
    } else {
      console.log("SANITIZING TO " + size);
      setSelectedSize(size);
    }
  };

  return (
    <Box sx={{ width: 450 }}>
      <Typography id="input-slider" gutterBottom>
        Download Size (px)
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
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
        <Grid>
          <Input
            value={size}
            size="small"
            onChange={handleInputChange}
            onBlur={sanitizeAndCommit}
            inputProps={{
              step: 50,
              min: MIN_IMAGE_SIZE_PX,
              max: MAX_IMAGE_SIZE_PX,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SizeSlider;
