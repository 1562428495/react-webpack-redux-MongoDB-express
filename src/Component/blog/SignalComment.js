/**
 * Created by Administrator on 2017/5/4 0004.
 */
import React from "react";
import {connect} from "react-redux";
import {browserHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { Button, message } from 'antd';
const $ = require('jquery');
import './myblog.css';

class SignalComment extends React.Component {
    constructor(){
        super();
        this.state = {
            id:'',
            replyData:[],
            favour:0,
        }
    }

    componentDidMount(){
        console.log('SignalComment componentDidMount: ',this.props.id,this.props.floor);
        $.ajax({
            url:'/getReplyCommentsById/'+this.props.id+'/'+this.props.floor,
            type: 'GET',
            dataType:'json',
            success:(data)=>{
                console.log('Get ReplyComments sucessful');
                this.setState({replyData:data,favour:this.props.favour});
                console.log('SignalComment this.state: ',this.state.replyData);
            },
            error:(err)=>{
                console.log('Get ReplyComments failed');
                console.log(err);
            }
        })
    }

    showSubReplyForm(replyDivId){
        console.log('SignalComment showSubReplyForm: ',replyDivId);
        document.getElementById(replyDivId).style.display = 'block';
    }

    submitComment(nickname,replyDivId){
        var replyDiv = document.getElementById(replyDivId);
        var text = replyDiv.firstChild.value;
        if(text!==''){
            var value = {
                nickname:this.props.nickname,
                content:text,
                to_uid:nickname,
                floor:this.props.floor,
            }
            $.ajax({
                url:'/addComment/'+this.props.id,
                type:'post',
                dataType:'json',
                data:value,
                success:(data)=>{
                    console.log('submitComment successed',data);
                    var oldReplyData = this.state.replyData;
                    oldReplyData.splice(oldReplyData.length,0,data);
                    this.setState({replyData:oldReplyData});
                    document.getElementById(replyDivId).style.display = 'none';
                },
                error:(err)=>{
                    console.log('submitComment failed',err);
                }
            })
        }else{
            replyDiv.lastChild.style.display = 'inline';
        }

    }

    addFavour(replyId){
        $.ajax({
            url:'/updateCommentById/'+replyId,
            type:'post',
            dataType:'json',
            success:(data)=>{
                console.log('updateComment successed :',data);
                if(replyId===this.props._id){
                    this.setState({favour:++this.state.favour});
                }else{
                    var oldReplyData = this.state.replyData;
                    for(var i=0;i<oldReplyData.length;i++){
                        if(replyId===oldReplyData[i]._id){
                            oldReplyData[i].favour++;
                            break;
                        }
                    }
                    this.setState({replyData:oldReplyData});
                }

            }
        })
    }

    render() {
        const data = this.state.data;
        const link_str = '/blog/update/';
        return (
            <div style={{border:'solid lightgreen 1px'}}>
                <p style={{background:'lightgreen'}}>
                    {this.props.from_uid}&nbsp;&nbsp;&nbsp;发表于&nbsp;{this.props.time}
                    <div style={{float:'right'}}>F{this.props.floor}</div>
                </p>
                <p style={{}}>{this.props.content}</p>
                <p style={{color:'green',textAlign:'right'}}>
                    <span onClick={this.addFavour.bind(this,this.props._id)}>赞({this.state.favour})</span>&nbsp;&nbsp;&nbsp;
                    <span onClick={this.showSubReplyForm.bind(this,this.props._id)}>回复({this.state.replyData.length})</span>&nbsp;
                </p>
                <hr color="lightgreen"/>
                <div id="replyRegin" style={{marginLeft:'4rem',background:'lightgrey'}}>
                    {this.state.replyData.map(reply => {
                        return (<div>
                            <span>{reply.to_uid===this.props.from_uid?reply.from_uid:reply.from_uid+' 回复 '+reply.to_uid}</span>
                            &nbsp;:&nbsp;{reply.content}
                            <p style={{color:'green',textAlign:'right'}}>
                                <span style={{float:'left'}}>{reply.time}</span>
                                <span onClick={this.addFavour.bind(this,reply._id)}>赞({reply.favour})</span>&nbsp;&nbsp;&nbsp;
                                <span onClick={this.showSubReplyForm.bind(this,reply._id)}>回复</span>&nbsp;
                            </p>
                            <div id={reply._id} style={{display:'none'}}>
                                <textarea rows="3" cols="100" placeholder={'回复'+reply.from_uid}></textarea>
                                <Button style={{align:'right'}} type="primary" onClick={this.submitComment.bind(this,reply.from_uid,reply._id)}>回复</Button>
                                <label style={{display:'none',color:'red',fontSize:'1rem'}}>请输入评论内容</label>
                            </div>
                            <hr color="lightgreen"/>
                        </div>)
                    })}
                    <div id={this.props._id} style={{display:'none',marginLeft:'4rem'}}>
                        <textarea rows="3" cols="100" placeholder={'回复'+this.props.from_uid}></textarea>
                        <Button style={{align:'right'}} type="primary" onClick={this.submitComment.bind(this,this.props.from_uid,this.props._id)}>回复</Button>
                        <label style={{display:'none',color:'red',fontSize:'1rem'}}>请输入评论内容</label>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('signalcomment state: ',state);
    return {
        id:state.id,
        nickname:state.nickname,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendData:(data) => dispatch({type:'SENDDATA',data}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignalComment);