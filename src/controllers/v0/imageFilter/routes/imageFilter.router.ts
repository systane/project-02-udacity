import { Router, Request, Response, NextFunction } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../../../../util/util';

const router: Router = Router();

function deleteLocalImages(imageToDelete:string) {
    deleteLocalFiles([imageToDelete]);
}

router.get('/', 
    async (req: Request, res: Response, next: NextFunction) => {
    const { image_url } = req.query;
    
    //check image_url is valid
    if(!image_url) {
        res.status(422).send("image_url is missing or not well formed");
    }

    let absoluteImagePath: string;
    try{
        absoluteImagePath = await filterImageFromURL(image_url); 
    }catch(error){
        res.status(500).send("could not filter the image");
    }
       
    res.sendFile(absoluteImagePath, () => deleteLocalImages(absoluteImagePath));
});

export const ImageFilterRouter: Router = router;