/**
 * Created by admin on 2017/5/2.
 */
var express = require('express');
var router = express.Router();
var mysqlData = require('../mysqlData');
var crypto = require('crypto');
function md5(text){
    return crypto.createHash('md5').update(text).digest('hex');
}

router.get('/',function(req,res){
    res.render('login');
});
router.post('/',function(req,res){
    //数据库查询数据
    mysqlData.queryData();
});
router.post('/sign',function(req,res){
    //数据库插入数据
    var arr = [];
    arr.push(req.body.s_username);
    arr.push(req.body.s_email);
    arr.push(md5(req.body.s_password));
    mysqlData.addData(arr,res);
});
router.post('/change',function(req,res){
    //数据库查询数据
    mysqlData.changeData();
});
module.exports = router;