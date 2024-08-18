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
const bookingRouter = Router();

// Get
bookingRouter.get('/', handleGetBooking);

// Post
bookingRouter.post(
  '/new',
  yupValidator('body', yupNewBookingSchema),
  handleNewBooking
);

// Put
bookingRouter.put(
  '/update/:id',
  yupValidator('params', yupObjIdSchema),
  yupValidator('body', yupUpdateBookingSchema),
  handleUpdateBooking
);

// Delete
bookingRouter.delete(
  '/delete/:id',
  yupValidator('params', yupObjIdSchema),
  handleDeleteBooking
);

export default bookingRouter;
