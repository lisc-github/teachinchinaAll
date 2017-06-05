/**
 * Created by admin on 2017/5/16.
 */
var nodeMailer = require('nodemailer');
var config = require('./emailConfig');

smtpTransport = nodeMailer.createTransport(config.email);

var sendMail = function (recipient, subject, html) {

    smtpTransport.sendMail({

        from: config.email.auth.user,
        to: recipient,
        subject: subject,
        html: html

    }, function (error, response) {
        if (error) {
            console.log(error);
        }
        else{
            console.log('发送成功')
        }

    });
};

module.exports = sendMail;