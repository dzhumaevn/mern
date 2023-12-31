import {Router} from 'express';
import config from 'config';
import { nanoid } from 'nanoid';
import auth from '../middleware/auth.middleware.js';
import Link from '../models/Link.js';

const router = new Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {from} = req.body;

        const existing = await Link.findOne({ from });
        if (existing) {
            return res.json({link: existing});
        }

        const code = nanoid(5);

        const to = baseUrl + '/t/' + code;

        const link = new Link({
            code, from, to, owner: req.user.userId
        });

        await link.save();

        res.status(201).json({link});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова!?'})
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId});
        res.json(links);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

export default router;