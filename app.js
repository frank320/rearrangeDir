/**
 * Created by frank on 2017/8/4.
 * 文件目录整理工具 use:  node app.js 剧集文件夹绝对路径
 */

(function () {
  const fs = require('fs')
  const path = require('path')

  //const Bundle = require('./bundle')

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

  let bundleData = {}
  let videos = []
  const bundleName = /\\([^\\]+)$/.exec(original)[1]

  function isDir(pathName) {//pathName为文件的绝对路径
    const stat = fs.lstatSync(pathName)
    return stat.isDirectory()
  }

  files.forEach(function (file, index) {
    if (isImg(file)) {
      console.log(`${file} 是图片文件`)
      return
    }
    if (isDir(path.join(original, file))) {
      //跳过文件夹
      return
    }
    const filename = /(.+)\.(\w+)$/.exec(file)[1] //获取无后缀文件名
    const extname = /(.+)\.(\w+)$/.exec(file)[2]//文件后缀名

    //const dir = /^(\d+)([^\d]+)/.exec(filename)[1]
    //const name = /^(\d+)([^\d]+)/.exec(filename)[2]

    //const fileArr = filename.split(' ')
    //const dir = fileArr[0].startsWith('0') ? fileArr[0].slice(1) : fileArr[0]
    //const name = fileArr[1]

    //const dir = /^(\d+)\s*([^\d]+)/.exec(filename.split('+')[0])[1]
    //const name = /^(\d+)\s*([^\d]+)/.exec(filename.split('+')[0])[2]

    //const dir = /^(\d+)\s*([^\d]+)/.exec(filename)[1].startsWith('0')?/^(\d+)\s*([^\d]+)/.exec(filename)[1].slice(1):/^(\d+)\s*([^\d]+)/.exec(filename)[1]
    //const name = /^(\d+)\s*([^\d]+)/.exec(filename)[2]

    //const dir = filename.slice(4)
    //const name = `第${dir}集`

    const dir = filename.slice(2).startsWith('0') ? filename.slice(2).slice(1) : filename.slice(2)
    const name = `第${dir}集`

    //创建一个文件夹
    const fileDir = path.join(original, dir)
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir)
    }
    // 改变当前文件的路径(重命名)
    fs.renameSync(path.join(original, file), path.join(fileDir, `${name}.${extname}`))
    //videos.push({
    //  index: dir,
    //  name: name
    //})
  })
  console.log('文件处理完毕')
  ////排序
  //videos.sort(function (a, b) {
  //  return (a.index - b.index)
  //})
  ////存入数据库
  //const bundle = new Bundle(Object.assign(bundleData, {
  //  bundleName, videos
  //}))
  //
  //bundle
  //  .save()
  //  .then(()=> {
  //    console.log('剧集存入数据库成功')
  //  })
  //  .catch(err => {
  //    console.log('剧集存入数据库出错:', err)
  //  })

})()