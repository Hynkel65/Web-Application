import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('');

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    let textValue = text;
    if (!textValue && type === 'income') {
      textValue = 'Income';
    } else if (!textValue && type === 'expense') {
      textValue = 'Expense';
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text: textValue,
      amount: type === 'income' ? +amount : -amount,
    };

    addTransaction(newTransaction);

    setText('');
    setAmount('');
    setType('');
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
      <div className="form-control">
          <label htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              if (e.target.value >= 0) {
                setAmount(e.target.value);
              }
            }}
            placeholder="Enter amount..."
            step='1000'
          />
        <div className="form-control">
          <label htmlFor="text">Description</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        </div>
        <div className="form-control">
          <div className='radio'>
            <input
              type="radio"
              name="type"
              value="income"
              checked={type === 'income'}
              onChange={(e) => setType(e.target.value)}
              className='radio-btn'
              />
            <label htmlFor="type" className='radio-text'>Income</label>
          </div>
          <div className='radio'>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={type === 'expense'}
              onChange={(e) => setType(e.target.value)}
              className='radio-btn'
            />
          <label htmlFor="type" className='radio-text'>Expense</label>
          </div>
          
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
