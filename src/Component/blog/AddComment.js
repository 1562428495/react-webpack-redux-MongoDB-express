/**
 * Created by Administrator on 2017/5/4 0004.
 */
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
var $ = require('jquery');
import { Form, Input, Button} from 'antd';
const FormItem = Form.Item;

class CommentForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            article_id:'',
            nickname:'',
        };
    }

    handleSubmit(e){
        e.preventDefault();
        console.log('AddComment handleSubmit: ',this.props,' id: ',this.props.id,' nickname: ',this.props.nickname);
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.nickname = this.props.nickname;
                $.ajax({
                    url: '/addComment/'+this.props.id,
                    type: 'post',
                    dataType: 'json',
                    data: values,
                    success: data => {
                        console.log('add comment successed'+ data);
                        document.getElementById('form').style.display = 'none';
                        document.getElementById('success').style.display = 'block';
                        this.props.onClick();
                    },
                    error: err => {
                        console.log('add comment failed', err);
                    }
                });

            }
        });
    }

    addCommentAgain(){
        document.getElementById('form').style.display = 'block';
        document.getElementById('success').style.display = 'none';
        console.log('this.props.form: ',this.props.form);
        this.props.form.setFieldsValue({'content':''});
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log('AddComment render: ',this.props,' id: ',this.props.id,' nickname: ',this.props.nickname);
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
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
                    offset: 12,
                },
            },
        };

        if(this.props.nickname===""){
            return (
                <div>您还未登录，请先<Link to="/user/login">登录</Link>再发表评论</div>
            );
        }else{
            return (
            <div style={{width:'80%',height:'14rem',border:'green solid 2px',margin:'0 auto',paddingTop:'1rem'}}>
                <Form onSubmit={this.handleSubmit.bind(this)} id="form">
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>评论&nbsp;</span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: 'Please input your words!', whitespace: true }],
                        })(
                            <textarea style={{width:'100%',height:'8rem'}}>

                            </textarea>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large" onClick={
                            () => this.props.emitter.emit('publish')
                        }>发表</Button>
                    </FormItem>
                </Form>
                <div id="success" style={{display:'none',textAlign:'center',padding:'4rem'}}>
                    评论成功,<Button type="primary" onClick={this.addCommentAgain.bind(this)}>再次评论</Button>
                </div>
            </div>
            )
        }

    }
}

const WrappedCommentForm = Form.create()(CommentForm);

//export default WrappedCommentForm;

function mapStateToProps(state) {
    console.log('addcomment mapStateToProps: ',state);
    return {
        id:state.id,
        nickname:state.nickname,
    };
}

function mapDispatchToProps(dispatch) {
 //   var data = {id:this.props.id,nickname:this.props.nickname};
    return {
     //   addComment:(data) => dispatch({type:'ADDCOMMENT',data}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WrappedCommentForm);