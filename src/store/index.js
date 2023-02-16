import { createStore } from 'vuex'
const store = createStore({
    state: {
        userInfo: {
            nickName: "",
            avatar: "",
        }
    },
    mutations: {
        updateUserInfo (state, userInfo) {    // 只能接受两个参数，用于修改store存的值
            state.userInfo = userInfo;
        },
    },
    actions: {},
})
export default store