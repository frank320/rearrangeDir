/**
 * Created by frank on 2017/8/4.
 * 文件名称修改工具 use:  node fileRename dirSrc
 */

(function () {
  const fs = require('fs')
  const path = require('path')
  const ejsExcel = require("ejsexcel")

  const args = process.argv.splice(2)
  const original = args[0] //源目录

  if (!fs.existsSync(original)) {
    console.log('剧集目录路径错误,请检查')
    return
  }

  function isImg(fileName) {
    return /\.(jpg|png|gif|jepg)$/i.test(fileName)
  }

  const files = fs.readdirSync(original) //获取目标目录所有文件名

  function isDir(pathName) {//pathName为文件的绝对路径
    const stat = fs.lstatSync(pathName)
    return stat.isDirectory()
  }


  for (let file of files) {
    if (!/集$/.test(file)) {
      continue
    }
    const newName = `${file}.ts`
    // 改变当前文件的路径(重命名)
    fs.renameSync(path.join(original, file), path.join(original, newName))


  }
  console.log('文件重命名完毕')

})()