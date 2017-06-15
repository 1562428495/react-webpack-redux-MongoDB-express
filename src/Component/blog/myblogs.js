/**
 * Created by Administrator on 2017/5/4 0004.
 */
import React from "react";
import {connect} from "react-redux";
import {Link, browserHistory} from 'react-router-dom';
const $ = require('jquery');
import { Table, Popconfirm } from 'antd';

// {/*<Link to="/user/login">{text}</Link>*/}



class MyBlogs extends React.Component {
    constructor(props,context){
        super(props,context);
        console.log('myblogs constructor: ',this.props);
        this.state = {
            data:[],
        }
    }

    componentWillMount(){
        $.ajax({
            url:'/getMyBlogs/'+this.props.nickname,
            type: 'GET',
            dataType:'json',
            success:(data)=>{
                console.log('Get blogs sucessful');
                this.setState({data:data});
            },
            error:(err)=>{
                console.log('Get blogs failed');
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
        const blog='/blog/getblog/';
        const columns = [{
            title: '标题',
            dataIndex: 'theme',
            key: 'theme',
            width: 100,
            render:(text, record,index) => <Link to={blog+record._id} ><span onClick={() => this.props.sendId(record._id)}>{text}</span></Link>,
        }, {
            title: '种类',
            dataIndex: 'category',
            key: 'category',
            width: 70,
        }, {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            width: 150,
            render:(text, record,index) => text.map(item=>{return item+"  ";}),
        }, {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
            width: 500,
            render:(text, record, index) => {
                if(text && text.length){
                    console.log(text.length);
                    return text.substr(0,45)+'...';
                }else {
                    return text;
                }
            }
        }, {
            title: '操作',
            width:100,
            render: (text, record, index) => {
                //获取该行的id，可以获取的到，传到函数里的时候打印直接把整个表格所有行id全部打印了
                const id = record._id;
                return (
                    <div>
                        <Link to={'/blog/update/'+id}>
                            <span onClick={() => this.props.sendData(record)}>编辑</span>
                        </Link>&nbsp;|&nbsp;
                        <Popconfirm title="确定删除？" onConfirm={this.removeBlog.bind(this,id)}>
                            <a href="#">删除</a>
                        </Popconfirm>
                    </div>

                );
            }
        }];

        const state = this.state;
        return (
            <div>

                <Table showHeader={true} columns={columns} dataSource={state.data} />
            </div>
        );
    }
}

MyBlogs.contextTypes = {router:()=> React.PropTypes.func.isRequired };

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

export default connect(mapStateToProps,mapDispatchToProps)(MyBlogs);