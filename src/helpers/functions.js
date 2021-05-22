import moment from 'moment';

export function reverseFormatNumber(val, locale) {
  var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
  var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
  var reversedVal = val
    .replace(new RegExp('\\' + group, 'g'), '')
    .replace(new RegExp('\\' + decimal, 'g'), '.')
    .replace(/[^0-9.]/g, '');
  return Number.isNaN(reversedVal) ? 0 : reversedVal;
}

export const getDataForTheFirstChart = (incomes) => {
  let dates = [];
  const incomesarray = [];
  incomes.forEach((data) => {
    dates = dates.concat([...data.incomes.map((key) => Object.keys(key)[0])]);
    incomesarray.push(...data.incomes.map((value) => Object.entries(value)[0]));
  });
  let datesSet = new Set(dates);

  datesSet = [...datesSet]
    .sort()
    .map((date) => incomesarray.filter((e) => e[0].includes(date)));
  const labels = [];
  const values = [];

  datesSet.forEach((el) => {
    labels.push(
      ...new Set(el.map((date) => moment(date[0]).format('MMM/YYYY')))
    );
    values.push(
      el.map((value) => value[1]).reduce((acc, curr) => acc + curr, 0)
    );
  });
  return [values, labels];
};

// export const getDataForTheBrokersChart = (investment) => {
//   const brokers = [...new Set(investment.map((inv) => inv.broker))];

//   const somas = [];
//   for (let i = 0; i < brokers.length; i++) {
//     let soma = 0;
//     for (let j = 0; j < investment.length; j++) {
//       if (investment[j].broker === brokers[i]) {
//         soma += investment[j].initial_amount + investment[j].accrued_income;
//       }
//     }
//     somas.push(soma);
//   }
//   return [[...somas], [...brokers]];
// };
