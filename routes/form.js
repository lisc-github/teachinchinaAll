/**
 * Created by admin on 2017/5/2.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    if(req.session.l_username){
        res.render('form',{user_name:'lsc'});
    }
    else{
        res.redirect('login');
    }
});
module.exports = router;