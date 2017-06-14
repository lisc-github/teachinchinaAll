/**
 * Created by admin on 2017/5/2.
 */
var mysql = require('mysql');
var crypto = require('crypto');
function md5(text){
    return crypto.createHash('md5').update(text).digest('hex');
}
var obj = {};
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'lsc666666',
    database:'liscdb'
});
connection.connect();
connection.query("SET time_zone = '+8:00'")
var  sql = 'SELECT * FROM userinfo';
var addSql = 'INSERT INTO userinfo(date,name,email,password) VALUES (?,?,?,?)';


obj.addData = function(data,req,res){
    var arr = [];
    var arr1 = [];
    var emailCode = data.splice(3,1);
    var nowDate = new Date();
    var timeStr = nowDate.toLocaleDateString();
    data.splice(0,0,timeStr);
    connection.query(sql,function(err,result){
        if(err){
            return;
        }
        for(var i=0;i<result.length;i++){
            arr.push(result[i].name);
        }
        for(var j=0;j<result.length;j++){
            arr1.push(result[j].email);
        }
        if(arr.indexOf(data[1])!=-1){
            req.session.info = 'User name already exists';
            res.redirect('sign');
        }
        else if(arr1.indexOf(data[2])!=-1){
            req.session.info = 'The mailbox has been registered';
            res.redirect('sign');
        }
        else if(emailCode!= req.session.emailCode){
            req.session.info = 'Verify code error';
            res.redirect('sign');
        }
        else{
            connection.query(addSql,data,function(err,result){
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    return;
                }
                req.session.info = 'Registration successful, please login';
                res.redirect('login');
            })
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
            arr.push(result[i].email);
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
    var arrName = [];
    var arrEmail = [];
    connection.query(sql,function(err,result){
        if(err){
            return;
        }
        for(var i=0;i<result.length;i++){
            arrName.push(result[i].name);
            arrEmail.push(result[i].email);
        }
        if(arrName.indexOf(data[0])===-1 && arrEmail.indexOf(data[0])===-1){
            req.session.info = 'Users are not registered yet';
            res.redirect('login');
        }
        else {
            var index;
            if(arrName.indexOf(data[0])!=-1){
                index = arrName.indexOf(data[0]);
            }
            else{
                index = arrEmail.indexOf(data[0]);
            }
            if(data[1] !== result[index].password){
                req.session.info = 'Password error';
                res.redirect('login');
            }
            else if(data[2].toUpperCase() !== req.session.code){
                req.session.info = 'Verify code error';
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
    var emailCode = data.splice(2,1);
    connection.query(sql,function(err,result){
        if(err){
            return;
        }
        for(var i=0;i<result.length;i++){
            arr.push(result[i].email);
        }

        if(arr.indexOf(data[0])===-1){
            req.session.info = 'Mailbox does not exist';
            res.redirect('reset_password');
        }
        else if(emailCode!= req.session.emailCode){
            req.session.info = 'Verify code error';
            res.redirect('reset_password');
        }
        else{
            var modSql = 'UPDATE userinfo SET password= ? WHERE email = ?';
            var modSqlParams = [data[1],data[0]];
            connection.query(modSql,modSqlParams,function (err, result) {
                if(err){
                    console.log('[UPDATE ERROR] - ',err.message);
                    return;
                }
                req.session.info = 'Password has been modified';
                res.redirect("login");
            });
        }

    });

};
obj.formData = function(data,req,res){
    var  sql = 'SELECT * FROM applyform';
    var addSql;
    var arr = [];
    for(var i in data){
        arr.push(data[i]);
    }
    arr.push(req.session.user_name);
    if(arr.length==23){
	addSql = 'INSERT INTO applyform(firstname,middlename,lastname,nickname,birthday,birthmonth,birthyear,gender,email,address,city,state,country,postalcode,mobilephone,homephone1,homephone2,major,degree,otherDegree,programChoice,schoolChoice,username) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    }
    else{
	addSql = 'INSERT INTO applyform(firstname,middlename,lastname,nickname,birthday,birthmonth,birthyear,gender,email,address,city,state,country,postalcode,mobilephone,homephone1,homephone2,major,degree,programChoice,schoolChoice,username) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    }
    connection.query(addSql,arr,function(err,result){
        if(err){
            console.log('[INSERT ERROR1] - ',err.message);
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
    })
}
obj.getUserData = function(req,res){
    var sql;
    var post = '';
    var sqlParams;
    for(var i in req.body){
        post = i;
    }
    if(post=='formYes'){
        sql = "SELECT * FROM userinfo WHERE form='yes'";
    }
    else if(post=='formNo'){
        sql = "SELECT * FROM userinfo WHERE form=''";
    }
    else if(post==''){
        sql = "SELECT * FROM userinfo";
    }
    else{
        sql = "SELECT * FROM userinfo WHERE name = ?";
        sqlParams = [post];
    }

    connection.query(sql,sqlParams,function(err,result){
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
    var sql = 'SELECT * FROM applyform WHERE userName= ? ';
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
obj.addContactData = function(data,req,res){
    var addSql = 'INSERT INTO contact(date,firstname,lastname,email,phonenumber,interestarea,location,comments) VALUES (?,?,?,?,?,?,?,?)';
    var arr=[];
    for(var i in data){
        arr.push(data[i]);
    }
    var nowDate = new Date();
    var timeStr = nowDate.toLocaleDateString();
    arr.splice(0,0,timeStr);
    connection.query(addSql,arr,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.redirect('/');
    })
};

obj.addJobData = function(data,req,res){
    var addSql = 'INSERT INTO getjobinfo(date,email) VALUES (?,?)';
    var arr=[];
    arr.push(data.email);
    var nowDate = new Date();
    var timeStr = nowDate.toLocaleDateString();
    arr.splice(0,0,timeStr);
    connection.query(addSql,arr,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.redirect('/');
    })
};
obj.getContactData = function(req,res){

    var sql = 'SELECT * FROM contact';
    connection.query(sql,function(err,result){
        if(err){
            console.log(err.stack);
            return;
        }
        console.log(result);
        res.send(result);
    })
};
obj.getJobData = function(req,res){

    var sql = 'SELECT * FROM getjobinfo';
    connection.query(sql,function(err,result){
        if(err){
            console.log(err.stack);
            return;
        }
        console.log(result);
        res.send(result);
    })
};

//后台管理中心
obj.queryManageData = function(data,req,res){
    var sql = "SELECT * FROM admin";
    connection.query(sql,function(err,result){
        if(err){
            return;
        }
        if(data.name != result[0].name){
            req.session.info = "用户名错误";
            res.redirect('/manage');
        }
        else if(md5(data.password) != result[0].password){
            req.session.info = "密码错误";
            res.redirect('/manage');
        }
        else if(data.code.toUpperCase() != req.session.manageCode){
            req.session.info = "验证码错误";
            res.redirect('/manage');
        }
        else{
            req.session.manageUser = data.name;
            res.redirect('manage/user');
        }
    })
};

module.exports = obj;
