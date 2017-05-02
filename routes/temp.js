/**
 * Created by admin on 2017/5/2.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('temp');
});
module.exports = router;