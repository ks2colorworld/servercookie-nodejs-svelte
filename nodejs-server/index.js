const express = require('express');
const cors = require('cors');

// fs and https 모듈 가져오기
const https = require("https");
const fs = require("fs");

// certificate와 private key 가져오기
// ------------------- STEP 2
const options = {
  key: fs.readFileSync("./https/cert.key"),
  cert: fs.readFileSync("./https/cert.crt"),
};

const app = express();

// 특정 사이트만 허용하는 CORS 설정
// const corsOptions = {
//   origin: [
//     'http://localhost:8080',
//   ],
//     credentials: true
// };

// app.use(cors(corsOptions));

// 모든 도메인 허용
// app.use(cors());

app.use(cors({
  origin: true,
  credentials: true
}));


app.get('/1', (req, res) => {
  // 쿠키 생성
  res.cookie('username', 'john_doe', {
    maxAge: 900000,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  // JSON 형식의 응답 전송
  res.json({ message: '쿠키가 설정되었습니다.' });
});

app.get('/2', (req, res) => {
  // 요청 데이터에서 쿠키 확인
  const usernameCookie = req.headers.cookie//?.username;

  if (usernameCookie) {
    // 쿠키가 존재하는 경우
    res.json({ message: `쿠키 확인: ${usernameCookie}` });
  } else {
    // 쿠키가 존재하지 않는 경우
    res.json({ message: '쿠키가 존재하지 않습니다.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다..`);
});

// https 의존성으로 certificate와 private key로 새로운 서버를 시작
https.createServer(options, app).listen(3001, () => {
  console.log(`HTTPS server started on port 3001`);
});