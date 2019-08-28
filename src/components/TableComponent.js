import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchData,
  checkLocalStorage,
  deleteRate,
  addRate
} from "../redux/actions/ratesAction";
import { selectRate } from "../helpers/api";
import { Card, Table, Row, Col, Button, Icon, message } from "antd";
import Currencies from "./Currencies";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Код",
        dataIndex: "code"
      },
      {
        title: "Валюта",
        dataIndex: "currency"
      },
      {
        title: "Курс",
        dataIndex: "rate"
      },
      {
        title: "Изменения",
        dataIndex: "change"
      },
      {
        title: "%",
        dataIndex: "percent"
      },
      {
        title: "Действия",
        dataIndex: "",
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
      dataSource: [],
      newRate: {}
    };
  }

  componentDidMount() {
    this.props.onCheckLocalStorage();
  }

  fetchApiData = async () => {
    await this.props.onGetRates();
  };

  componentDidUpdate(prevProps) {
    if (this.props.rates !== prevProps.rates) {
      this.setState({
        dataSource: this.props.rates
      });
    }
  }
  // {
  //   key: "1",
  //   code: "DFG",
  //   currency: "A currency name",
  //   rate: 23453,
  //   change: 1234,
  //   percent: 123
  // }

  handleAddRate = async () => {
    const { rates, currency } = this.props;
    if (!currency) {
      message.error("Пожалуйста, выберите валюту.");
    } else if (rates.find(rate => rate.code === currency)) {
      message.error("Такая валюта уже есть в таблице!");
    } else {
      try {
        const response = await selectRate("RUB", currency);
        const selectedRate = response.rates;
        const newRate = {
          key: rates.length + 1,
          code: currency,
          rate: selectedRate[currency].toFixed(2)
        };
        this.props.handleAdd(newRate);
        message.success("Валюта успешно добавлена!");
      } catch (error) {
        console.log("Error selecting rate from api");
      }
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            <Card
              title="Валюты"
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

const mapStateToProps = ({ rates }) => {
  return {
    rates: rates.rates,
    currency: rates.currency
  };
};

const mapDispatchToProps = dispatch => ({
  onGetRates: () => dispatch(fetchData()),
  onCheckLocalStorage: () => dispatch(checkLocalStorage()),
  handleDelete: key => dispatch(deleteRate(key)),
  handleAdd: rate => dispatch(addRate(rate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent);
