/**
 * Created by Administrator on 2017/5/9 0009.
 */
/**
 * Created by Administrator on 2017/5/4 0004.
 */
import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "./header.less";
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            nickname: "",
        };
    }

    componentDidMount(){
        console.log('header componentDidMount: ',this.state.nickname);
        this.setState({nickname:this.props.nickname});
    }

    render() {
        this.state.nickname = this.props.nickname;
        return (
            <div>
                <div className="blogName">博客家园</div>
                <div className="userInfo">
                    {
                        this.state.nickname==="" ? <span>您还未登录，请<Link
                            to="/user/login">登录</Link></span> :
                            <span>
                                <span>你好，{this.state.nickname}</span>&nbsp;&nbsp;
                                <span style=
                                          {{textDecoration:"underline",cursor:"pointer",color:"red"}} onClick={this.props.logout}>
                                    退出
                                </span>
                            </span>
                    }
                </div>
            </div>
        )
        // if(this.state.nickname===""){
        //     return (
        //         <div>
        //             <div className="blogName">博客家园</div>
        //             <div className="userInfo">
        //                 <span>您还未登录，请<Link to="/user/login">登录</Link></span>
        //             </div>
        //
        //         </div>
        //     )
        // }else{
        //     return (
        //         <div>
        //             <div className="blogName">博客家园</div>
        //             <div className="userInfo">
        //                 <span>你好，{this.state.nickname}</span>&nbsp;&nbsp;
        //                 <span style={{textDecoration:"underline",cursor:"pointer",color:"red"}} onClick={this.props.logout}>
        //                     退出
        //                 </span>
        //             </div>
        //         </div>
        //
        //     )
        // }

    }
}

//export default WrappedRegistrationForm;

function mapStateToProps(state) {
    console.log('header mapstatetoprops: ',state);
    return {
        nickname:state.nickname,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout:() => dispatch({type:'LOGOUT'}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);