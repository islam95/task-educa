import React, { Component } from "react";
import { Statistic, Card, Row, Col, Icon } from "antd";

class CardComponent extends Component {
  render() {
    return (
      <div style={{ padding: 30 }}>
        <Row type="flex" justify="center">
          <Col span={6}>
            <Card title="Доллар США (USD)">
              <Col span={12}>
                <Statistic
                  title="Курс на сегодня"
                  value={66.28}
                  prefix={<Icon type="dollar" />}
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

export default CardComponent;
