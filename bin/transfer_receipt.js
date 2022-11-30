const tsreceipt = (accountholderName, balance, moneyDeduct, meansOfTransfer) => {
    const msg = `
              Receipt
  *******************************
  
    A/C Holder Name: ${accountholderName}
    ----------------------
    Transfer Via: ${meansOfTransfer}
    ----------------------
    Money Deduct: ${moneyDeduct}
    ----------------------
    Available Balance: ${balance}
      
  *******************************
  `;
    return msg;
};
export default tsreceipt;
