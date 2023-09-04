import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Slider } from '@/components';

// @ts-ignore
global.ResizeObserver = class ResizeObserver {
  constructor(cb: any) {
    // @ts-ignore
    this.cb = cb;
  }

  observe() {
    // @ts-ignore
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
  }

  // eslint-disable-next-line class-methods-use-this
  unobserve() {}
};

global.DOMRect = {
  // @ts-ignore
  fromRect: () => ({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
  }),
};

describe('Slider', () => {
  it('should render correctly', () => {
    render(<Slider value={1} setValue={() => null} />);

    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});
