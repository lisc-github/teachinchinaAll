/**
 * Created by admin on 2017/5/2.
 */
var mysql = require('mysql');
var obj = {};
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'lsc666666',
    database:'liscdb'
});
connection.connect();
var  sql = 'SELECT * FROM userinfo';
var addSql = 'INSERT INTO userinfo(name,email,password) VALUES (?,?,?)';


obj.addData = function(data,req,res){
    var arr = [];
    connection.query(sql,function(err,result){
        if(err){
            return;
        }
        for(var i=0;i<result.length;i++){
            arr.push(result[i].name);
        }

        if(arr.indexOf(data[0])===-1){
            connection.query(addSql,data,function(err,result){
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    return;
                }
                console.log('插入数据成功');
                req.session.message = '注册成功，请登陆';
                res.redirect('login');
            })
        }
        else{
            res.render('sign',{message:'用户名已存在'});
        }
    });
};
obj.ajaxData = function(data,req,res){
    var arr = [];
    connection.query(sql,function(err,result){
        if(err){
            return;
        }
        for(var i=0;i<result.length;i++){
            arr.push(result[i].name);
        }
        if(data){
            if(arr.indexOf(data)===-1){
                res.send(false);
            }
            else{
                res.send(true);
            }
        }

    });

};

obj.queryData = function(data,req,res){
    var arr = [];
    connection.query(sql,function(err,result){
        if(err){
            return;
        }
        for(var i=0;i<result.length;i++){
            arr.push(result[i].name);
        }
        if(arr.indexOf(data[0])===-1){
            req.session.message = '用户名不存在';
            res.redirect('login');
        }
        else{
            var index = arr.indexOf(data[0]);
            console.log(data[1],result[index].password);
            if(data[1] === result[index].password){
                req.session.user_name = data[0];
                res.redirect('form');
            }
            else{
                req.session.message = '密码错误';
                res.redirect('login');
            }
        }

    });

};

module.exports = obj;
