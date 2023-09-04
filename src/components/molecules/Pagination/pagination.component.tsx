import { FC } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/atoms/Button/button.style';
import { PaginationProps } from '@/components/molecules/Pagination/pagination.types';

import * as S from './pagination.style';

export const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  setPage,
  prevPage,
  nextPage,
  gaps,
}) => (
  <S.Container>
    {totalPages > 1 ? (
      <>
        <Button
          margin
          size="small"
          onClick={prevPage}
          disabled={page === 1}
          data-testid="PrevPageButton"
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          margin
          onClick={() => setPage(1)}
          size="small"
          active={page === 1}
        >
          1
        </Button>
        {gaps.before ? '...' : null}
        {gaps.paginationGroup.map((el) => (
          <Button
            size="small"
            margin
            onClick={() => setPage(el)}
            key={el}
            active={page === el}
          >
            {el}
          </Button>
        ))}
        {gaps.after ? '...' : null}
        <Button
          margin
          size="small"
          onClick={() => setPage(totalPages)}
          active={page === totalPages}
        >
          {totalPages}
        </Button>
        <Button
          margin
          size="small"
          onClick={nextPage}
          disabled={page === totalPages}
          data-testid="NextPageButton"
        >
          <ArrowRightIcon />
        </Button>
      </>
    ) : null}
  </S.Container>
);
