import { OrderEnum } from './enums/order.enum';

export function checkSortOrder(order?: string): 'ASC' | 'DESC' | undefined {
  switch (order?.toUpperCase()) {
    case OrderEnum.ASC:
      return OrderEnum.ASC.toString() as 'ASC';
    case OrderEnum.DESC:
      return OrderEnum.DESC.toString() as 'DESC';
    default:
      return;
  }
}
