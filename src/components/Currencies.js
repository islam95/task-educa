import React, { Component } from "react";
import { connect } from "react-redux";
import {selectCurrency} from "../redux/actions/ratesAction";
import { Select } from "antd";
const { Option } = Select;

class Currencies extends Component {
 
  onChange = (currency) => {
    this.props.onSelectCurrency(currency)
  }

  render() {
    return (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Выберите вылюту"
        optionFilterProp="children"
        onChange={this.onChange}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="USD">USD</Option>
        <Option value="DGF">DGF</Option>
        <Option value="TOM">TOM</Option>
      </Select>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSelectCurrency: currency => dispatch(selectCurrency(currency))
});

export default connect(null, mapDispatchToProps)(Currencies);
