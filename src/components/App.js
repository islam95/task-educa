import React from "react";
import { connect } from "react-redux";
import { fetchData, checkLocalStorage } from "../redux/actions/ratesAction";
import "../styles/css/App.css";

class App extends React.Component {
  componentDidMount() {
    this.props.onCheckLocalStorage();
  }

  fetchApiData = async () => {
    await this.props.onGetRates();
  };

  clearStorage = () => {
    localStorage.clear();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.fetchApiData}>Get Rates</button>
          <button onClick={this.clearStorage}>Clear</button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ rates }) => {
  return {
  rates: rates.rates,
  response: rates.response,
  error: rates.error
}
};

const mapDispatchToProps = dispatch => ({
  onGetRates: () => dispatch(fetchData()),
  onCheckLocalStorage: () => dispatch(checkLocalStorage())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
