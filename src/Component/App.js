/**
 * Created by Administrator on 2017/5/3 0003.
 */
import React from "react";
import {connect} from 'react-redux';
import { Layout, Menu, Breadcrumb, Affix, Icon } from 'antd';
import {BrowserRouter as Router,Route, Link,hashHistory} from "react-router-dom";
import Signup from './user/signup';
import Login from './user/login';
import Publish from './blog/publish';
import MyBlogs from './blog/myblogs';
import AllBlogs from './blog/AllBlogs';
import MyBlog from './blog/myblog';
import "./app.less";
import Aside from "./Aside";
import HeaderComponent from "./Header";
const { Header, Content, Sider, Footer } = Layout;

import About from './About';
import Repos from './Repos';

class App extends React.Component{

    render(){
        const {value,onIncrement,onDecrement} = this.props;
        let v=0;
        return (
            <Layout className="wrapper">
                <Header className="header"><HeaderComponent /></Header>
                <Layout className="main">
                    <Sider className="sider">
                        <Aside/>
                    </Sider>
                    <Content className="content">
                        <Route path="/user/signup" component={Signup} />
                        <Route path="/user/login" component={Login} />
                        <Route path="/blog/publish" component={Publish} />
                        <Route path="/blog/update/:id" component={Publish} />
                        <Route path="/blog/myblogs" component={MyBlogs} />
                        <Route path="/blog/getblog/:id" component={MyBlog} />
                        <Route path="/blog/allblogs" component={AllBlogs} />
                    </Content>
                </Layout>
                <Footer className="footer">Footer</Footer>
            </Layout>
        );
    };
}

function mapStateToProps(state) {
    console.log('app mapStateToProps: ',state);
    return {
     //   value:state.value,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);