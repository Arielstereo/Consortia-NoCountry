import { Router } from 'express'
import {
    deleteUserController,
    editUserController,
    getAllUsersController,
    getUserController,
    registerController,
} from '../controllers'

import { registerValidate, validateToken } from '../middlewares'

const router = Router()

router.post('/register', registerValidate, registerController)
router.get('/getuser/:id', validateToken, getUserController)
router.get('/getAllUsers', getAllUsersController)
router.put('/update/:id', validateToken, editUserController)
router.delete('/delete/:id', validateToken, deleteUserController)

export default router
