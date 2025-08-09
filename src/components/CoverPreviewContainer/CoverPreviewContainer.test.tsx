import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CoverPreviewContainer from './CoverPreviewContainer';
import type { Props } from './CoverPreviewContainer';

const defaultProps: Props = {
  previewSrc: undefined,
  downloadSrc: undefined,
};

const renderCoverPreviewContainer = (props = defaultProps) => {
  return render(<CoverPreviewContainer {...props} />);
};

describe('Component CoverPreviewContainer', () => {

  it('renders without crashing', () => {
    const { asFragment } = renderCoverPreviewContainer();

    expect(asFragment()).toMatchSnapshot();
  });
});
