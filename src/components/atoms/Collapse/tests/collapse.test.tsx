import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Collapse, CollapseItem } from '@/components';

describe('CollapseItem and Collapse', () => {
  it('should render correctly', () => {
    render(
      <Collapse type="single">
        <CollapseItem header="testHeader" value="ksk" />
      </Collapse>
    );

    expect(screen.getByText('testHeader')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
