export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
    compactDisplay: "short",
    useGrouping: true,
    currencyDisplay: "code",
    notation: "compact",
  }).format(value);
