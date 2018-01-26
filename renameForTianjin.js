/**
 * Created by frank on 2017/8/4.
 * 文件名称修改工具 use:  node renameForTianjin.js dirSrc
 */

(function () {
  const fs = require('fs')
  const path = require('path')

  const args = process.argv.splice(2)
  const wrapDir = args[0] //源目录

  const bundles = [
    {
      "name": "阿u学科学",
      "id": "TXJY1516954919000"
    },
    {
      "name": "赛老师系列",
      "id": "TXJY1516955260000"
    },

  ];
  if (!fs.existsSync(wrapDir)) {
    console.log('剧集目录路径错误,请检查')
    return
  }

  function isImg(fileName) {
    return /\.(jpg|png|gif|jepg)$/i.test(fileName)
  }

  function isDir(pathName) {//pathName为文件的绝对路径
    const stat = fs.lstatSync(pathName)
    return stat.isDirectory()
  }

  const bundleDirs = fs.readdirSync(wrapDir)

  for (let bundle of bundleDirs) {

    const original = path.join(wrapDir, bundle)
    if (!isDir(original)) {
      console.log(`${bundle}不是剧集文件夹`)
      continue
    }
    const dirs = fs.readdirSync(original) //获取目标目录所有文件名
    const bundleName = /\\([^\\]+)$/.exec(original)[1]

    const bundleObj = bundles.find(bundle => bundle.name === bundleName)
    if (!bundleObj) {
      console.log(`${bundleName}id值不存在`)
      continue
    }
    //创建一个剧集文件夹
    const bundleDir = path.join(original, bundleObj.id)
    if (!fs.existsSync(bundleDir)) {
      fs.mkdirSync(bundleDir)
    }


    for (let dir of dirs) {
      if (!isDir(path.join(original, dir))) {
        console.log(`${dir}不是文件夹`)
        continue
      }
      const fileInDir = fs.readdirSync(path.join(original, dir))
      const filename = fileInDir[0]
      const singleVideoName = (1000 + parseInt(dir) + '').slice(1)
      // 改变当前文件的路径(重命名)
      fs.renameSync(path.join(original, dir, filename), path.join(bundleDir, `${singleVideoName}.ts`))
      // fs.unlinkSync(filePath) 删除文件
      //删除文件夹
      fs.rmdirSync(path.join(original, dir))

    }
  }

  console.log('文件重命名完毕')


})()