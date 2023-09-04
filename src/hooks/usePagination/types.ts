import {Gap} from "@/hooks/usePagination/usePagination";

interface UsePaginationProps {
  contentPerPage: number,
  count: number,
}
interface UsePaginationReturn {
  page: number;
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  gaps: Gap;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}
export type UsePagination = (arg0: UsePaginationProps) => (UsePaginationReturn);