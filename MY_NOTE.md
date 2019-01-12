git commit --no-verify -m 

代码提交

跳过浏览器下载
env PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm i puppeteer -D #跳过浏览器下载来编译

构建：
npm run build
[https://landing.ant.design/docs/edit/edit-block-cn](https://landing.ant.design/docs/edit/edit-block-cn)


├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.js            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json


启用代理，禁用mock[https://my.oschina.net/yangbajing/blog/2239751](https://my.oschina.net/yangbajing/blog/2239751)
/Users/easin/todolist/pc/todolist/config/config.js


使用mock
npm run start
禁用mock
npm run start:no-mock

测试数据：
http://localhost:8000/api/task/page
返回正常数据说明OK

mock和真实服务器共存，交替使用：
1.方法名不一样，开启代理的模式可直接到代理
2.通常来讲只要 mock 的接口和真实的服务端接口保持一致，那么只需要重定向 mock 到对应的服务端接口即可。

// .roadhogrc.mock.js
export default {
  'GET /api/(.*)': 'https://your.server.com/api/',
};
这样你浏览器里这样的接口 http://localhost:8001/api/applications 会被反向代理到 https://your.server.com/api/applications 下。


const body = new FormData();
    body.append('start',start);
    body.append('limit', limit);
    return request.post('news/menu/query', { body });


https://pro.ant.design/docs/server-cn
在 Ant Design Pro 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

UI 组件交互操作；

调用 model 的 effect；

调用统一管理的 service 请求函数；

使用封装的 request.js 发送请求；

获取服务端返回；

然后调用 reducer 改变 state；

更新 model。

从上面的流程可以看出，为了方便管理维护，统一的请求处理都放在 services 文件夹中，并且一般按照 model 维度进行拆分文件

ui ->model/effect->service.func->request->http->model.reducer->UI.state


