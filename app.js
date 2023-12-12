import express from'express';
import mongoose from'mongoose';
import config from'config';
import path from 'path';
import auth from'./routes/auth.routes.js';
import link from'./routes/link.routes.js';
import redirect from'./routes/redirect.routes.js';

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', auth);
app.use('/api/link', link);
app.use('/t', redirect);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(path.resolve(), 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(express.resolve(path.resolve(), 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('port');

const start = async () => {
    try {
        await mongoose.connect(config.get('url'), {});

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

start();