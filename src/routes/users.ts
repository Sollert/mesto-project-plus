import Router from 'express';
import usersControllers from '../controllers/users';
import validation from '../validation/users';

const router = Router();

router.get('/', usersControllers.getUsers);
router.get('/me', usersControllers.getCurrentUser);
router.get('/:userId', validation.getUserByIdValidation, usersControllers.getUserById);
router.patch('/me', validation.updateUserInfoValidation, usersControllers.updateUserInfo);
router.patch('/me/avatar', validation.updateUserAvatarValidation, usersControllers.updateUserAvatar);

export default router;
