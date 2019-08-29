import React, { Component } from "react";
import { connect } from "react-redux";
import { Statistic, Card, Row, Col, Icon } from "antd";

class CardComponent extends Component {
  state = {
    rate: 0,
    change: 0
  };

  componentDidUpdate(prevProps) {
    if (this.props.rates !== prevProps.rates && this.props.rates.length) {
      const rubRate = this.props.rates.find(rate => rate.code === "RUB");
      const { rate, change } = rubRate;
      this.setState({ rate, change });
    }
  }

  render() {
    const { rate, change } = this.state;
    return (
      <div style={{ padding: 30 }}>
        <Row>
          <Col
            sm={{ span: 16, offset: 3 }}
            md={{ span: 10, offset: 4 }}
            lg={{ span: 8, offset: 5 }}
            xl={{ span: 6, offset: 6 }}
          >
            <Card title="Доллар США (USD)">
              <Col span={12}>
                <Statistic
                  title="Курс на сегодня"
                  value={rate}
                  suffix="Руб"
                  precision={2}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Изменения"
                  value={change}
                  valueStyle={
                    change > 0 ? { color: "#3f8600" } : { color: "#f5222d" }
                  }
                  prefix={
                    change > 0 ? (
                      <Icon type="arrow-up" />
                    ) : (
                      <Icon type="arrow-down" />
                    )
                  }
                  precision={2}
                />
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ rates }) => ({
  rates: rates.rates
});

export default connect(
  mapStateToProps,
  null
)(CardComponent);
