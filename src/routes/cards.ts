import Router from 'express';
import cardsControllers from '../controllers/cards';
import validation from '../validation/cards'

const router = Router();

router.get('/', validation.getCardsValidation, cardsControllers.getCards);
router.post('/', validation.createCardValidation, cardsControllers.createCard);
router.put('/:cardId/likes', validation.updateLikeValidation, cardsControllers.likeCard);
router.delete('/:cardId/likes', validation.updateLikeValidation, cardsControllers.dislikeCard);
router.delete('/:cardId', validation.deleteCardValidation, cardsControllers.removeCard);

export default router;
