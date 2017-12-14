import React, { PureComponent } from 'react';
import { Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';

const { Description } = DescriptionList;

export default class UserDefault extends PureComponent {
  render() {
    const { location } = this.props;
    const { user: currentUser } = location.state;

    return (
      <PageHeaderLayout title="用户详情">
        <Card bordered={false}>
          <DescriptionList
            size="large"
            title="用户信息"
            style={{ marginBottom: 32 }}
          >
            <Description term="用户姓名">{currentUser.firstName}</Description>
            <Description term="邮件地址">{currentUser.email}</Description>
            <Description term="权限">{currentUser.authorities}</Description>
            <Description term="注册日期">{currentUser.createdDate}</Description>
            <Description term="备注">无</Description>
          </DescriptionList>
        </Card>
      </PageHeaderLayout>
    );
  }
}
