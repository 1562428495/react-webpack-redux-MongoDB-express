/**
 * Created by Administrator on 2017/5/4 0004.
 */
// import {
//     COUNTER_INC,
//     COUNTER_DEC
// } from 'actions/counterActions';
'use strict';
const InitState = {
    nickname:"",
    articleData:{},
    id:'',
};

export default function reducer(state = InitState, action) {

    switch (action.type) {
        case 'SIGNUP':{
            return {
                ...state,
                nickname:action.formData.nickname,
            };
        }
        case 'LOGIN':{
            return {
                ...state,
                nickname:action.formData.nickname,
            };
        }
        case 'LOGOUT':{
            return InitState;
        }

        case 'BLOG_PUBLISH':{
            return {
                ...state,
                nickname:state.nickname,
                articleData:action.data,
                id:action.data._id,
            };
        }

        case 'SENDDATA':{
            return {
                ...state,
                nickname:state.nickname,
                articleData:articleData,
            };
        }

        case 'SENDID':{
            return {
                ...state,
                id:action.id,
                nickname:state.nickname,
            };
        }

        case 'ADDCOMMENT':{
            return {
                ...state,
                articleData:action.data,
            }
        }

        case 'REFRESHCOMMENT':{
            return {
                ...state,
                id:state.id,
                nickname:state.nickname,
            }
        }

        case 'REDUDANT':{
            return {
                ...state,
                id:state.id,
                nickname:state.nickname,
            }
        }

        default:{
            return state;
        }

    }

}