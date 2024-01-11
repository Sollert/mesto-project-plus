import Router from 'express';
import cardsControllers from '../controllers/cards';

const router = Router();

router.get('/', cardsControllers.getCards);
router.get('/:cardId', cardsControllers.getCardById);
router.post('/', cardsControllers.createCard);

export default router;
