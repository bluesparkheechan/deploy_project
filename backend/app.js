require("dotenv").config({ path: "./database/dbConfig.env" });
const express = require("express");
const app = express();
const port = 3000;

console.log(process.env.DB_NAME);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/hello", (req, res) => {
  console.log(req.url);
  res.send("Hello World!");
});

//운영모드에서 추가적인 경로설정
// node app.js prod로 서버를 실행
// process.env // 환경변수
// process.argv // 명령행 인수 (해당 인수를 배열로 가지고 있는게 process.argv)
// process.argv = ['node', 'app.js', 'prod'] 이런식으로 저장이됨.
// 그래서 prod로 개발모드인지 운영모드인지 구분해서 서버 실행하겠다는거임.
let apiPath = "";
if (process.argv[2] == "prod") {
  //운영모드일때
  apiPath = "/api"; //api 경로를 /api로 설정
}
app.get(`${apiPath}/board`, (req, res) => {
  res.send({ title: "깃허브 액션 배포 테스트중!!!!" });
});

// app.get("/board", (req, res) => {
//   res.send({ title: "노드 api 서버 update!!!!" });
// });

const path = require("path"); // path = 경로를 담당하는 node 모듈
//정적인 파일 등록 >>> 스태틱이라는 미들웨어 기반으로 등록하면 경로가 자동생성 되면서 파일을 알아서 읽고 내보냄
//html 파일을 넘겨서 href경로 or src 경로를 통해서 다시 재호출하는 구조인거임 이럴 땐 스태틱을 써라.
//스태틱도 경로 설정이 가능하지만, 특별한 설정이 없다면 그 자체가 root 경로가 되는거임.
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "./public", "index.html")); //__dirname 은 현재 폴더와 경로를 가지고 index.html 파일을 찾아가는 구조임.
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./public", "index.html"));
}); // 얘는 가장 마지막에 위치해야함. // 404 코드값 넣어서 보내는거라서 404 에러뜨는거임
