/**
 * Created by frank on
 * 生成excel表格
 */

const fs = require("fs")
const path = require('path')
const ejsExcel = require("ejsexcel")

const config = require('./config')
const Bundle = require('./bundle')


  ;
(function () {
  const checkList = []
  Bundle
    .find({
      id: {$in: checkList}
    })
    .then(data=> {
      //获得Excel模板的buffer对象
      try {
        var exlBuf = fs.readFileSync(path.join(__dirname, './template/excel_template.xlsx'))
      } catch (e) {
        console.log(e)
        return
      }
      //用数据源(对象)data渲染Excel模板
      ejsExcel.renderExcelCb(exlBuf, data, function (err, exlBuf2) {
        if (err) {
          //
          console.log(err)
          return
        }
        var newExcelName = "daoExcel.xlsx"
        try {
          fs.writeFileSync(path.join(__dirname, './template', newExcelName), exlBuf2)
        } catch (e) {
          console.log(e)
          return
        }
        console.log('生成表格成功')
      })
    })
    .catch((e)=> {
      console.log(e)
    })


})()
