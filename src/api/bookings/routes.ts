import { Router } from 'express';
import { handleNewBooking } from './controllers/book.service';
import { handleDeleteBooking } from './controllers/delete.service';
import { handleUpdateBooking } from './controllers/update.service';
import { handleGetBooking } from './controllers/get.service';
const bookingRouter = Router();

// Get
bookingRouter.get('/', handleGetBooking);

// Post
bookingRouter.post('/new', handleNewBooking);

// Put
bookingRouter.put('/update', handleUpdateBooking);

// Delete
bookingRouter.delete('/delete', handleDeleteBooking);

export default bookingRouter;
