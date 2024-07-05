# Getting Started with "Moha React"

This project was created through `npx create-react-app react-moha`. _npx is a package runner tool that comes with npm._

### Output:

```
Need to install the following packages:
create-react-app@5.0.1
Ok to proceed? (y)

npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated fstream@1.0.12: This package is no longer supported.
npm warn deprecated uid-number@0.0.6: This package is no longer supported.
npm warn deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.
npm warn deprecated fstream-ignore@1.0.5: This package is no longer supported.

Creating a new React app in ./react-moha.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template...


added 1482 packages in 12m

262 packages are looking for funding
  run `npm fund` for details

Installing template dependencies using npm...

added 64 packages, and changed 1 package in 23s

262 packages are looking for funding
  run `npm fund` for details
Removing template package using npm...


removed 1 package, and audited 1546 packages in 7s

262 packages are looking for funding
  run `npm fund` for details

8 vulnerabilities (2 moderate, 6 high)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

Success! Created react-moha at ./react-moha
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd react-moha
  npm start

Happy hacking!
```

### References:

- [Create React App](https://github.com/facebook/create-react-app)
- https://github.com/facebook/create-react-app/blob/main/CHANGELOG.md
- [React Framework Changelog](https://github.com/facebook/react/blob/main/CHANGELOG.md)

## 常用信息

### 常用命令

| 命令                               | 作用                    |
|----------------------------------|-----------------------|
| npm install react-scripts@latest | 升级应用                  |
| npm start                        | 开发模式启动应用，更新代码实时反馈到浏览器 |
| npm run build                    | 生产环境用文件生成             |
| npm test                         |                       |

### 常用目录与文件

| 位置             | 作用                                 |
|----------------|------------------------------------|
| ./src          | 需要打包成 package 的 js/css/images/etc. |
| ./src/index.js | 程序入口                               |
| ./src/*.css    | 被同级同名 js 文件 import                 |

### 创建 React 应用

| 命令                                                     | 作用            |
|--------------------------------------------------------|---------------|
| npx create-react-app NAME_OF_APP --template typescript |               |
| npx create-react-app NAME_OF_APP --template rb         | Redux, ESLint |
|                                                        |               |

### 参考

- [Update create-react-app](https://github.com/facebook/create-react-app/blob/main/CHANGELOG.md)

## 程序说明

|                        |   |
|------------------------|---|
| components/Showcase.js |   |
|                        |   |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't
customize it when you are ready for it.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved
here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved
here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved
here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved
here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved
here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved
here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
