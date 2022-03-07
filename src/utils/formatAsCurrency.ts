export const formatAsCurrency = (
  amount: string | number,
  {currencyDisplay = 'symbol'} = {},
) => {
  const amt = Number(amount);

  if (!amt) return;

  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    currencyDisplay,
    maximumFractionDigits: 4,
  }).format(amt);
};
