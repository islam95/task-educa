import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../redux/actions/ratesAction";
import "../styles/css/App.css";

class App extends React.Component {
  fetchApiData = async () => {
    await this.props.onGetRates();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.fetchApiData}>Get Rates</button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ rates }) => ({
  rates: rates,
  getRatesError: rates.error
});

const mapDispatchToProps = dispatch => ({
  onGetRates: () => dispatch(fetchData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
