import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SizeSlider, { MAX_IMAGE_SIZE_PX, MIN_IMAGE_SIZE_PX } from './SizeSlider';
import type { Props } from './SizeSlider';

const setSize = vi.fn();
const validSizeValue = 500;
const invalidSizeValueTooSmall = 20;
const invalidSizeValueTooLarge = 5000;

const defaultProps: Props = {
  size: 100,
  setSize,
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
      setSize.mockClear();
    });

    it('invokes setSize function for valid values', () => {
      renderSizeSlider();

      const slider = screen.getByRole("slider", { name: "Download Size (px)" });
      fireEvent.change(slider, { target: { value: validSizeValue } });

      expect(setSize).toHaveBeenCalledExactlyOnceWith(validSizeValue);
    });

    it('invokes setSize function with MIN_IMAGE_SIZE_PX for values below the min size', () => {
      renderSizeSlider();

      const slider = screen.getByRole("slider", { name: "Download Size (px)" });
      fireEvent.change(slider, { target: { value: invalidSizeValueTooSmall } });

      expect(setSize).toHaveBeenCalledExactlyOnceWith(MIN_IMAGE_SIZE_PX);
    });

    it('invokes setSize function with MIN_IMAGE_SIZE_PX for values below the min size', () => {
      renderSizeSlider();

      const slider = screen.getByRole("slider", { name: "Download Size (px)" });
      fireEvent.change(slider, { target: { value: invalidSizeValueTooLarge } });

      expect(setSize).toHaveBeenCalledExactlyOnceWith(MAX_IMAGE_SIZE_PX);
    });
  });

  describe('on input field update', () => {
    beforeEach(() => {
      setSize.mockClear();
    });

    // Because the input field has increment/decrement buttons attached,
    // React assigns it a "spinbutton" role, rather than a generic "input"

    it('invokes setSize function for valid values', () => {
      renderSizeSlider();

      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: validSizeValue } });

      expect(setSize).toHaveBeenCalledExactlyOnceWith(validSizeValue);
    });

    it('invokes setSize function with MIN_IMAGE_SIZE_PX for non-numerical values', () => {
      renderSizeSlider();

      const input = screen.getByRole("spinbutton");
      fireEvent.input(input, { target: { value: 'non-numerical value' } });

      expect(setSize).toHaveBeenCalledExactlyOnceWith(MIN_IMAGE_SIZE_PX);
    });
  });
});
