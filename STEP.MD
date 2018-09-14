## 热加载 [https://www.jianshu.com/p/243b7bc47bab]

# antd

安装 babel-plugin-import
在 package.json 中 plugins 添加 ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]

修改如下：
`"babel": { "presets": [ "react-app" ], "plugins": [ "react-hot-loader/babel", [ "import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" } ] ] }`

## less 配置 [https://segmentfault.com/a/1190000010162614]

## 菜单优化
