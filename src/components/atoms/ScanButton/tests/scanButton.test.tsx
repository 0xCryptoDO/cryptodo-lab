import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ScanButton } from '@/components';
import { BscScanLogoIcon } from '@/assets/icons';

describe('ScanButton', () => {
  it('should render correctly', () => {
    render(<ScanButton link="123" icon={<BscScanLogoIcon />} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
