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
    res.render('index');
});
router.route('/login')
    .get(function(req,res){
        console.log(req.session.message);
        res.render('login',{message:req.session.message});
        req.session.message = '';
    })
    .post(function(req,res){
        //数据库查询数据
        var arr = [];
        arr.push(req.body.l_username);
        arr.push(md5(req.body.l_password));
        mysqlData.queryData(arr,req,res);
    });
router.route('/sign')
    .get(function(req,res){
        res.render('sign',{message:""});
    })
    .post(function(req,res){
        //数据库插入数据
        var arr = [];
        arr.push(req.body.s_username);
        arr.push(req.body.s_email);
        arr.push(md5(req.body.s_password));
        mysqlData.addData(arr,req,res);
    });

router.route('/reset_password')
    .get(function(req,res){
        res.render('reset_password');
    })
    .post(function(req,res){
        res.redirect('reset_password');
    });

router.post('/ajax',function(req,res){
    //数据库查询数据
    var post = '';
    req.on('data',function(chuck){
        post += chuck;
    });
    req.on('end',function(){
        mysqlData.ajaxData(post,req,res);
    });
});
router.get('/form',function(req,res){
    if(req.session.user_name){
        res.render("form",{user_name:req.session.user_name});
    }
    else{
        res.redirect('login');
    }
});



module.exports = router;