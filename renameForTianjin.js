/**
 * Created by frank on 2017/8/4.
 * 文件名称修改工具 use:  node renameForTianjin dirSrc
 */

(function () {
  const fs = require('fs')
  const path = require('path')

  const args = process.argv.splice(2)
  const wrapDir = args[0] //源目录

  const bundles = [
    {
      "name": "别碰我的小火车",
      "id": "TXJY1511147109000"
    },
    {
      "name": "饼干变变变",
      "id": "TXJY1511147203000"
    },
    {
      "name": "不可以乱涂乱画",
      "id": "TXJY1511147273000"
    },
    {
      "name": "尝一尝，这是什么味道",
      "id": "TXJY1511147513000"
    },
    {
      "name": "超级竹兜",
      "id": "TXJY1511147559000"
    },
    {
      "name": "大声说你好",
      "id": "TXJY1511147614000"
    },
    {
      "name": "电子绘本",
      "id": "TXJY1511147957000"
    },
    {
      "name": "耳朵里的龙卷风",
      "id": "TXJY1511148047000"
    },
    {
      "name": "该起床啦",
      "id": "TXJY1511148215000"
    },
    {
      "name": "该睡觉啦",
      "id": "TXJY1511148328000"
    },
    {
      "name": "和臭臭说拜拜",
      "id": "TXJY1511148379000"
    },
    {
      "name": "和妈妈读书真快乐",
      "id": "TXJY1511148423000"
    },
    {
      "name": "嘿，小石头",
      "id": "TXJY1511148486000"
    },
    {
      "name": "欢乐恰恰恰",
      "id": "TXJY1511148593000"
    },
    {
      "name": "脸的秘密",
      "id": "TXJY1511148645000"
    },
    {
      "name": "妈妈出门我不哭",
      "id": "TXJY1511148893000"
    },
    {
      "name": "妈妈带我学走路",
      "id": "TXJY1511149007000"
    },
    {
      "name": "美味糖果屋",
      "id": "TXJY1511149059000"
    },
    {
      "name": "萌宝口才秀",
      "id": "TXJY1511149264000"
    },
    {
      "name": "男孩和女孩",
      "id": "TXJY1511149306000"
    },
    {
      "name": "你真棒",
      "id": "TXJY1511149347000"
    },
    {
      "name": "排排队",
      "id": "TXJY1511149413000"
    },
    {
      "name": "请你像我这样做",
      "id": "TXJY1511149451000"
    },
    {
      "name": "趣味运动会",
      "id": "TXJY1511149491000"
    },
    {
      "name": "热闹的美术课",
      "id": "TXJY1511149535000"
    },
    {
      "name": "森林交响乐",
      "id": "TXJY1511149578000"
    },
    {
      "name": "谁扔的最远",
      "id": "TXJY1511149619000"
    },
    {
      "name": "我的一家",
      "id": "TXJY1511149668000"
    },
    {
      "name": "我会关心妈妈",
      "id": "TXJY1511149711000"
    },
    {
      "name": "我绝对不跟陌生人走",
      "id": "TXJY1511149757000"
    },
    {
      "name": "小拖车，真能干",
      "id": "TXJY1511149811000"
    },
    {
      "name": "一二三、木头人",
      "id": "TXJY1511149856000"
    },
    {
      "name": "音乐会，我来啦",
      "id": "TXJY1511149901000"
    },
    {
      "name": "音乐寻宝探险记",
      "id": "TXJY1511149941000"
    },
    {
      "name": "种子不见了",
      "id": "TXJY1511149979000"
    },
    {
      "name": "竹兜，危险",
      "id": "TXJY1511150019000"
    },
    {
      "name": "竹兜生气啦",
      "id": "TXJY1511150068000"
    },
    {
      "name": "竹兜艺术课堂",
      "id": "TXJY1511150112000"
    },
    {
      "name": "竹兜育儿",
      "id": "TXJY1511150188000"
    }
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