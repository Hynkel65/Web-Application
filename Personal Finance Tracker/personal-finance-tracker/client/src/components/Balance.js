import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

//Money formatter function
function moneyFormatter(num) {
  let p = Math.abs(num).toString();
  return (
    'Rp ' + (num < 0 ? '-' : '') +
    p.split('').reverse().reduce(function (acc, num, i, orig) {
      return num + (i && !(i % 3) ? '.' : '') + acc;
    }, '')
  );
}

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <>
      <h4>Your Balance</h4>
    <h1>{moneyFormatter(total)}</h1>
    </>
  )
}
