/**
 * Created by Administrator on 2017/5/4 0004.
 */
import React from "react";
import {connect} from "react-redux";
import {browserHistory} from 'react-router';
import {Link} from 'react-router-dom';
import EventEmitter from 'events';
import {createBrowserHistory} from 'history';
import { Popconfirm, message } from 'antd';
import AllComments from './AllComments';
import AddComment from './AddComment';
const $ = require('jquery');
import './myblog.css';

var emitter = new EventEmitter;

class MyBlog extends React.Component {
    constructor(){
        super();
        this.state = {
            nickname:'',
            data:{},
            flag:0,
            commentsLength:0,
        }
    }

    getBlogById(){
        $.ajax({
            url:'/getBlogById/'+this.props.match.params.id,
            type: 'GET',
            dataType:'json',
            success:(data)=>{
                console.log('Get blog sucessful');
                this.setState({nickname:this.props.nickname,data:data[0]});
            },
            error:(err)=>{
                console.log('Get blog failed');
                console.log(err);
            }
        });
    }

    componentDidMount(){
        this.getBlogById();
    }

    removeBlog(){
        $.ajax({
            url:'/removeBlogById/'+this.state.data._id,
            type: 'post',
            dataType:'json',
            success:(data)=>{
                console.log('Remove blog sucessful');
                this.setState({data:{}});
                const path = "/blog/myblogs";
                console.log(this);
                this.props.history.push(path);
            },
            error:(err)=>{
                console.log('Remove blog failed');
                console.log(err);
            }
        });
    }

    addCommentNumber(){
    //    this.getBlogById();
    }

    render() {
        const data = this.state.data;
        const link_str = '/blog/update/';

        return (
            <div>
                <p className="theme">{data.theme}</p>
                <div className="affiliated">
                    <span className="left">分类：{data.category}</span>&nbsp;&nbsp;
                    <span className="left">标签：{data.tags}</span>&nbsp;&nbsp;
                    <span className="right">浏览量：{data.scanNumber}</span>&nbsp;&nbsp;
                    <span className="right">评论数：{data.commentNumber}</span>&nbsp;&nbsp;
                    {data.author && this.props.nickname && (data.author===this.props.nickname) ?
                        <span>
                            <Link to={link_str+data._id}>
                                <span className="right" onClick={() => this.props.sendData(data)}>编辑</span>
                            </Link>&nbsp;&nbsp;
                            <Popconfirm title="您确定要删除该博文吗?" onConfirm={this.removeBlog.bind(this)} okText="确定" cancelText="取消">
                                <span className="right">删除</span>
                            </Popconfirm>
                        </span>
                         :''}
                </div>
                <p className="content">{data.content}</p>
                <div>
                    <AllComments id={data._id} emitter={emitter}/>
                </div>
                <div>
                    发表评论
                    <AddComment id={data._id} nickname={this.props.nickname} emitter={emitter} onClick={this.getBlogById.bind(this)}/>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('myblog mapStateToProps: ',state);
    return {
        id:state.id,
        nickname:state.nickname,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendData:(data) => dispatch({type:'SENDDATA',data}),
        refreshComment:() => dispatch({type:'REFRESHCOMMENT'}),
        redudant:()=> dispatch({type:'REDUDANT'}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyBlog);