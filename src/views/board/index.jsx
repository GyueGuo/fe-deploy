import React, { createRef } from 'react';
import {
  Layout, Form, Table, Button,
} from 'antd';
import axios from 'axios';
import './index.less';

class Board extends React.PureComponent {
  $form = createRef();

  tableConf = [{
    title: '项目',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '分支',
    key: 'branch',
    render(text) {
      return (
        text
      );
    },
  }, {
    title: '操作人',
    dataIndex: 'opreator',
  }, {
    title: '发布时间',
    dataIndex: 'data_modified',
  }, {
    title: '操作',
    key: 'operations',
    render(text, data) {
      return data.publishing ? (
        <Button disabled type="primary" loading>发布中</Button>
      ) : (
        <Button type="primary" onClick={() => (this.handlePublish(data))}>发布</Button>
      );
    },
  }];

  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://47.242.66.102:3001/api/v1/getprojects')
      .then(({ data }) => {
        console.log(data);
      });
  }

  handlePublish = (tableItem) => {
    // tableItem.publishing = true;
    // this.setState({
    //   list,
    // });
    axios
      .post('http://47.242.66.102:3001/api/v1/punlishprojects', {
        data: {
          id: tableItem.id,
        },
      })
      .then(({ data }) => {
        console.log(data);
      });
  }

  render() {
    const {
      list,
    } = this.state;

    return (
      <Layout>
        <Form ref={this.$form} />
        <Table
          columns={this.tableConf}
          dataSource={list}
          pagination={false}
        />
      </Layout>
    );
  }
}

export default Board;
