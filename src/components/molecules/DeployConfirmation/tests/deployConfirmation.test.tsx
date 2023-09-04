import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DeployConfirmation } from '@/components';

jest.mock('@/components/atoms/Dialog/dialog.component', () => ({
  Dialog: ({ children }: any) => <div data-testid="Dialog">{children}</div>,
}));

describe('deployConfirmation', () => {
  it('should render correctly', () => {
    render(<DeployConfirmation open submit={() => null} toggle={() => null} />);

    expect(
      screen.getByText('deployConfirmationDialog.message')
    ).toBeInTheDocument();
    expect(screen.getByTestId('Dialog')).toBeInTheDocument();
  });
});
