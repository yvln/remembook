# Yveline's 2nd projet - REMEMBOX

## Link to the repo
https://github.com/yvln/remembook

## Explanations of the technologies used
- HTML
- CSS
- JS
- jQuery
- Node packages: "axios": "^0.16.2", "bcryptjs": "^2.4.3", "body-parser": "^1.18.2", "connect-flash": "^0.1.1", "cookie-parser": "^1.4.3", "dotenv": "^4.0.0", "express": "^4.16.1", "express-session": "^1.15.6", "flash": "^1.1.0", "morgan": "^1.9.0", "mustache-express": "^1.2.5", "passport": "^0.4.0", "passport-local": "^1.0.0", "pg-promise": "^6.10.2",
- PSQL

## Wireframes
- Landing page: https://wireframe.cc/tqVT5j
- Home page: https://wireframe.cc/qicdIx
- Edit user page: https://wireframe.cc/vAOu07
- Edit remembox page: https://wireframe.cc/8TJs4t

## The approach taken
1. Creation of the index page with:
    a. a sign up form
    b. a log in form
    c. a display of news articles, from https://newsapi.org/
    d. a flash message with the npm "connect-flash" to notice the user of the error
2. Creation of the home page:
    a. Authentication restriction
    b. Remembox:
      i. create (form)
      ii. read (search bar + input date)
      iii. update (link to another page)
      iv. delete (button + confirmation)
3. Creation of the edit page for remembox
    a. Creation of a form with values previously entered
    b. Submission in updating the database
4. Creation of the user's profile page
    a. Create: form on the index page (1)
    b. Read: redirect on this page in 2 ways: when you just successfully sign up, and when you click on the user's name on the header of each page.
    c. Update: Link to another page
    d. Delete: Button + confirmation. It does not erase the remembox created by the user
5. Creation of the edit page for the user
    a. Creation of a form with values previously entered
    b. Submission in updating the database

## Installation instructions
https://project-remembook.herokuapp.com/

## Unsolved problems
1. Main goals reached
2. Did not change the format date for the articles (lack of time, noticed it at the very end...)

## Other useful information

### Name of my app

Remembook, your digital Diary

### Concept of my app

The "anti-facebook" app.
Not focus on your face but on your mind.
Not focus on others's life but on yours.

### User stories

1. Landing page with an authentication
2. Possibility to sign up
3. Main page with the body which changes function of the research
5. Possibility to create "remembox", which are boxes with the following content :
. Category
. Date of the memory
. Title of the memory
. Description of the memory
. Content : text, image
. Mood
6. Possibility to search for a memory by keyword and/or date

### Challenges
1. NPM Package (connect-flash) that we did not see in class
2. Heroku
3. Get often confused with submit forms (ajax / not ajax)

### Possible improvement
1. Let user add category of his choice
2. Add moods
3. Allow user to share boxes with other users / make a link for each box accessible to the public
