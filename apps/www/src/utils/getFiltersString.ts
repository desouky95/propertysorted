export function getFiltersString(filters: Filter[]) {
  return filters.reduce((acc, filter) => {
    if (filter.value) {
      return `${acc}&${filter.key.replace('filter_','')}_like=${filter.value}`;
    }
    return acc;
  }, "");
}
