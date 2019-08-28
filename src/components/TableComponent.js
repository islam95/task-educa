import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchData, checkLocalStorage, deleteRate } from "../redux/actions/ratesAction";
import { Card, Table, Row, Col, Button, Icon } from "antd";

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
      dataSource: []
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
                  </Button>{" "}
                  <Button type="ghost">Добавить</Button>
                </div>
              }
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
    rates: rates.rates
  };
};

const mapDispatchToProps = dispatch => ({
  onGetRates: () => dispatch(fetchData()),
  onCheckLocalStorage: () => dispatch(checkLocalStorage()),
  handleDelete: (key) => dispatch(deleteRate(key)) 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableComponent);
