const express = require('express')
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction, updateTransaction } = require('../controllers/transactionControls');

router
    .route('/')
    .get(getTransactions)
    .post(addTransaction);

router
    .route('/:id')
    .delete(deleteTransaction)

router
    .route('/:id')
    .patch(updateTransaction)

module.exports = router;