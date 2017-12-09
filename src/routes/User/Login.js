import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Icon, Checkbox, Alert } from 'antd';
import styles from './Login.less';

const FormItem = Form.Item;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Login extends Component {
  state = {
    type: 'account',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.status === 'ok') {
      this.props.dispatch(routerRedux.push('/'));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/userLogin',
          payload: values,
        });
      }
    });
  };

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    );
  };

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          {login.status === 'error' &&
            login.type === 'account' &&
            login.submitting === false &&
            this.renderMessage('账户或密码错误')}
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: type === 'account',
                  message: '请输入账户名！',
                },
              ],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="admin"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: type === 'account',
                  message: '请输入密码！',
                },
              ],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
                type="password"
                placeholder="888888"
              />
            )}
          </FormItem>

          <FormItem className={styles.additional}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox className={styles.autoLogin}>自动登录</Checkbox>)}
            <a className={styles.forgot} href="">
              忘记密码
            </a>
            <Button
              size="large"
              loading={login.submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </FormItem>
        </Form>
        <div className={styles.other}>
          其他登录方式
          {/* 需要加到 Icon 中 */}
          <span className={styles.iconAlipay} />
          <span className={styles.iconTaobao} />
          <span className={styles.iconWeibo} />
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </div>
    );
  }
}
