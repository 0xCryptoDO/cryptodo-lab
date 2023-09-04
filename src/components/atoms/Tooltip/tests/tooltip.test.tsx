import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Tooltip } from '@/components';

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

describe('Tooltip', () => {
  it('should render correctly', () => {
    render(
      <Tooltip open content="rat">
        <button type="button">123</button>
      </Tooltip>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getAllByText('rat')).toHaveLength(2);
    expect(screen.getByText(123)).toBeInTheDocument();
  });
});
