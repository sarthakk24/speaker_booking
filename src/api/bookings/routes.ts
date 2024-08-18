import { Router } from 'express';
import { handleNewBooking } from './controllers/book.service';
import { handleDeleteBooking } from './controllers/delete.service';
import { handleUpdateBooking } from './controllers/update.service';
import { handleGetBooking } from './controllers/get.service';
import yupValidator from '../../middlewares/validator';
import {
  yupNewBookingSchema,
  yupObjIdSchema,
  yupUpdateBookingSchema,
} from '../../models/schemas/schema';
import { validateUser } from '../../middlewares/verifyJWT';
const bookingRouter = Router();

// Get
bookingRouter.get('/', validateUser, handleGetBooking);

// Post
bookingRouter.post(
  '/new',
  validateUser,
  yupValidator('body', yupNewBookingSchema),
  handleNewBooking
);

// Put
bookingRouter.put(
  '/update/:id',
  validateUser,
  yupValidator('params', yupObjIdSchema),
  yupValidator('body', yupUpdateBookingSchema),
  handleUpdateBooking
);

// Delete
bookingRouter.delete(
  '/delete/:id',
  validateUser,
  yupValidator('params', yupObjIdSchema),
  handleDeleteBooking
);

export default bookingRouter;
