const express = require('express');
const cors = require('cors');
const session = require('express-session'); // express-session 추가
const app = express();

// 특정 사이트만 허용하는 CORS 설정
const corsOptions = {
  origin: [
    'http://localhost:8080',
  ],
    credentials: true
};

app.use(cors(corsOptions));

// 모든 도메인 허용
// app.use(cors());
// app.use(cors({
//   origin: true,
//   credentials: true
// }));


app.get('/1', (req, res) => {
  // 쿠키 생성
  res.cookie('username', 'john_doe', { maxAge: 900000, httpOnly: true });

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
