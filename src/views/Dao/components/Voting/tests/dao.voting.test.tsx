import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Voting } from '@/views/Dao/components';

describe('DaoVoting', () => {
  it('should render correctly', () => {
    render(<Voting />);

    expect(screen.getByText('votingTitle')).toBeInTheDocument();
    expect(screen.getByText('createVoting')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
