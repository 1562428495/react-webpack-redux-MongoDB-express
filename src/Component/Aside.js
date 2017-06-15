import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Switch } from 'antd';
import 'antd/dist/antd.less';  // or 'antd/dist/antd.less'
const SubMenu = Menu.SubMenu;

export default class Aside extends React.Component {
    constructor(){
        super();
        this.state = {
            theme:'light',
            current: '1',
            openKeys: [],
        }
    }

    handleClick(e){
        console.log('Clicked: ', e);
        this.setState({ current: e.key });
    }
    onOpenChange(openKeys){
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }
    getAncestorKeys(key){
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }

    changeTheme(checked){
        this.setState({
            theme: checked ? 'dark' : 'light',
        });
    }

    render() {
        let data=11;
        return (
        <div>
            <Switch defaultChecked={false} onChange={this.changeTheme.bind(this)} checkedChildren={"dark"} unCheckedChildren={"light"}/>

            <Menu mode="inline" theme={this.state.theme} defaultSelectedKeys="1" className="menu">
                <SubMenu key="user" title={<span><Icon type="mail"/><span>用户登录</span></span>}>
                    <Menu.Item key="signup">
                        <Link to="/user/signup">
                            注册
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="login">
                        <Link to="/user/login">
                            登录
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="blog" title={<span><Icon type="calendar"/><span>我的博客</span></span>}>
                    <Menu.Item key="publish">
                        <Link to="/blog/publish">
                            发表
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="myblogs">
                        <Link to="/blog/myblogs">
                            我的博文
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="allblogs">
                        <Link to="/blog/allblogs">
                            所有博文
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
        );
    }
}