A simple app to make server event listner connection and get live score update

steps to follow:

1. clone repo
2. go to cricket-live-commentory/server folder
3. run "npm i"
4. run command "npm run start"
5. create a server and serve index.html(live server extension on vs code)
6. make a post call
   curl -X POST -H "Content-Type: application/json" -d '{"ball": "15.1", "id": 15.1 "commentary": "What a shottt"}' -s http://localhost:3000/addCommentary
