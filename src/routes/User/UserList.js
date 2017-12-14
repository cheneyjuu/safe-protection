import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Table, Card, Divider } from 'antd';
import { Link } from 'react-router-dom';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(state => ({
  list: state.user,
}))
@Form.create()
export default class UserList extends PureComponent {
  state = {
    pageSize: 10,
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'user/fetch',
      payload: { page: 0, size: this.state.pageSize },
    });
  }

  handleTableChange = (pagination) => {
    this.setState({ pageSize: pagination.pageSize });
    this.props.dispatch({
      type: 'user/fetch',
      payload: {
        page: pagination.current === 1 ? 0 : pagination.current,
        size: this.state.pageSize,
      },
    });
  };

  render() {
    const { list: { list, loading } } = this.props;
    const { data, pagedElements } = list;
    const columns = [
      {
        title: '用户名',
        dataIndex: 'login',
      },
      {
        title: '姓名',
        dataIndex: 'firstName',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link
              to={{
                pathname: `user-list/${record.id}`,
                state: { user: record },
              }}
            >
              查看详情
            </Link>
            <Divider type="vertical" />
            <a href="#">删除</a>
          </span>
        ),
      },
    ];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: this.state.pageSize,
      total: pagedElements,
    };
    return (
      <PageHeaderLayout title="用户列表">
        <Card bordered={false}>
          <Table
            loading={loading}
            rowKey={record => record.id}
            columns={columns}
            dataSource={data}
            pagination={paginationProps}
            onChange={this.handleTableChange}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
