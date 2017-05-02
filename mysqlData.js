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

obj.addData = function(data,res){
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
                res.redirect('/temp');
            })
        }
        else{
            console.log('用户已存在');
            res.redirect('/login');

        }

    });
};
obj.queryData = function(data){
    var addSql = 'INSERT INTO userinfo(name,email,password) VALUES (?,?,?)';

};
obj.changeData = function(data){
    var addSql = 'INSERT INTO userinfo(name,email,password) VALUES (?,?,?)';

};




module.exports = obj;
