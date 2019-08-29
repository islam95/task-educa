import React, { Component } from "react";
import { connect } from "react-redux";
import { selectCurrency } from "../redux/actions/currencies";
import { Select } from "antd";
const { Option } = Select;

class Currencies extends Component {
  handleChange = currency => {
    this.props.onSelectCurrency(currency);
  };

  render() {
    const { currencies } = this.props;
    return (
      <Select
        showSearch
        style={{ width: 180 }}
        placeholder="Выберите вaлюту"
        optionFilterProp="children"
        onChange={this.handleChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {currencies.length &&
          currencies.map(cur => (
            <Option key={cur.key} value={cur.code}>
              {cur.code}
            </Option>
          ))}
      </Select>
    );
  }
}

const mapStateToProps = ({ currencies }) => ({
  currencies: currencies.currencies
});

const mapDispatchToProps = dispatch => ({
  onSelectCurrency: currency => dispatch(selectCurrency(currency))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Currencies);
