import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

// Money formatter function
function moneyFormatter(num) {
  let p = Math.abs(num).toString();
  return (
    'Rp ' + (num < 0 ? '-' : '') +
    p.split('').reverse().reduce(function (acc, num, i, orig) {
      return num + (i && !(i % 3) ? '.' : '') + acc;
    }, '')
  );
}

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li>
      {transaction.text}
      <span className={transaction.amount < 0 ? 'negative' : 'positive'}>
        {sign} {moneyFormatter(Math.abs(transaction.amount))}
      </span>
      <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">
        x
      </button>
    </li>
  );
};
