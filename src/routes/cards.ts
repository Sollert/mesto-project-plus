import Router from 'express';
import cardsControllers from '../controllers/cards';

const router = Router();

router.get('/', cardsControllers.getCards);
router.post('/', cardsControllers.createCard);
router.put('/:cardId/likes', cardsControllers.likeCard);
router.delete('/:cardId/likes', cardsControllers.dislikeCard);
router.delete('/:cardId', cardsControllers.removeCard);

export default router;
