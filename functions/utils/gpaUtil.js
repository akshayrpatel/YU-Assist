const grade_points = {
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C+': 5,
    'C': 4,
    'D+': 3,
    'D': 2,
    'E': 1
}

exports.calculateSessionGPA = function(grades, term){
    return new Promise(function(resolve, reject){
        var numerator_sum = 0.0
        var credit_sum = 0.0
        var course_credit = ''
        var letter_grade = ''
        for(var course in grades) {

            if(grades[course]['term'] === term)
            {
                course_credit = grades[course]['course_credit']
                letter_grade = grades[course]['letter_grade']
                if(grade_points.hasOwnProperty(letter_grade)) {
                    credit_sum = (credit_sum + course_credit)
                    numerator_sum = numerator_sum + (course_credit * grade_points[letter_grade])
                }
            }
        }
        var cgpa = (numerator_sum / credit_sum).toFixed(2)
        if(cgpa === undefined)
            reject(new Error('Failed to calculate CGPA!'))
        else
            resolve(cgpa)
    })
}

exports.calculateCGPA = function(grades){
    return new Promise(function(resolve, reject){
        var numerator_sum = 0.0
        var credit_sum = 0.0
        var course_credit = ''
        var letter_grade = ''
        for(var course in grades) {
            course_credit = grades[course]['course_credit']
            letter_grade = grades[course]['letter_grade']
            if(grade_points.hasOwnProperty(letter_grade)) {
                credit_sum = (credit_sum + course_credit)
                numerator_sum = numerator_sum + (course_credit * grade_points[letter_grade])
            }
        }
        var cgpa = (numerator_sum / credit_sum).toFixed(2)
        if(cgpa === undefined)
            reject(new Error('Failed to calculate CGPA!'))
        else
            resolve(cgpa)
    })
}