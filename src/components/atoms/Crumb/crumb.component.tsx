import { FC } from 'react';
import Link from 'next/link';
import { CrumbProps } from './crumb.types';
import * as S from './crumb.style';

export const Crumb: FC<CrumbProps> = ({ title, href, isLast, onClick, disabled }) => {
  if (isLast || disabled) {
    return (<span>{ title }</span>);
  }

  return (
    <>
      { onClick ? (
        <S.Action type="button" onClick={ onClick }>
          { title }
        </S.Action>
      ) : (
        <Link href={ href || '' }>{ title }</Link>
      ) }
      <span>/</span>
    </>
  );
};
