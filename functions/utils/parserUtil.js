var config = require('../config')
var JSSoup = require('jssoup').default;

exports.gradePageParser = function(body){
    return new Promise(function(resolve, reject){
        var soup = new JSSoup(body)
        var rows = soup.findAll('tr')
        var grades = new Object()
        for(var r in rows) {
            var courses = rows[r].findAll('td')
            var term = ''
            var course_code = ''
            var course_credit = 0
            var course_title = ''
            var letter_grade = ''
            var counter = 0
            
            for(var c in courses) {
                switch(counter) {
                    case 0:
                        term = courses[c].getText()
                        break;
                    case 1:
                        course_code = courses[c].getText().replace('&nbsp;', '')
                        if(course_code.indexOf('ENG') !== -1)
                            course_code = course_code.replace('&nbsp;', '')

                        credit_regex = /(.*?)\s([0-9].[0-9][0-9])\s([A-Z])/g
                        course_credit = parseFloat(course_code.replace(credit_regex, '$2'))
                        break;
                    case 2:
                        course_title = courses[c].getText()
                        break;
                    case 3:
                        
                        if(courses[c].getText().indexOf('&nbsp;') !== -1)
                            letter_grade = courses[c].getText().replace(/&nbsp;/g, '').replace(' ', '')
                        else
                            letter_grade = courses[c].getText().replace(' ', '')
                        var course = new Object()
                        course['term'] = term
                        course['course_code'] = course_code
                        course['course_credit'] = course_credit
                        course['course_title'] = course_title
                        course['letter_grade'] = letter_grade
                        grades[course_title] = course
                        break;
                    default:  
                        counter = 0                             
                }
                counter = counter + 1
            }
        }
       
        if(Object.keys(grades).length === 0)
            reject(new Error('Failed to parse grades'))
        else
            resolve(grades)
    })
}

exports.schedulePageOptionsParser = function(body) {
    return new Promise(function(resolve, reject){
        var soup = new JSSoup(body)
        var schedules = soup.findAll('a')
        var scheduleSessions = new Object()
        scheduleSessions['sessions'] = [];
        for(var s in schedules)
        {
            var sessionName = schedules[s].getText(); 
            var sessionLink = schedules[s].attrs.href;
            if(sessionName.match(/summer|fall|winter/i) !== null)
            {   
                var s = new Object()
                s['name'] = sessionName
                s['href'] = config.domains.apps + sessionLink
                scheduleSessions['sessions'].push(s)
            }
        }
        resolve(scheduleSessions)
    })
}

exports.schedulePageParser = function(body) {
    return new Promise(function(resolve, reject){
        var soup = new JSSoup(body)
        var schedules = soup.findAll('a')
        var options = new Object()
        options['sessions'] = [];
        for(var s in schedules)
        {
            var sessionName = schedules[s].getText(); 
            var sessionLink = schedules[s].attrs.href;
            if(sessionName.match(/summer|fall|winter/i) !== null)
            {   
                var s = new Object()
                s['name'] = sessionName
                s['href'] = config.domains.apps + sessionLink
                options['sessions'].push(s)
            }
        }
        resolve(options)
    })
}