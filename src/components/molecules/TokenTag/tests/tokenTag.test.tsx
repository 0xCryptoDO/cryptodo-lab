import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TokenTag } from '@/components';

describe('TokenTag', () => {
  it('should render correctly if onClick and infoContent undefined', () => {
    render(
      <TokenTag disabled={false} isActive>
        dsadas
      </TokenTag>
    );

    expect(screen.getByText('dsadas')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.queryByTestId('PlusIcon')).not.toBeInTheDocument();
  });

  it('should render correctly if onClick undefined', () => {
    render(
      <TokenTag disabled={false} isActive infoContent="pppp">
        dsadas
      </TokenTag>
    );

    expect(screen.getByText('dsadas')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.queryByTestId('PlusIcon')).not.toBeInTheDocument();
  });

  it('should render correctly if infoContent undefined', () => {
    render(
      <TokenTag disabled={false} isActive infoContent="pppp">
        dsadas
      </TokenTag>
    );

    expect(screen.getByText('dsadas')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('should render correctly if all defined', () => {
    render(
      <TokenTag
        disabled={false}
        isActive
        infoContent="pppp"
        onClick={() => true}
      >
        dsadas
      </TokenTag>
    );

    expect(screen.getByText('dsadas')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('should calls onClick than click on button', () => {
    const onClickMock = jest.fn();

    render(
      <TokenTag
        disabled={false}
        isActive
        infoContent="pppp"
        onClick={onClickMock}
      >
        dsadas
      </TokenTag>
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(onClickMock).toBeCalledTimes(1);
  });
});
