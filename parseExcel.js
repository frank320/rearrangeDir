(function () {
  const fs = require('fs')
  const path = require('path')
  const xlsx = require('node-xlsx').default

  const args = process.argv.splice(2)
  const originalDir = args[0] //待处理文件夹目录


  function isDir(pathName) {//pathName为文件的绝对路径
    const stat = fs.lstatSync(pathName)
    return stat.isDirectory()
  }

  if (!fs.existsSync(originalDir)) {
    console.log('文件目录路径错误,请检查')
    return
  }

  //读取表格中的文件名
  const workSheetsFromFile = xlsx.parse(`${__dirname}/zhudouBundle.xlsx`)
  const dataArr = workSheetsFromFile[0].data.slice(1, 395)

  //读取文件夹目录下的文件
  const files = fs.readdirSync(originalDir)

  //处理表格数据
  const data = []
  let bundleName = null
  for (let item of dataArr) {
    if (item[1]) {
      bundleName = item[1]
      data.push([bundleName, item[2], item[4]])
    } else {
      data.push([bundleName, item[2], item[4]])
    }
  }

  //文件重命名
  for (let file of files) {
    //跳过文件夹
    if (isDir(path.join(originalDir, file))) {
      continue
    }
    const fileName = file.split('.')[0]

    for (let item of data) {
      if (item[2] == fileName) {
        //创建一个剧集文件夹
        const bundlePath = path.join(originalDir, item[0])
        if (!fs.existsSync(bundlePath)) {
          fs.mkdirSync(bundlePath)
        }
        //创建一个视频文件夹
        const vDirPath = path.join(bundlePath, item[1] + '')
        if (!fs.existsSync(vDirPath)) {
          fs.mkdirSync(vDirPath)
        }
        //移动文件
        fs.renameSync(path.join(originalDir, file), path.join(vDirPath, file))
        break
      }
    }
  }

  console.log('分类完成')
  //文件重命名
  // for (let [index, item] of dataArr.entries()) {
  //   if (item[1].startsWith('Y')) {
  //     for (let i = index + 1; i < dataArr.length; i++) {
  //       if (item[0] == dataArr[i][0] && item[1] != dataArr[i][1]) {
  //         console.log(`${item[0]}:${item[1]}`)
  //         break
  //       }
  //     }
  //   }
  //
  // }


})()

