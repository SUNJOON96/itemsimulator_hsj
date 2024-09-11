// controllers/userController.js
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Joi from 'joi';

dotenv.config();

// Joi 스키마로 유효성 검증
const registerSchema = Joi.object({
  username: Joi.string().pattern(/^[a-z0-9]+$/).required().messages({
    'string.pattern.base': '아이디는 영어 소문자 + 숫자 조합이어야 합니다.',
  }),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref('password'),
  name: Joi.string().required(),
});

export const registerUser = async (req, res, next) => {
  try {
    // Joi를 사용한 유효성 체크
    const { username, password, name } = await registerSchema.validateAsync(req.body);

    // 아이디 중복 체크
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ errorMessage: '아이디가 이미 존재합니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);

    // 사용자 생성
    const user = new User({ username, password: hashedPassword, name });
    await user.save();

    // 비밀번호 제외 사용자 정보 반환
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    // Joi 에러 핸들링
    if (error.isJoi) {
      return res.status(400).json({ errorMessage: error.details[0].message });
    }
    next(error);
  }
};
