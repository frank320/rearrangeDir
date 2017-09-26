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

  const dirs = fs.readdirSync(original) //获取目标目录所有文件名
  let totalVideos = dirs.length
  const bundleName = /\\([^\\]+)$/.exec(original)[1]

  function isDir(pathName) {//pathName为文件的绝对路径
    const stat = fs.lstatSync(pathName)
    return stat.isDirectory()
  }


  for (let dir of dirs) {
    if (!isDir(path.join(original, dir))) {
      totalVideos--
      continue
    }
    const fileInDir = fs.readdirSync(path.join(original, dir))
    const filename = fileInDir[0]
    const newName = `${bundleName}第${dir}集.ts`
    // 改变当前文件的路径(重命名)
    fs.renameSync(path.join(original, dir, filename), path.join(original, newName))
    // fs.unlinkSync(filePath) 删除文件
    //删除文件夹
    fs.rmdirSync(path.join(original, dir))

  }
  console.log('文件重命名完毕')
  //获得Excel模板的buffer对象
  try {
    var exlBuf = fs.readFileSync(path.join(__dirname, './template/guizhouTemplate.xlsx'))
  } catch (e) {
    console.log(e)
    return
  }
  const data = {
    bundleName: bundleName,
    totalVideos: totalVideos,
    bundleId: '脆牛',
    copyStart: '2017-04-01',
    copyEnd: '2030-04-01'
  }
  //用数据源(对象)data渲染Excel模板
  ejsExcel.renderExcelCb(exlBuf, data, function (err, exlBuf2) {
    if (err) {
      //
      console.log(err)
      return
    }
    var excelName = `${bundleName}.xlsx`
    try {
      fs.writeFileSync(path.join(original, excelName), exlBuf2)
    } catch (e) {
      console.log(e)
      return
    }
    console.log('生成上载表格成功')
  })
})()