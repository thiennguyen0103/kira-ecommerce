type IconProps = React.HTMLAttributes<SVGElement>;

type PageOptions = {
  page?: number;
  limit?: number;
};

type DataList<T> = {
  data: T[];
  metadata: MetaData;
};

type MetaData = {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
