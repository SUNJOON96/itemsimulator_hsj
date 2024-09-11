// controllers/characterController.js
import Character from '../models/Character.js';

// 캐릭터 생성
export const createCharacter = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });
    }

    const character = new Character({
      name,
      health: 500,
      power: 100,
      money: 10000,
    });
    await character.save();

    res.status(201).json({
      message: `새로운 캐릭터 ‘${name}’를 생성하셨습니다!`,
      data: { character_id: character._id },
    });
  } catch (error) {
    next(error);
  }
};

// 캐릭터 삭제
export const deleteCharacter = async (req, res, next) => {
  try {
    const { character_id } = req.params;

    if (!character_id) {
      return res
        .status(400)
        .json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    const character = await Character.findById(character_id);
    if (!character) {
      return res.status(404).json({ message: '캐릭터 조회에 실패하였습니다.' });
    }

    await character.remove();
    res
      .status(200)
      .json({ message: `캐릭터 ‘${character.name}’를 삭제하였습니다.` });
  } catch (error) {
    next(error);
  }
};

// 캐릭터 상세 조회
export const getCharacter = async (req, res, next) => {
  try {
    const { character_id } = req.params;

    if (!character_id) {
      return res
        .status(400)
        .json({ message: '데이터 형식이 올바르지 않습니다.' });
    }

    const character = await Character.findById(character_id);
    if (!character) {
      return res.status(404).json({ message: '캐릭터 조회에 실패하였습니다.' });
    }

    res.status(200).json({
      data: {
        name: character.name,
        health: character.health,
        power: character.power,
      },
    });
  } catch (error) {
    next(error);
  }
};
