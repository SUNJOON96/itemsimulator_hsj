// controllers/itemController.js
import Item from '../models/Item.js';
import Joi from 'joi';

const itemSchema = Joi.object({
    item_code: Joi.number().required(),
    item_name: Joi.string().required(),
    item_stat: Joi.object().required(),
    item_price: Joi.number().required(),
});


// 아이템 생성 API
export const createItem = async (req, res, next) => {
    try {
        await itemSchema.validateAsync(req.body); // Joi 유효성 검사

    // 아이템 생성
    const newItem = new Item({
      item_code,
      item_name,
      item_stat,
      item_price,
    });

    await newItem.save();

    res.status(201).json({ message: '아이템이 생성되었습니다.', data: newItem });
  } catch (error) {
    next(error);
  }
};

// 아이템 수정 API
export const updateItem = async (req, res, next) => {
    try {
      const { item_name, item_stat } = req.body;
      const { item_code } = req.params;
  
      // 아이템 조회
      const item = await Item.findOne({ item_code });
  
      if (!item) {
        return res.status(404).json({ message: '아이템을 찾을 수 없습니다.' });
      }
  
      // 가격은 수정할 수 없음
      if (req.body.item_price) {
        return res.status(400).json({ message: '아이템 가격은 수정할 수 없습니다.' });
      }
  
      // 이름과 스탯 수정
      if (item_name) item.item_name = item_name;
      if (item_stat) item.item_stat = item_stat;
  
      await item.save();
  
      res.status(200).json({ message: '아이템이 수정되었습니다.', data: item });
    } catch (error) {
      next(error);
    }
};

// 아이템 상세 조회 API
export const getItemDetail = async (req, res, next) => {
    try {
      const { item_code } = req.params;
  
      // 아이템 코드가 숫자인지 확인
      if (isNaN(item_code)) {
        return res.status(400).json({ message: '아이템 코드는 숫자여야 합니다.' });
      }
  
      // 특정 아이템 조회
      const item = await Item.findOne({ item_code: Number(item_code) });
  
      if (!item) {
        return res.status(404).json({ message: '아이템을 찾을 수 없습니다.' });
      }
  
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
};
