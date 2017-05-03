/**
 * Created by admin on 2017/5/3.
 */
var mysql = require('mysql');
module.exports = function(data,req,res){
    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'lsc666666',
        database:'liscdb'
    });
    connection.connect();
    var  sql = 'SELECT * FROM userinfo';
    var addSql = 'INSERT INTO userinfo(name,email,password) VALUES (?,?,?)';
    var arr = [];
    connection.query(sql,function(err,result) {
        if (err) {
            return;
        }
        for (var i = 0; i < result.length; i++) {
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
