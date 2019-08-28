import React from "react";
import { Layout } from "antd";
import "../styles/css/App.css";
import CardComponent from "./CardComponent";
import TableComponent from "./TableComponent";
const { Header, Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Header className="header">Currency Exchange</Header>
          <Content>
            <CardComponent />
            <TableComponent />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
