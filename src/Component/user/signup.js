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
//var MongoClient = require('mongoose');
//import UserModel from "../../models/UserModel";

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            captcha:"Get captcha",
        };
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(this.props.form.getFieldValue('captcha'));
                console.log(this.state.captcha);
                if(this.props.form.getFieldValue('captcha')===this.state.captcha) {
                    console.log('Received values of form: ', values);
                    //   UserModel.insert(values);
                    $.ajax({
                        url: '/addUser',
                        type: 'post',
                        dataType: 'json',
                        data: values,
                        success: data => {
                            console.log('Signup successed'+ data);
                            if(data===null){
                                console.log('Signup failed');
                                let label = document.getElementById('label');
                                label.style.visibility = 'visible';
                            }else{
                                return this.props.signup(
                                    values
                                    //   user_id: values.user_id.split('@')[0],
                                    , (res) => {
                                        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                                        Message.success('注册成功,系统为您自动跳至首页');
                                        //   context.router.push('/');
                                    }, (error) => {
                                        console.log(error);
                                    }
                                );
                            }
                        },
                        error: err => {
                            console.log('Signup failed', err);
                        }
                    });
                }else{
                    let captchaLabel = document.getElementById("captchaLabel");
                    captchaLabel.style.visibility = 'visible';
                }


            }
        });
    }
    handleConfirmBlur(e){
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword(rule, value, callback){
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback){
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange(value){
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    getCaptcha(){
        let captcha="";
        for(let i=0;i<4;i++){
            let a = Math.floor(Math.random()*10);
            captcha += String(a);
        }
        this.setState({captcha});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector">
                <Option value="86">+86</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map((website) => {
            return <AutoCompleteOption key={website}>{website}</AutoCompleteOption>;
        });

        console.log('this.props: ',this.props);

        if(this.props.nickname===""){
            return (
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>昵称&nbsp;
                                <Tooltip title="What do you want other to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
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
                    <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    hasFeedback
                    >
                    {getFieldDecorator('confirm', {
                    rules: [{
                    required: true, message: 'Please confirm your password!',
                    }, {
                    validator: this.checkPassword.bind(this),
                    }],
                    })(
                    <Input type="password" onBlur={this.handleConfirmBlur.bind(this)} />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    hasFeedback
                    >
                    {getFieldDecorator('email', {
                    rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                    required: true, message: 'Please input your E-mail!',
                    }],
                    })(
                    <Input />
                    )}
                    </FormItem>


                    <FormItem
                    {...formItemLayout}
                    label="现居住地"
                    >
                    {getFieldDecorator('residence', {
                    initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                    rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
                    })(
                    <Cascader options={residences} />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="手机号码"
                    >
                    {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                    <Input addonBefore={prefixSelector} />
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="网址"
                    >
                    {getFieldDecorator('website', {
                    rules: [{ required: true, message: 'Please input website!' }],
                    })(
                    <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange.bind(this)}
                    placeholder="website"
                    >
                    <Input />
                    </AutoComplete>
                    )}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label="Captcha"
                    extra="We must make sure that your are a human."
                    >
                    <Row gutter={8}>
                    <Col span={12}>
                    {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: 'Please input the captcha you got!' }],
                    })(
                    <Input size="large" />
                    )}
                    </Col>
                    <Col span={12}>
                        <Button size="large" onClick={this.getCaptcha.bind(this)}>{this.state.captcha}</Button>
                        <label id="captchaLabel" style={{color:'red',visibility:'hidden'}}>验证码错误</label>
                    </Col>
                    </Row>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">注册</Button>
                        <label id="label" style={{fontSize:'1rem',color:'red',visibility:'hidden'}}>&nbsp;&nbsp;注册失败，请重新尝试</label>
                    </FormItem>
                </Form>
            );
        }else{
            return (
                <div style={{fontSize:'2rem',color:'blue'}}>您已注册成功,快去浏览其他版块吧</div>
            )
        }

    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

//export default WrappedRegistrationForm;

function mapStateToProps(state) {
    return {
        nickname:state.nickname,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signup:(formData,resolved,rejected) => dispatch({type:'SIGNUP',formData,resolved,rejected}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedRegistrationForm);