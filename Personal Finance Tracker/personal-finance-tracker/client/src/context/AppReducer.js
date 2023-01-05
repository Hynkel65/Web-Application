// eslint-disable-next-line
export default (state, action) => {
  switch(action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'UPDATE_TRANSACTION':
      console.log("Updating transaction in state:", action.payload); // <-- add this line
      return {
        ...state,
        transactions: state.transactions.map((transaction) => 
        transaction._id === action.payload._id ? action.payload : transaction
        ),
      };
    default:
      return state;
  }
}