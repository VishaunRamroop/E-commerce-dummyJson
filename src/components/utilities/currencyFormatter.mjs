
const formatter = new Intl.NumberFormat(undefined,{
  currency:'USD',style:'currency'
});
export default function currencyFormatter(cost) {
  



  return formatter.format(cost)
}
