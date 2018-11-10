const http = require("http");
const urlib = require("url");
const querystring = require("querystring");
const request = require("request-promise").defaults({jar: true});

http.createServer((req, res) => {
  let args = urlib.parse(req.url).query;
  let params = querystring.parse(args);
  if (req.url == '/login') {
    request({
      url: 'http://student.bkthink.com/smvc/StuLoginService/loginStudentByIdentity.json', 
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        "idNo": "350721199801291815",
        "loginApi": "/StuLoginService/loginStudentByIdentity.json",
        "secrite": "291815",
        "stuNo": "41624140"
      }),
    })
    .then(resp => {
      return request({
        url: "http://student.bkthink.com/smvc/StuQueryInfoService/viewStuCourseSchedule.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        }
      })
    })
    .then (resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    })
  }
}).listen(1221, () => {
  console.log('server is listening on port 1221');
})