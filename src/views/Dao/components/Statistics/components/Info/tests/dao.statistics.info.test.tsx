import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Info } from '@/views/Dao/components/Statistics/components';

describe('DaoStatisticsInfo', () => {
  it('should render correctly', () => {
    const content = [
      {
        color: '#fff',
        title: 'dadsadas',
        text: '1231dffsf',
        Icon: 'icon1',
      },
      {
        color: '#faa',
        title: 'dczxczx',
        text: '1312312dsft',
        Icon: 'icon2',
      },
    ];

    render(<Info content={content} />);

    expect(screen.getByText(content[0].text)).toBeInTheDocument();
    expect(screen.getByText(content[0].title)).toBeInTheDocument();
    expect(screen.getByText(content[1].text)).toBeInTheDocument();
    expect(screen.getByText(content[1].title)).toBeInTheDocument();
  });
});
