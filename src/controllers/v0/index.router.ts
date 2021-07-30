import { Router } from 'express';
import { ImageFilterRouter } from './imageFilter/routes/imageFilter.router';

const router: Router = Router();

router.use('/filteredimage', ImageFilterRouter);

export const IndexRouter: Router = router;