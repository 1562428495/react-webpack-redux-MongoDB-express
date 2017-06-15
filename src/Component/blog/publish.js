/**
 * Created by Administrator on 2017/5/4 0004.
 */
/**
 * Created by Administrator on 2017/5/4 0004.
 */
import React from "react";
import {connect} from "react-redux";
import {Link,browserHistory} from 'react-router-dom';
//import { browserHistory } from 'react-router';
const $ = require('jquery');
import { Form, Input, Radio, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const category = ['历史','人文','社科','情感','互联网'];
const history = ['古代','现代','中国','世界'];
const humanity = ['小说','八卦','明星','周围'];
const social = ['高科技','农业','社会发展','广告'];
const emotion = ['心灵鸡汤','深夜伴读','青少年读物'];
const Internet = ['大师讲坛','代码','技术大咖'];

class PublishForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category:category[0],
            tags:history,
            success:false,
            nickname:'',
            display:'none',
            articleId:'',
            articleData:{theme:'',category:'',tags:[],content:''},
        }
    }

    componentWillMount(){
        $('#successful').css('display','none');
        $('#failed').css('display','block');
        if(this.props.match.params.id){
            console.log('this.props.match.params.id: ',this.props.match.params.id);
            this.setState({articleId:this.props.match.params.id,nickname:this.props.nickname});
            this.setState({articleData:{theme:this.props.articleData.theme,category:this.props.articleData.category,
                tags:this.props.articleData.tags, content:this.props.articleData.content}});
        }else{
            this.setState({nickname:this.props.nickname});
            console.log('11100000000000000000000000000000000000000000000000000',this.props.nickname);
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.state.nickname);
        }
    }

    componentDidMount(){
        $('#successful').css('display','none');
        $('#failed').css('display','block');
        let category = this.state.articleData.category||this.state.category;
        let tags = [];
        switch (category){
            case '历史':
                tags = history;
                break;
            case '人文':
                tags = humanity;
                break;
            case '社科':
                tags = social;
                break;
            case '情感':
                tags = emotion;
                break;
            case  '互联网':
                tags = Internet;
                break;
        };
        this.setState({category,tags});
    }

    categoryOnChange(e){
        let tags = [];
        let category = e.target.value;

        switch (category){
            case '历史':
                tags = history;
                break;
            case '人文':
                tags = humanity;
                break;
            case '社科':
                tags = social;
                break;
            case '情感':
                tags = emotion;
                break;
            case  '互联网':
                tags = Internet;
                break;
        };
        this.props.form.setFieldsValue({'tags':[]});
        this.setState({category,tags});
    }

    tagsOnChange(){
        // this.setState({
        //     checkedList,
        //     indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
        //     checkAll: checkedList.length === plainOptions.length,
        // });

    }

    changeState(){
        this.setState({success:true});
    }


    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.author = this.state.nickname;
                values.time = new Date();
                values.scanNumber = 0;
                values.commentNumber = 0;
                console.log('Received values of form: ', values);
                if(this.state.articleId){
                    $.ajax({
                        url: '/updateBlog/'+this.state.articleId,
                        type: 'post',
                        dataType: 'json',
                        data: values,
                        success: data => {
                            console.log('Update successed'+ data);
                            document.getElementById('successful').style.display = 'block';
                            document.getElementById('failed').style.display = this.state.display;
                            this.props.publish(data);
                            //   let path = '/blog/scan';
                            //   browserHistory.push(path);
                            //   this.context.router.push('user/login');
                        },
                        error: err => {
                            console.log('Update failed', err);

                        }
                    });
                }else{
                    $.ajax({
                        url: '/publishBlog',
                        type: 'post',
                        dataType: 'json',
                        data: values,
                        success: data => {
                            console.log('Publish successed', data);
                            this.setState({articleId:data._id});

                            document.getElementById('successful').style.display = 'block';
                            document.getElementById('failed').style.display = this.state.display;
                            this.props.publish(data);
                            //   let path = '/blog/scan';
                            //   browserHistory.push(path);
                            //   this.context.router.push('user/login');
                        },
                        error: err => {
                            console.log('Publish failed', err);

                        }
                    });
                }

            }
        });
    }

    publishAgain(){
        console.log('00000000000000000000000000000000000000000000000000000000');
        document.getElementById('successful').style.display = 'none';
        document.getElementById('failed').style.display = 'block';
        this.setState({articleData:{theme:'',category:'',tags:[],content:''}});
        this.props.form.setFieldsValue({theme:'',category:this.state.category,tags:[],content:''});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const articleData = this.state.articleData;
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
                    span: 12,
                    offset: 12,
                },
            },
        };

        console.log('this.state.articleData: ',articleData);


        if(this.state.nickname===''){
            return (
                <div padding="3rem">请先<Link to="/user/signup">注册</Link>或<Link to="/user/login">登录</Link>再发表博文</div>
            )
        }else{
            console.log('articleData.theme: ',articleData.theme);
            return (
                <div>
                    <div style={{width:'50%',height:'300px',textAlign:'center'}} id="successful">
                        <p>发布成功</p>
                        <p>
                            <span onClick={this.publishAgain.bind(this)}><Link to="/blog/publish">继续发布</Link></span>&nbsp;&nbsp;&nbsp;
                            <span><Link to={'/blog/getblog/'+this.state.articleId}>查看发布内容</Link></span>&nbsp;&nbsp;&nbsp;
                            <span><Link to="/blog/myblogs/:nickname">查看发布列表</Link></span>
                        </p>
                    </div>
                    <Form onSubmit={this.handleSubmit.bind(this)} id="failed">
                        <FormItem
                            {...formItemLayout}
                            label="标题"
                            hasFeedback
                        >
                            {getFieldDecorator('theme', {
                                initialValue:articleData.theme||'',
                                rules: [{ required: true, message: 'Please input the theme!', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="分类"
                            hasFeedback
                        >
                            {getFieldDecorator('category', {
                                initialValue:articleData.category||this.state.category,
                                rules: [{
                                    required: true, message: 'Please select the category!',
                                }],
                            })(
                                <RadioGroup options={category} onChange={this.categoryOnChange.bind(this)} >
                                    {/*{*/}
                                    {/*category.map(value =>*/}
                                    {/*<Radio value={value}>{value}</Radio>*/}
                                    {/*)*/}
                                    {/*}*/}

                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="标签"
                            hasFeedback
                        >
                            {getFieldDecorator('tags', {
                                initialValue:articleData.tags,
                                rules: [{
                                    //    initialValue:this.state.tags,
                                    required: true, message: 'Please select the tags!',
                                }],
                            })(
                                <CheckboxGroup options={this.state.tags} onChange={this.tagsOnChange.bind(this)}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="内容"
                            hasFeedback
                        >
                            {getFieldDecorator('content', {
                                initialValue:articleData.content||'',
                                rules: [{
                                    required: true, message: 'Please input your content!',
                                }],
                            })(
                                <textarea style={{width:'100%',height:'300px'}}>

                        </textarea>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">发表</Button>
                        </FormItem>
                    </Form>
                </div>
            )
        }
    }
}

const WrappedPublishForm = Form.create()(PublishForm);

//export default WrappedRegistrationForm;

function mapStateToProps(state) {
    console.log('state: ',state);
    return {
        nickname:state.nickname,
        articleData:state.articleData,
        id:state.id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        publish:(data) => dispatch({type:'BLOG_PUBLISH',data}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedPublishForm);