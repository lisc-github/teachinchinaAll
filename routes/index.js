/**
 * Created by admin on 2017/5/2.
 */
var express = require('express');
var router = express.Router();
var mysqlData = require('../mysqlData');
var crypto = require('crypto');
var BMP24 = require('../BMP24');
var makeCapcha = require('../makeCode');
var sendEmail = require("../emailMain");
function md5(text){
    return crypto.createHash('md5').update(text).digest('hex');
}

router.use(function(req,res,next){
    res.locals.message = '';
    var info = req.session.info;
    delete req.session.info;
    if(info){
        res.locals.message = "<div class='message'>"+info+"</div>";
    }
    next();
});
router.get('/',function(req,res){
    if(!req.session.user_name){
        res.render('index',{message:"<a href='/login' class='a1 move'>Login</a><a href='/sign' class='a2 move'>Sign up</a>"});
    }
    else{
        res.render('index',{message:"<a href='/form' class='a3 move'>User Center</a>"});
    }
});
router.route('/login')
    .get(function(req,res){
        res.render('login');
    })
    .post(function(req,res){
        //数据库查询数据
        var arr = [];
        arr.push(req.body.l_username);
        arr.push(md5(req.body.l_password));
        arr.push(req.body.l_code);
        mysqlData.queryData(arr,req,res);
    });
router.route('/sign')
    .get(function(req,res){
        res.render('sign');
    })
    .post(function(req,res){
        //数据库插入数据
        var arr = [];
        arr.push(req.body.s_username);
        arr.push(req.body.s_email);
        arr.push(md5(req.body.s_password));
        arr.push(req.body.s_code);
        mysqlData.addData(arr,req,res);
    });

router.route('/reset_password')
    .get(function(req,res){
        res.render('reset_password');
    })
    .post(function(req,res){
        //数据库修改密码
        var arr = [];
        arr.push(req.body.r_email);
        arr.push(md5(req.body.r_password));
        arr.push(req.body.r_code);
        mysqlData.changeData(arr,req,res);

    });

router.post('/ajax',function(req,res){
    //数据库查询数据
    var post = '';
    var obj = req.body;
    for(var i in obj){
        post = i;
    }
    mysqlData.ajaxData(post,req,res);
});
router.route('/form')
    .get(function(req,res){
        if(req.session.user_name){
            res.render("form",{user_name:req.session.user_name,alert:''});
        }
        else{
            res.redirect('login');
        }
    })
    .post(function(req,res){
        mysqlData.formData(req.body,req,res);
    });
router.get('/logout',function(req,res){
    delete req.session.user_name;
    res.redirect("/login");
});

router.get("/codeImg",function(req,res){
    if(req.url == '/favicon.ico'){
        return res.end();
    }
    var Img = makeCapcha();
    req.session.code = Img.str;
    res.end(Img.getFileData());

});
router.post('/userData',function(req,res){
    mysqlData.getUserData(req,res);
});
router.post('/formData',function(req,res){
    mysqlData.getFormData(req,res);
});
router.post('/contactData',function(req,res){
    mysqlData.getContactData(req,res);
});
router.post('/jobData',function(req,res){
    mysqlData.getJobData(req,res);
});
router.post("/emailCode",function(req,res){
    var post = '';
    var obj = req.body;
    for(var i in obj){
        post = i;
    }
    crypto.randomBytes(2,function(ex,buf){
        var token = buf.toString('hex');
        req.session.emailCode = token;
        sendEmail(post,"email code for teaching in china",token);
        res.end();
    });
});
router.post('/contactUs',function(req,res){
    mysqlData.addContactData(req.body,req,res);
});
router.post('/getnewjob',function(req,res){
    mysqlData.addJobData(req.body,req,res);
});



//后台管理中心

router.route('/manage')
    .get( function(req, res) {
        if(req.session.manageUser){
            res.redirect('/manage/user');
        }
        else{
            res.render('manageLogin');
        }
    })
    .post(function(req,res){
        mysqlData.queryManageData(req.body,req,res);
    });
router.route('/manage/user')
    .get( function(req, res) {
        if(req.session.manageUser){
            res.render("user");
        }
        else{
            res.redirect("/manage");
        }
    })
    .post(function(req,res){

    });
router.get("/manage/codeImg",function(req,res){
    if(req.url == '/favicon.ico'){
        return res.end();
    }
    var Img = makeCapcha();
    req.session.manageCode = Img.str;
    res.end(Img.getFileData());

});
router.get("/manage/logout",function(req,res){
    delete req.session.manageUser;
    res.redirect("/manage");
});


module.exports = router;