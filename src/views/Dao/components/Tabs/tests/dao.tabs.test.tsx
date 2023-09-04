import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Tabs } from '@/views/Dao/components';

describe('DaoTabs', () => {
  it('should render correctly', () => {
    render(<Tabs activeTab={1} setActiveTab={() => null} />);

    expect(screen.getByText('tabs.voting')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('should change active tab when click on the button', () => {
    const setActiveTabMock = jest.fn();

    render(<Tabs activeTab={1} setActiveTab={setActiveTabMock} />);

    const button = screen.getAllByRole('button')[0];
    fireEvent.click(button);

    expect(setActiveTabMock).toBeCalledTimes(1);
    expect(setActiveTabMock).toBeCalledWith(1);
  });
});
