export function numberWithSpaces(x) {
   return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function calculateInitailFee(percent, carPrice) {
   const price = (carPrice + "").split(" ").join("");

   return ((percent / 100) * price).toFixed(0);
}
export function calculateMonthPay(carPrice, initailFee, months) {
   const price = (carPrice + "").split(" ").join("");

   return (
      (price - initailFee) *
      ((0.035 * Math.pow(1 + 0.035, months)) /
         (Math.pow(1 + 0.035, months) - 1))
   ).toFixed(0);
}

export function calculateTotalAmount(initailFee, months, monthlyPayment) {
   return +initailFee + months * monthlyPayment;
}
export function validateInput(price, min, max) {
   const newPrice = (price + "").split(" ").join("");
   if (+newPrice > max) {
      return max;
   } else if (+newPrice < min) {
      return min;
   } else return newPrice;
}
