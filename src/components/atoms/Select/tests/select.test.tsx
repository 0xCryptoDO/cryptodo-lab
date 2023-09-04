import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Select } from '@/components';

describe('Select', () => {
  it('should render correctly', () => {
    render(
      <Select
        items={[
          { label: 'ab', value: '1' },
          { label: 'cd', value: '2' },
        ]}
      />
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
