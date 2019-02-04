import React from 'react';
import './StockListItem.css';

const StockListItem = (stock, props) => {

  return (
    <li className="StockListItem">
      <div className="StockListItem_Symbol"><span>Symbol </span>{ stock.symbol }</div>
      <div className="StockListItem_Price"><span>Current Stock Price </span>${ parseInt(stock.price)?parseInt(stock.price).toFixed(2)+' USD':'' }</div>
      <div className="StockListItem_Description"><span>Description: </span>{ stock.description }</div>
     </li>
  )
}
export default StockListItem;
