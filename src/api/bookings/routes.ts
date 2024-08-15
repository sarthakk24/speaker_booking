import { Router } from 'express';
import { handleNewBooking } from './controllers/book.service';
import { handleDeleteBooking } from './controllers/delete.service';
import { handleUpdateBooking } from './controllers/update.service';
import { handleGetBooking } from './controllers/get.service';
import yupValidator from '../../middlewares/validator';
import { yupNewAndUpdateBookingSchema } from '../../models/schemas/schema';
const bookingRouter = Router();

// Get
bookingRouter.get('/', handleGetBooking);

// Post
bookingRouter.post(
  '/new',
  yupValidator('body', yupNewAndUpdateBookingSchema),
  handleNewBooking
);

// Put
bookingRouter.put(
  '/update',
  yupValidator('body', yupNewAndUpdateBookingSchema),
  handleUpdateBooking
);

// Delete
bookingRouter.delete('/delete', handleDeleteBooking);

export default bookingRouter;
