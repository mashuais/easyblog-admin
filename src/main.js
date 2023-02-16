import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/assets/icon/iconfont.css"
import VueCookies from 'vue-cookies'
import Request from '@/utils/Request';
import Message from '@/utils/Message'
import Confirm from '@/utils/Confirm'
import Verify from '@/utils/Verify'
import Table from '@/components/Table.vue'
import Cover from '@/components/Cover.vue'
import Dialog from '@/components/Dialog.vue'
import CoverUpload from '@/components/CoverUpload.vue'
import Window from '@/components/Window.vue'
import EditorMarkdown from '@/components/EditorMarkdown.vue'
import EditorHtml from '@/components/EditorHtml.vue'
const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.config.globalProperties.Request = Request;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Confirm = Confirm;
app.config.globalProperties.Verify = Verify;
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.globalInfo = {
    imageUrl: "/api/file/getImage/"
}
app.component("Table", Table);
app.component("Cover", Cover);
app.component("Dialog", Dialog);
app.component("CoverUpload", CoverUpload);
app.component("Window", Window);
app.component("EditorMarkdown", EditorMarkdown);
app.component("EditorHtml", EditorHtml);
app.mount('#app')
