/**
 * Created by frank on 2017/8/4.
 * 定义存储媒资数据的数据库
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('./config')

const bundleSchema = new Schema({
  bundleName: {
    type: String,
    require: true
  },
  createdTime: {
    type: Number,
    require: true,
    default: Date.now()
  },
  videos: {
    type: Array,
    require: true,
    default: []
  }
})

//连接数据库
mongoose.Promise = global.Promise
const mongo1 = mongoose.createConnection(config.dbbase)
mongo1.once('open', (err)=> {
  if (err) {
    console.err(err)
  } else {
    console.log('mongodb connect successfully')
  }
})
mongo1.on('error', console.error.bind(console, 'connection error:'))

//mongoose.model('modelName', dataSchema, 'collectionName')
module.exports = mongo1.model('bundle', bundleSchema, 'bundle')


//获取已有集合的数据
//const bundleList = mongoose.Schema({
//  index: Object,
//  newHouse: Object,
//  oldHouse: Object,
//  newHomes: Object
//}, {collection: "bundles"})
//
//mongo1.model('bundle', bundleList).find({}).then(r=> {
//  console.log(r)
//})