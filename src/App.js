import React, { Component } from 'react';
import Select from 'react-select';
import StockList from './components/StockList/StockList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: [],
      selectedOption: null,
      stocks:[
        { value: 'AAPL', label: 'AAPL' },
        { value: 'TSLA', label: 'TSLA' },
        { value: 'GOOGL', label: 'GOOGL' }
      ]
    }
    this.handleChange = this.handleChange.bind(this);   
  }
  addData = data => {
    let stock = {
      symbol:data.company.symbol,
      description: data.company.description,
      price: data.quote.latestPrice
    } 
    this.setState({stock:[stock]});
  };

  getData = async => {
    let query = this.state.selectedOption.value;
    let endpoint = `https://api.iextrading.com/1.0/stock/${query}/batch?types=quote,company`;
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(responseJson => {
        this.addData(responseJson);
      })
      .catch(error => {
        console.log(error);
        
      });
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption},
      ()=>{
        this.getData();
      }
      );
  }
  render() {
    const { selectedOption } = this.state;
    return (
      <div className="stockCard">
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.state.stocks}
      />
      <StockList stockItems={ this.state.stock }/>
      </div>     
    );
  }
}

export default App;
