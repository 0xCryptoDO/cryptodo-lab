import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { List } from '@/views/Dao/components/Statistics/components';
import { ListItemProps } from '@/views/Dao/components/Statistics/components/List/dao.list.item.types';

describe('DaoList', () => {
  it('should render correctly', () => {
    const content: ListItemProps[] = [
      {
        Icon: () => <div data-testid="ListIcon1" />,
        text: 'ddd',
        to: 'dasdasd',
        id: 1,
      },
      {
        Icon: () => <div data-testid="ListIcon2" />,
        text: 'zzz',
        to: 'zxcxzczxc',
        id: 2,
      },
    ];

    render(<List content={content} />);

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByTestId('ListIcon1')).toBeInTheDocument();
    expect(screen.getByTestId('ListIcon2')).toBeInTheDocument();
    expect(screen.getByText(content[0].text)).toBeInTheDocument();
    expect(screen.getByText(content[1].text)).toBeInTheDocument();
  });
});
