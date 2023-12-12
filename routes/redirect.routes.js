import {Router} from 'express';
import Link from '../models/Link.js';

const router = new Router();

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code});

        if (link) {
            link.clicks++;
            await link.save();

            return res.redirect(link.from);
        }

        res.json('Ссылка не найдена')
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

export default router;