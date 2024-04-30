declare type Filter = { key: string; value: string };
declare type PageParam = {
  page: number;
  perPage: number;
  filters?: Filter[];
};

declare type PaginateResponse<T> = {
  // first: number;
  prev: number | null;
  next: number | null;
  // last: number;
  // pages: number;
  // items: number;
  data: T[];
};
