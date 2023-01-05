import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { updateTransaction } from '../context/GlobalState';
import moment from 'moment';

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
  const { deleteTransaction, updateTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';

  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState(transaction.text);
  const [amount, setAmount] = useState(transaction.amount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating transaction:", { text, amount });
    await updateTransaction(transaction._id, { text, amount });
    setShowForm(false);
  }  

  return (
    <li>
      {showForm ? (
        <form onSubmit={handleSubmit} className='edit-form'>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button type="submit" className='confirm-btn'>Save</button>
          <button type="button" className='confirm-btn' onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          {transaction.text}
          <small>{moment(transaction.createdAt).format('MMM Do YYYY')}</small>
          <span className={transaction.amount < 0 ? 'negative' : 'positive'}>
            {sign} {moneyFormatter(Math.abs(transaction.amount))}
          </span>
          <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">
            x
          </button>
          <button onClick={() => setShowForm(!showForm)} className="edit-btn">
            Edit
          </button>
        </>
      )}
    </li>
  );
};
