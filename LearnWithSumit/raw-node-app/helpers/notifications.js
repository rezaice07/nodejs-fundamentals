/*
 *Title: Notification to send sms
 *Decription: Handle to send sms through Twilio sms
 *Author:Rejwanul Reja
 *Date: 15-Dec-2021
 */

// dependencies
const https =require('https')

// module scaffolding
const notificaions ={  } ;

//send sms o user by using twillio api
notificaions.sendTwillioSms=(phone,msg,callback)=>{
    //input validation
    const userPhone=typeof phone==='string' && phone.trim().length==11?
phone.trim():false;

const userMsg=typeof msg==='string' && msg.trim().length>0 && msg.trim().length<=1600?
msg.trim():false;




}

// export the module
module.exports = notificatimport;
