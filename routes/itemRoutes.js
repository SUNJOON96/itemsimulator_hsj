// routes/itemRoutes.js
import express from 'express';
import { createItem, updateItem, getItemList, getItemDetail } from '../controllers/itemController.js';
import authenticateToken from '../middlewares/auth.js'; // 인증 미들웨어

const router = express.Router();

// 아이템 생성 (POST /items)
router.post('/', authenticateToken, createItem);

// 아이템 수정 (PUT /items/:item_code)
router.put('/:item_code', authenticateToken, updateItem);

// 아이템 목록 조회 (GET /items)
router.get('/', authenticateToken, getItemList);

// 아이템 상세 조회 (GET /items/:item_code)
router.get('/:item_code', authenticateToken, getItemDetail);

export default router;
