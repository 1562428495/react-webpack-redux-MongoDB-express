/**
 * Created by Administrator on 2017/5/4 0004.
 */
import React from "react";
import {connect} from "react-redux";
import {browserHistory} from 'react-router';
import SignalComment from './SignalComment';
const $ = require('jquery');
import './myblog.css';

class AllComments extends React.Component {
    constructor(){
        super();
        this.state = {
            id:'',
            data:[],
        }
    }

    getCommentsById(){
        console.log('allcomments getCommentById : ',this.props.id);
        $.ajax({
            url:'/getCommentsById/'+this.props.id,
            type: 'GET',
            dataType:'json',
            success:(data)=>{
                console.log('Get comment sucessful');
                this.setState({data:data});
                console.log(this.state.data);
            },
            error:(err)=>{
                console.log('Get blog failed');
                console.log(err);
            }
        });
    }

    componentDidMount(){
        this.props.emitter.on('publish', () => {
            console.log('emitter000000000000000000000000000000000000000');
            setTimeout(()=>{
                this.getCommentsById();
            },100);

        });
        this.getCommentsById();
    }

    render() {
        const data = this.state.data;
        if(data.length===0){
            return (
                <div style={{border:"solid lightblue 1px"}}>
                    <p style={{background:'lightblue'}}>查看评论</p>
                    <p style={{textAlign:'center',padding:'2rem'}}>暂无任何评论</p>
                </div>
            );
        }else{
            return (
                <div style={{border:"solid lightblue 1px"}}>
                    <p style={{background:'lightblue'}}>查看评论</p>
                    <div>
                        {data.map(comment=>(
                            <SignalComment {...comment}/>
                        ))}
                    </div>

                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    console.log('allcomment mapStateToProps: ',state);
    return {
        id:state.id,
        nickname:state.nickname,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    //    sendData:(data) => dispatch({type:'SENDDATA',data}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllComments);