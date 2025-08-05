import { Box, Grid, Input, Slider, Typography } from "@mui/material";

export type Props = {
  size: number;
  setSize: (size: number) => void;
};

export const MIN_IMAGE_SIZE_PX = 50;
export const MAX_IMAGE_SIZE_PX = 1000;

const SizeSlider = (props: Props) => {
  const { size, setSize } = props;

  const handleSliderChange = (_event: Event, newValue: number) => {
    setSize(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value === '' ? MIN_IMAGE_SIZE_PX : Number(event.target.value));
  };

  const handleBlur = () => {
    if (size < MIN_IMAGE_SIZE_PX) {
      setSize(MIN_IMAGE_SIZE_PX);
    } else if (size > MAX_IMAGE_SIZE_PX) {
      setSize(MAX_IMAGE_SIZE_PX);
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
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid>
          <Input
            value={size}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
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
