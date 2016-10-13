/**
 * Created by arShown on 2016/7/15.
 * Updated on 2016/10/6
 */
"use strict";

const path = require('path');
const fs = require("fs");

module.exports = {
    installContent: [],
    run: function () {
        const dirs = fs.readdirSync(path.resolve(__dirname, 'app/dist/Containers/'));
        for (let i in dirs) {
            let dirPath = path.resolve(__dirname, 'app/dist/Containers/' + dirs[i]);
            if (!fs.statSync(dirPath).isDirectory()) {
                continue;
            }
            if (!fs.existsSync(dirPath + "/Config.js")) {
                continue;
            }
            this.installContent.push("require('./" + dirs[i] + "/Config')");
        }
        fs.writeFile(path.resolve(__dirname, 'app/dist/Containers/install.js'),
            "export default [" + this.installContent + "]",
            function (err) {
                if (err) {
                    console.log("[fs]", "install.js 檔案寫入失敗！");
                    return false;
                }
            }
        );
    }
};

