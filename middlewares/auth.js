// middlewares/auth.js
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Authorization 헤더가 없거나 형식이 올바르지 않은 경우
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '인증 형식이 올바르지 않습니다. Bearer 토큰을 사용하세요.' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>에서 토큰 값만 추출

  if (!token) {
    return res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
  }

  // JWT 검증
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: '토큰이 만료되었습니다.' });
      } else {
        return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
      }
    }

    // JWT 검증 성공, 사용자 정보를 req.locals.user에 저장
    req.locals = { user };
    next(); // 
  });
};

export default authenticateToken;
