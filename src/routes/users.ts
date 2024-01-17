import Router from 'express';
import usersControllers from '../controllers/users';

const router = Router();

router.get('/', usersControllers.getUsers);
router.get('/me', usersControllers.getCurrentUser);
router.get('/:userId', usersControllers.getUserById);
router.patch('/me', usersControllers.updateUserInfo);
router.patch('/me/avatar', usersControllers.updateUserAvatar);

export default router;
