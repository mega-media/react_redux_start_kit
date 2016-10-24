# react_redux_start_kit

專案開發框架與其環境設定，包含基礎程式範例。

## 設計核心       

- 多人多工開發模式：    
模組化程式，開發者僅需維護自己負責的 Container

- 簡化的配置：    
定義設定檔(Config.js)快速定義 Reducer 與 Router

## 開始使用

### 下載專案

````
git clone git@github.com:mega-media/react_redux_start_kit.git
````

### 安裝
````
cd react_redux_start_kit
npm run install
````

### 執行
````
npm start
````

開啟你常用的瀏覽器，並前往 http://127.0.0.1:8888 即可看到執行成果
> `npm run start`預設執行的模式為develop，假如port 8888已被使用，可至`./config/config.dev.json`變更


### production 版本
````
npm run release
````
將專案壓縮、編碼並移除註解與console

