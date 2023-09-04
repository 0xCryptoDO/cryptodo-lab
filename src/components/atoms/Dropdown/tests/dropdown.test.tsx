import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Dropdown } from '@/components';

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

describe('Dropdown', () => {
  it('should render correctly when not open', () => {
    render(
      <Dropdown
        items={[
          { label: 'ab', action: () => null },
          { label: 'cd', action: () => null },
          {
            label: 'ef',
            action: () => null,
          },
        ]}
      >
        <button type="button">123</button>
      </Dropdown>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('ab')).not.toBeInTheDocument();
    expect(screen.queryByText('cd')).not.toBeInTheDocument();
    expect(screen.queryByText('ef')).not.toBeInTheDocument();
  });

  it('should render correctly when open', () => {
    render(
      <Dropdown
        open
        items={[
          { label: 'ab', action: () => null },
          { label: 'cd', action: () => null },
          {
            label: 'ef',
            action: () => null,
          },
        ]}
      >
        <button type="button">123</button>
      </Dropdown>
    );

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('ab')).toBeInTheDocument();
    expect(screen.getByText('cd')).toBeInTheDocument();
    expect(screen.getByText('ef')).toBeInTheDocument();
  });
});
