/**
 * Created by Administrator on 2017/5/4 0004.
 */
import React from "react";
import {connect} from "react-redux";
//import $ from 'jquery';
var $ = require('jquery');
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class LoginForm extends React.Component {
    constructor(props){
        super(props);
        console.log('login constructor');
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //   UserModel.insert(values);
                $.ajax({
                    url: '/userLogin',
                    type: 'post',
                    dataType: 'json',
                    data: values,
                    success: data => {
                        console.log('Login successed'+ data);
                        console.log(data);
                        if(data === null){
                            console.log('Login failed', err);
                            let label = document.getElementById('label');
                            label.style.visibility = 'visible';
                        }else{
                            return this.props.login(
                                values
                                //   user_id: values.user_id.split('@')[0],
                                , (res) => {
                                    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                                    Message.success('登录成功,系统为您自动跳至首页');
                                    //   context.router.push('/');
                                }, (error) => {
                                    console.log(error);
                                }
                            );
                        }

                    },
                    error: err => {
                        console.log('Login failed', err);
                        var label = document.getElementById('label');
                        label.style.visibility = 'visible';
                    }
                });

            }
        });
    }

    checkConfirm(rule, value, callback){
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        if(this.props.nickname===""){
            return (
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>昵称&nbsp;</span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.checkConfirm.bind(this),
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">登录</Button>
                        <label id="label" style={{fontSize:'1rem',color:'red',visibility:'hidden'}}>&nbsp;&nbsp;用户名或密码错误，请重新输入</label>
                    </FormItem>
                </Form>
            );
        }else{
            return (
                <div style={{fontSize:'2rem',color:'blue'}}>您已登录成功,快去浏览其他版块吧</div>
            )
        }

    }
}

const WrappedLoginForm = Form.create()(LoginForm);

//export default WrappedRegistrationForm;

function mapStateToProps(state) {
    return {
        nickname:state.nickname,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login:(formData,resolved,rejected) => dispatch({type:'LOGIN',formData,resolved,rejected}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedLoginForm);