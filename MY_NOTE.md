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

npm run start:no-mock

测试数据：
http://localhost:8000/api/task/page
返回正常数据说明OK