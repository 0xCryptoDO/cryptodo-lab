import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Cards } from '@/views/Dao/components/Members/components';

describe('DaoMemberCard', () => {
  it('should render correctly', () => {
    const firstUser = { address: 'sadsafdasd', shares: 0.8, percents: 50 };
    const secondUser = { address: 'sczxczxc', shares: 0.6, percents: 30 };

    render(<Cards content={[firstUser, secondUser]} />);

    expect(screen.getByText('sadsaf...dasd')).toBeInTheDocument();
    expect(screen.getByText(firstUser.shares)).toBeInTheDocument();
    expect(screen.getByText(`${firstUser.percents}%`)).toBeInTheDocument();
    expect(screen.getByText(secondUser.shares)).toBeInTheDocument();
    expect(screen.getByText(`${secondUser.percents}%`)).toBeInTheDocument();
    expect(screen.getByText('sczxcz...czxc')).toBeInTheDocument();
  });
});
