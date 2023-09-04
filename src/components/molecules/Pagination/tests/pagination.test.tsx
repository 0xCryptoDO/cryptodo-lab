import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from '@/components/molecules/Pagination/pagination.component';

describe('Pagination', () => {
  it('should render nothing if totalPages equals 1', () => {
    render(
      <Pagination
        page={1}
        totalPages={1}
        setPage={jest.fn()}
        nextPage={jest.fn()}
        prevPage={jest.fn()}
        gaps={{ before: false, after: false, paginationGroup: [1] }}
      />
    );

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('should render correctly if totalPages does not equal 1', () => {
    render(
      <Pagination
        page={1}
        totalPages={5}
        setPage={jest.fn()}
        nextPage={jest.fn()}
        prevPage={jest.fn()}
        gaps={{ before: false, after: false, paginationGroup: [2, 3, 4] }}
      />
    );

    expect(screen.queryAllByRole('button')).toHaveLength(7);
  });

  it('should calls prevPage when click on prevPage button', () => {
    const prevPageMock = jest.fn();

    render(
      <Pagination
        page={2}
        totalPages={5}
        setPage={jest.fn()}
        nextPage={jest.fn()}
        prevPage={prevPageMock}
        gaps={{ before: false, after: false, paginationGroup: [2, 3, 4] }}
      />
    );

    const prevPageButton = screen.getByTestId('PrevPageButton');

    fireEvent.click(prevPageButton);

    expect(prevPageMock).toBeCalledTimes(1);
  });

  it('should calls nextPage when click on nextPage button', () => {
    const nextPageMock = jest.fn();

    render(
      <Pagination
        page={2}
        totalPages={5}
        setPage={jest.fn()}
        nextPage={nextPageMock}
        prevPage={jest.fn()}
        gaps={{ before: false, after: false, paginationGroup: [2, 3, 4] }}
      />
    );

    const nextPageButton = screen.getByTestId('NextPageButton');

    fireEvent.click(nextPageButton);

    expect(nextPageMock).toBeCalledTimes(1);
  });

  it('should calls setPage when click on any page button', () => {
    const setPageMock = jest.fn();

    render(
      <Pagination
        page={2}
        totalPages={5}
        setPage={setPageMock}
        nextPage={jest.fn()}
        prevPage={jest.fn()}
        gaps={{ before: false, after: false, paginationGroup: [2, 3, 4] }}
      />
    );

    const pageButton = screen.getByText('3');

    fireEvent.click(pageButton);

    expect(setPageMock).toBeCalledTimes(1);
  });
});
