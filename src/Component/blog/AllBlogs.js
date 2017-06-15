/**
 * Created by Administrator on 2017/5/4 0004.
 */
import React from "react";
import {connect} from "react-redux";
import {Link, browserHistory} from 'react-router-dom';
const $ = require('jquery');
import AllComments from './AllComments';
import AddComment from './AddComment';
import EventEmitter from 'events';

var emitter = new EventEmitter;

class AllBlogs extends React.Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            data:[],
        }
    }

    componentWillMount(){
        $.ajax({
            url:'/getAllBlogs',
            type: 'GET',
            dataType:'json',
            success:(data)=>{
                console.log('Get allblogs sucessful');
                this.setState({data:data});
                console.log('allblogs: ',this.state.data);
            },
            error:(err)=>{
                console.log('Get allblogs failed');
                console.log(err);
            }
        });
    }

    removeBlog(id){
        $.ajax({
            url:'/removeBlogById/'+id,
            type: 'post',
            dataType:'json',
            success:(data)=>{
                console.log('Remove blog sucessful');
                var data = this.state.data;
                for(var i=0;i<data.length;i++){
                    if(data[i]._id===id){
                        data.splice(i,1);
                        this.setState({data:data});
                        break;
                    }
                }
                // const path = "/blog/myblogs";
                // this.props.history.push(path);
            },
            error:(err)=>{
                console.log('Remove blog failed');
                console.log(err);
            }
        });
    }

    render() {

        const data = this.state.data;
        console.log('allblogs: ',data);
        return (
            <div>
                {data.map(item=>{
                    return (
                        <div style={{margin:'1rem',padding:'1rem'}}>
                            <p>
                                <Link to={'/blog/getblog/'+item._id} style={{fontSize:'50px',fontWeight:'bold'}}>
                                    <span onClick={() => this.props.sendId(item._id)}>{item.theme}</span>
                                </Link>
                            </p>
                            <p>分类：{item.category}&nbsp;&nbsp;标签：{item.tags}&nbsp;&nbsp;浏览量：{item.scanNumber}
                                &nbsp;&nbsp;评论数：{item.commentNumber}</p>
                            <div>{item.content.length>100?item.content.substr(0,100)+'...':item.content}</div>
                        </div>
                    )

                })}
            </div>
        );
    }
}

AllBlogs.contextTypes = {router:()=> React.PropTypes.func.isRequired };

function mapStateToProps(state) {
    console.log('myblogs mapStateToProps: ',state);
    return {
        nickname:state.nickname,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendData:(data) => dispatch({type:'SENDDATA',data}),
        sendId:(id) => dispatch({type:'SENDID',id}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllBlogs);