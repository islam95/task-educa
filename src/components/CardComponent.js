import React, { Component } from "react";
import { connect } from "react-redux";
import { Statistic, Card, Row, Col, Icon } from "antd";

class CardComponent extends Component {
  state = {
    rate: 0
  };

  componentDidUpdate(prevProps) {
    if (this.props.rates !== prevProps.rates) {
      const rubRate = this.props.rates.find(rate => rate.code === "RUB");
      const { rate } = rubRate;
      this.setState({ rate });
    }
  }

  render() {
    return (
      <div style={{ padding: 30 }}>
        <Row type="flex" justify="center">
          <Col span={6}>
            <Card title="Доллар США (USD)">
              <Col span={12}>
                <Statistic
                  title="Курс на сегодня"
                  value={this.state.rate}
                  suffix="Руб"
                  precision={2}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Изменения"
                  value={70.34}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<Icon type="arrow-up" />}
                  precision={2}
                />
              </Col>
            </Card>
          </Col>
          <Col span={6} offset={1}>
            <Card title="Евро (EUR)">
              <Col span={12}>
                <Statistic
                  title="Курс на сегодня"
                  value={93.243}
                  prefix={<Icon type="euro" />}
                  precision={2}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Изменения"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: "#cf1322" }}
                  prefix={<Icon type="arrow-down" />}
                  suffix="%"
                />
              </Col>
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

export default connect(
  mapStateToProps,
  null
)(CardComponent);
