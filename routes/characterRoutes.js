// routes/characterRoutes.js
import express from 'express';
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
} from '../controllers/characterController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticateToken, createCharacter);
router.delete('/:character_id', authenticateToken, deleteCharacter);
router.get('/:character_id', authenticateToken, getCharacter);

export default router;
