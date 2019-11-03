# GitHub_API_UI
SPA to fetch and view interesting data from the GitHUB GraphQL API

How to run the app locally:

Clone the repo to your dev machine

STEP 1:\
/A\
Make sure you have Node.js and Angular installed on your system.\
Install Angular CLI by using: npm install -g @angular/cli \
command in your terminal.\
Please follow the guide below for help: https://angular.io/guide/setup-local\

/B\
In order to use the app, you must generate a \
Personal Acces Token on Github \
To do this, go to the Settings menu under your profile on Github\ 
then to Developer Settings => Personal Access Token => Generate new token\
Once you have your token, just find the file called apiservice.service.ts\
Copy and paste your own token to \
Line 36 and Line 37\
This step is neccessary otherwise you won't be able to authenticate towards Github.\

STEP 2:
Run npm install to install all dependencies\

STEP 3:
Run the ng serve commmand within the Github Api folder.\

STEP 5: 
Open the app in your browser at http://localhost:4200/\

STEP 6:
Take a peek on other foe's repo data >)\
