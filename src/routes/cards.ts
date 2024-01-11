import Router from 'express';
import cardsControllers from '../controllers/cards';

const router = Router();

router.get('/', cardsControllers.getCards);
router.get('/:cardId', cardsControllers.getCardById);
router.post('/', cardsControllers.createCard);
router.put('/:cardId/likes', cardsControllers.likeCard);
router.delete('/:cardId/likes', cardsControllers.dislikeCard);

export default router;
