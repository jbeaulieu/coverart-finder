import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SizeSlider, { MAX_IMAGE_SIZE_PX, MIN_IMAGE_SIZE_PX } from './SizeSlider';
import type { Props } from './SizeSlider';

const setSelectedSize = vi.fn();
const validSizeValue = 500;
const invalidSizeValueTooSmall = 20;
const invalidSizeValueTooLarge = 5000;

const defaultProps: Props = {
  selectedSize: 100,
  setSelectedSize,
};

const renderSizeSlider = (props = defaultProps) => {
  return render(<SizeSlider {...props} />);
};

describe('Component SizeSlider', () => {

  describe('on click', () => {
    it('renders without crashing', () => {
      const { asFragment } = renderSizeSlider();

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('on slider update', () => {
    beforeEach(() => {
      setSelectedSize.mockClear();
    });

    it('invokes setSize function for valid values', () => {
      renderSizeSlider();

      const slider = screen.getByRole("slider", { name: "Download Size (px)" });
      fireEvent.change(slider, { target: { value: validSizeValue } });

      expect(setSelectedSize).toHaveBeenCalledExactlyOnceWith(validSizeValue);
    });

    it('invokes setSize function with MIN_IMAGE_SIZE_PX for values below the min size', () => {
      renderSizeSlider();

      const slider = screen.getByRole("slider", { name: "Download Size (px)" });
      fireEvent.change(slider, { target: { value: invalidSizeValueTooSmall } });

      expect(setSelectedSize).toHaveBeenCalledExactlyOnceWith(MIN_IMAGE_SIZE_PX);
    });

    it('invokes setSize function with MIN_IMAGE_SIZE_PX for values below the min size', () => {
      renderSizeSlider();

      const slider = screen.getByRole("slider", { name: "Download Size (px)" });
      fireEvent.change(slider, { target: { value: invalidSizeValueTooLarge } });

      expect(setSelectedSize).toHaveBeenCalledExactlyOnceWith(MAX_IMAGE_SIZE_PX);
    });
  });
});
