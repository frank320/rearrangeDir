/**
 * Created by frank on 2017/8/4.
 * 文件名称修改工具 use:  node renameForTianjin dirSrc
 */

(function () {
  const fs = require('fs')
  const path = require('path')

  const args = process.argv.splice(2)
  const original = args[0] //源目录

  const bundles = [
    {
      "name": "故事枕头",
      "id": "TXJY1502354314000"
    },
    {
      "name": "麦杰克动动手",
      "id": "TXJY1502354387000"
    },
    {
      "name": "麦杰克儿歌",
      "id": "TXJY1502354455000"
    },
    {
      "name": "麦杰克小镇",
      "id": "TXJY1502354518000"
    },
    {
      "name": "米拉小姐",
      "id": "TXJY1502354609000"
    },
    {
      "name": "色拉英语",
      "id": "TXJY1502354669000"
    },
    {
      "name": "雨果带你看世界",
      "id": "TXJY1502354716000"
    }
  ];
  if (!fs.existsSync(original)) {
    console.log('剧集目录路径错误,请检查')
    return
  }

  function isImg(fileName) {
    return /\.(jpg|png|gif|jepg)$/i.test(fileName)
  }

  const dirs = fs.readdirSync(original) //获取目标目录所有文件名
  const bundleName = /\\([^\\]+)$/.exec(original)[1]

  const bundleObj = bundles.find(bundle => bundle.name === bundleName)
  if (!bundleObj) {
    console.log(`${bundleName}id值不存在`)
    return
  }
  //创建一个剧集文件夹
  const bundleDir = path.join(original, bundleObj.id)
  if (!fs.existsSync(bundleDir)) {
    fs.mkdirSync(bundleDir)
  }

  function isDir(pathName) {//pathName为文件的绝对路径
    const stat = fs.lstatSync(pathName)
    return stat.isDirectory()
  }


  for (let dir of dirs) {
    if (!isDir(path.join(original, dir))){
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
  console.log('文件重命名完毕')


})()