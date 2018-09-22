const functions = require('firebase-functions')
const loginUtil = require('./utils/loginUtil')
const fetchUtil = require('./utils/fetchUtil')
const parserUtil = require('./utils/parserUtil')
const gpaUtil = require('./utils/gpaUtil')
const config = require('./config')

const express = require('express')
const eapp = express()

eapp.get('/getSchedule', async(req, res) => {
    try {
        var options = await loginUtil.loginUser();
        options['url'] = config.url.schedule;
        const scheduleOptionsPage = await fetchUtil.getPage(options);
        const scheduleOptions = await parserUtil.schedulePageOptionsParser(scheduleOptionsPage);
        res.send(scheduleOptions);
   }
    catch(error) {
        console.log(error)
        res.send(error);
   }

})

eapp.get('/getGrades', async(req, res) => {
    try {
        const options = await loginUtil.loginUser();
        const gradesPage = await fetchUtil.getPage(options);
        const grades = await parserUtil.gradePageParser(gradesPage);
        res.send(grades);
   }
    catch(error) {
        res.send('Failed!');
   }

})

eapp.get('/getCGPA', async (req, res) => {    

    // chain of promises
    // loginUtil.loginUser().then(options =>
    //     parserUtil.getGradesPage(options)
    // ).then(gradesPage =>
    //     parserUtil.gradePageParser(gradesPage)
    // ).then(grades =>
    //     gpaUtil.calculateCGPA(grades)
    // ).then(cgpa =>
    //     res.send(cgpa)
    // ).catch(() => res.send(undefined));

    try {
        const options = await loginUtil.loginUser();
        const gradesPage = await fetchUtil.getPage(options);
        const grades = await parserUtil.gradePageParser(gradesPage);
        const cgpa = await gpaUtil.calculateCGPA(grades);
        res.send(cgpa)
    }
    catch(error) {
        res.send(error)
    }
})
    
// const {dialogflow, SimpleResponse} = require('actions-on-google');
// const app = dialogflow({debug: true});
// app.intent('tell_gpa', async (conv) => {
    
//     // conv.close(new SimpleResponse({
//     //     speech: 'Sorry! I failed to calculate your cgpa',
//     //     text: 'Sorry!',
//     // }))

//     try {
//         const options = await loginUtil.loginUser();
//         const gradesPage = await parserUtil.getGradesPage(options);
//         const grades = await parserUtil.gradePageParser(gradesPage);
//         const cgpa = await gpaUtil.calculateCGPA(grades);
//         conv.close(new SimpleResponse({
//             speech: 'Your cumulative grade point average so far is ' + cgpa,
//             text: 'It\'s' + cgpa,
//         }))
//     }
//     catch(error) {
//         conv.close(new SimpleResponse({
//             speech: 'Sorry! I failed to calculate your cgpa',
//             text: 'Sorry!',
//         }))
//     }
// })

exports.yorku_assist = functions.https.onRequest(eapp);
