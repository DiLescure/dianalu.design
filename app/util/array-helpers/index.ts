export const sortDate = (a: Date, b: Date, sortByDirection: 'asc' | 'desc' = 'asc') => {
  if (sortByDirection === 'asc') {
    return a.getTime() - b.getTime();
  }
  return b.getTime() - a.getTime();
};

export const sortNumber = (a: number, b: number, sortByDirection: 'asc' | 'desc' = 'asc') => {
  if (sortByDirection === 'asc') {
    return a - b;
  }
  return b - a;
};

export const sortString = (a: string, b: string, sortByDirection: 'asc' | 'desc' = 'asc') => {
  if (sortByDirection === 'asc') {
    return a.localeCompare(b);
  }
  return b.localeCompare(a);
};

export const concatAndSortObjectLists = ({
  lists,
  sortByProperty,
  sortByPropertyType,
  sortByDirection,
}: {
  lists: any[][];
  sortByProperty: string;
  sortByPropertyType: 'date' | 'number' | 'string';
  sortByDirection: 'asc' | 'desc';
}) => {
  const concatenatedList = lists.flat();

  concatenatedList.sort((a: any, b: any) => {
    if (sortByPropertyType === 'date') {
      return sortDate(new Date(a[sortByProperty]), new Date(b[sortByProperty]), sortByDirection);
    }

    if (sortByPropertyType === 'string') {
      return sortString(a[sortByProperty], b[sortByProperty], sortByDirection);
    }

    return sortNumber(a[sortByProperty], b[sortByProperty], sortByDirection);
  });

  return concatenatedList;
};
