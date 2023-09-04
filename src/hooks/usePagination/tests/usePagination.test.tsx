import { act, renderHook } from '@testing-library/react';

import { usePagination } from '@/hooks/usePagination/usePagination';

describe('usePagination', () => {
  describe('nextPage', () => {
    it('should set page to next', () => {
      const { result } = renderHook(() =>
        usePagination({ count: 50, contentPerPage: 10 })
      );

      act(() => {
        result.current.nextPage();
      });

      expect(result.current.page).toBe(2);
    });

    it('should set page to current if page equals pageCount', () => {
      const { result } = renderHook(() =>
        usePagination({ count: 50, contentPerPage: 10 })
      );

      act(() => {
        result.current.setPage(5);
        result.current.nextPage();
      });

      expect(result.current.page).toBe(5);
    });
  });

  describe('prevPage', () => {
    it('should set page to previous', () => {
      const { result } = renderHook(() =>
        usePagination({ count: 50, contentPerPage: 10 })
      );

      act(() => {
        result.current.setPage(5);
        result.current.prevPage();
      });

      expect(result.current.page).toBe(4);
    });

    it('should set page to current if page equals 1', () => {
      const { result } = renderHook(() =>
        usePagination({ count: 50, contentPerPage: 10 })
      );

      act(() => {
        result.current.prevPage();
      });

      expect(result.current.page).toBe(1);
    });
  });

  describe('setPage', () => {
    it('should set current page to the given value', () => {
      const { result } = renderHook(() =>
        usePagination({ count: 50, contentPerPage: 10 })
      );

      act(() => {
        result.current.setPage(3);
      });

      expect(result.current.page).toBe(3);
    });

    it('should set current page to 1 if the given value less than 1', () => {
      const { result } = renderHook(() =>
        usePagination({ count: 50, contentPerPage: 10 })
      );

      act(() => {
        result.current.setPage(-1);
      });

      expect(result.current.page).toBe(1);
    });

    it('should set current page to totalPages if the given value grater than totalPages', () => {
      const { result } = renderHook(() =>
        usePagination({ count: 50, contentPerPage: 10 })
      );

      act(() => {
        result.current.setPage(7);
      });

      expect(result.current.page).toBe(5);
    });
  });
});
