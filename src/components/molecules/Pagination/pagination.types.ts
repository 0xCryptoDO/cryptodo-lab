import {Gap} from "@/hooks/usePagination/usePagination";

export interface PaginationProps {
  nextPage: () => void;
  prevPage: () => void;
  page: number;
  gaps: Gap
  setPage: (page: number) => void;
  totalPages: number;
}