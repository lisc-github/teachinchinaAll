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
                req.session.info = '注册成功，请登陆';
                res.redirect('login');
            })
        }
        else{
            req.session.info = '用户名已存在';
            res.redirect('sign');
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
            req.session.info = '用户名不存在';
            res.redirect('login');
        }
        else{
            var index = arr.indexOf(data[0]);
            if(data[1] !== result[index].password){
                req.session.info = '密码错误';
                res.redirect('login');
            }
            else if(data[2].toUpperCase() !== req.session.code){
                req.session.info = '验证码错误';
                res.redirect('login');
            }
            else{
                req.session.user_name = data[0];
                res.redirect('form');
            }
        }

    });

};
obj.changeData = function(data,req,res){
    var arr = [];
    connection.query(sql,function(err,result){
        if(err){
            return;
        }
        for(var i=0;i<result.length;i++){
            arr.push(result[i].email);
        }
        if(arr.indexOf(data[0])===-1){
            req.session.info = '邮箱不存在';
            res.redirect('reset_password');
        }
        else if(data[1]!=="123") {
            req.session.info = '邮箱验证码错误';
            res.redirect('reset_password');
        }
        else{
            var id = arr.indexOf(data[0])+1;
            var modSql = 'UPDATE userinfo SET password= ? WHERE Id = ?';
            var modSqlParams = [data[2],id];
            connection.query(modSql,modSqlParams,function (err, result) {
                if(err){
                    console.log('[UPDATE ERROR] - ',err.message);
                    return;
                }
                req.session.info = '密码已修改';
                res.redirect("login");
            });
        }

    });

};
obj.formData = function(data,req,res){
    var  sql = 'SELECT * FROM userform';
    var addSql = 'INSERT INTO userform(firstname,middlename,lastname,nickname,birthday,' +
        'birthmonth,birthyear,gender,email,address,city,state,country,postalcode,mobilephone,' +
        'homephone1,homephone2,major,degree,programChoice,schoolChoice,userName) ' +
        'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var arr = [];
    for(var i in data){
        arr.push(data[i]);
    }
    arr.push(req.session.user_name);
    connection.query(addSql,arr,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        addMark(req.session.user_name);
        res.render('form',{user_name:req.session.user_name,alert:"<script>alert('Submit successfully')</script>"});
    })
};
function addMark(userName){
    var updateData = "UPDATE userinfo SET form=? WHERE name=?";
    var updatePrams = ['yes',userName];
    connection.query(updateData,updatePrams,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        console.log('修改成功');
    })
}
obj.getUserData = function(req,res){
    connection.query(sql,function(err,result){
        if(err){
            return;
        }
        res.send(result);
    })
};
obj.getFormData = function(req,res){
    var post = '';
    for(var i in req.body){
        post = i;
    }
    console.log(post);
    var sql = 'SELECT * FROM userform WHERE userName= ? ';
    var sqlParams = [post];
    connection.query(sql,sqlParams,function(err,result){
        if(err){
            console.log(err.stack);
            return;
        }
        console.log(result);
        res.send(result);
    })
};



module.exports = obj;
