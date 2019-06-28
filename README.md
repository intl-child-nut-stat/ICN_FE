# ICN_FE
Ethan Hickey

Link to deployed site on netlify: https://icn-tracking.netlify.com/home/login

##Install and Run

-Run the command `npm install` to install all required dependencies.
-Run `npm start` to open using local server

##User Types

-As an administrator, you can log in and view, add, edit, and delete the list of countries associated with your organization. Your home page will display a global map with interactive capabilities. Clicking a selected (blue) country will bring you to that country's page. Clicking a unselected (gray) country will give you the option to add that country for your organization. You will then have all other functionalities of a normal user.
-As a user, you can log in and view, add, edit, and delete communities, children, and screenings for the country you are assigned to. 

##Dependencies
The app was built using `react`, `redux`, and `redux-thunk`. Components were built using `antd` and some styling was done with `styled-components` and `node-sass`. `Moment.js` was used for formatting the dates of the screenings and `axios` was used for the calls to the server. Lastly, `amcharts4` was used to build and display the Map on the admin home page and the line graph on the screening page. Please see their docs for additional information. 
