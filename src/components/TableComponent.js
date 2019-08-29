import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchData,
  checkLocalStorage,
  deleteRate,
  addRate
} from "../redux/actions/ratesAction";
import { getAllCurrencies } from "../redux/actions/currencies";
import { selectRate } from "../helpers/api";
import { Card, Table, Row, Col, Button, Icon, message } from "antd";
import Currencies from "./Currencies";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    // table columns titles
    this.columns = [
      {
        title: "Код",
        dataIndex: "code"
      },
      {
        title: "Валюта",
        dataIndex: "text"
      },
      {
        title: "Курс",
        dataIndex: "rate",
        align: "right"
      },
      {
        title: "Изменения",
        dataIndex: "change",
        align: "right"
      },
      {
        title: "Действия",
        dataIndex: "",
        align: "right",
        key: "x",
        render: (text, record) => (
          <Button
            onClick={() => this.props.handleDelete(record.key)}
            type="danger"
            size="small"
          >
            <Icon type="delete" />
          </Button>
        )
      }
    ];

    this.state = {
      dataSource: [] // future table data
    };
  }

  componentDidMount() {
    // Get rates and currencies from local storage if exist
    this.props.onCheckLocalStorage();
  }

  fetchApiData = async () => {
    await this.props.onGetRates();
    await this.props.onGetCurrencies();
  };

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.rates.length && nextProps.currencies.length) {
      const dataSource = nextProps.rates.map(rate => {
        const change =
          rate.change > 0 ? (
            <span style={{ color: "green" }}>+{rate.change}</span>
          ) : (
            <span style={{ color: "red" }}>{rate.change}</span>
          );
        // get text names for rates
        const text = nextProps.currencies.find(cur => cur.code === rate.code)
          .text;
        return { ...rate, change, text };
      });
      return { dataSource } // populate the table
    }
    return null
  }

  // Adds rate
  handleAddRate = async () => {
    const { rates, currency } = this.props;
    if (!currency) {
      message.error("Пожалуйста, выберите валюту.");
    } else if (rates.find(rate => rate.code === currency)) {
      message.error("Такая валюта уже есть в таблице!");
    } else {
      try {
        const response = await selectRate(currency);
        const selectedRate = response.rates;
        const newRate = {
          key: Math.random() * 1000,
          code: currency,
          rate: selectedRate[currency].toFixed(4)
        };
        this.props.handleAdd(newRate); // добавит без изменения валюты
        message.success("Валюта успешно добавлена в конец таблицы!");
      } catch (error) {
        console.log("Error selecting rate from api", error);
        message.error("Произошла ошибка при выборе валюты.");
      }
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col md={{ span: 18, offset: 2 }} lg={{ span: 14, offset: 5 }}>
            <Card
              title="Валюты (USD)"
              extra={
                <div>
                  <Button type="primary" onClick={this.fetchApiData}>
                    <Icon type="download" />
                    Загрузить
                  </Button>
                </div>
              }
              actions={[
                <Button onClick={this.handleAddRate} type="ghost">
                  Добавить
                </Button>,
                <Currencies />,
                null
              ]}
            >
              <Table
                columns={this.columns}
                dataSource={this.state.dataSource}
                size="small"
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ rates, currencies }) => {
  return {
    rates: rates.rates,
    currency: currencies.currency,
    currencies: currencies.currencies
  };
};

const mapDispatchToProps = dispatch => ({
  onGetRates: () => dispatch(fetchData()),
  onGetCurrencies: () => dispatch(getAllCurrencies()),
  onCheckLocalStorage: () => dispatch(checkLocalStorage()),
  handleDelete: key => dispatch(deleteRate(key)),
  handleAdd: rate => dispatch(addRate(rate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent);
