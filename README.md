# YU-Assist

## An app on the google assistant to help York University students find information like GPA, courses enrolled quickly using voice-recognition.

## Motivation
During the beginnning of a semester, I check course timetables, professors, my OSAP status, GPA etc. quite often.  
Every time I check one of the above, I have to navigate through a couple web pages in my browser.  
I want to be able to access all of my school information as quickly as possible.

## Google Assistant
What better way to get access to your information than using your personal assistant (OK Google)

## Steps
Firstly, I trained an agent on Dialogflow (end to end suite for building conversational interfaces) to take user inputs.  
E.g - What is my GPA? What are the requirements for EECS 2011? What courses am I taking this semester? etc.  
For custom responses, I created a simple node.js app as a webhook hosted on firebase.

## Scraping
So far, I am using my personal credentials to scrape data from York's website. 

## Challenges
The most difficult part was to scrape data from York's website, especially pages that require authentication.

## Technologies
```Dialogflow```, ```Firebase```, ```node.js```