# 搭建开发环境

## 使用Docker容器开发环境

#### 见菜鸟教程

## vite创建项目

### 目录下文件代表意义

#### package.json文件配置设置

- 把所有的`^`括号去除，`^`在npm中代表自动做版本的向上兼容，在npm中一个小小的版本变动都可能导致项目无法运行
- 而删除了^括号后，有一些版本不匹配的问题，可以安装 `npm Intellisense` 插件解决，vscode右上角的`V`可以查
  看版本匹配问题，点击了兼容lastest后可以保持版本最新，锁死所有的依赖版本号
- 后面安装的库可能会有`^`括号的问题，可以使用`npm config set save-prefix=""`，运行后下次安装任何库不加`^`


#### tsconfig.json

- 基本不动

#### tsconfig.node.json

- 基本不动

#### vite.config.ts

- 类似于`webpack.config.js`

### 部署到github

#### 使用gitbash部署到github
- git上建立仓库，关联本地的工作区
- `git remote add origin <yourgithubresipostoryname>`
- `git add .` `git commit -m "mangosten"` `git push origin master`
- 可以使用linux命令设置自动部署

### 如何创建snippet

- 使用`snippet generator`网站进行配置

### 使用Eslint规范代码

#### 使用`antfu/eslint-config`
- 见github搜索
- 建议不要使用`prettier`
- 可以在`.eslintrc`文件下新建`rules:{}`规则下通过vscode提示配置

## 路由
- `npm install react-router-dom`

### 初始化路由
- 见官网`react-router-dom`

### 配置404not found路由页面
- 见官网`react-router-dom`，`handle Not Found Errors`
- 