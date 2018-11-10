const router = require('express').Router();
const path = require('path');
const { Student, Campus } = require(path.join(__dirname, '..', 'db'));

router.get('/', async (req, res, next) => {
    console.log('[Router] get /api/campuses');

    try {
        const campuses = await Campus.findAll();
        res.json(campuses);
    } catch (error) {
        res.json({ error });
        next(error);
    }
});

router.post('/add-campus', async (req, res, next) => {
    console.log('[Router] POST /api/campuses/add-campus', req.body);

    try {
        const campus = await Campus.create(req.body);
        res.json(campus);
    } catch (error) {
        res.json({ error });
        next(error);
    }
});

router.get('/:campusId', async (req, res, next) => {
    console.log('[Router] get /api/campuses/:campusId', req.params.campusId);

    try {
        const campus = await Campus.findOne({
            where: { id: req.params.campusId },
            include: [{ model: Student }]
        });
        res.json(campus);
    } catch (error) {
        res.json({ error });
        next(error);
    }
});

router.put('/:campusId', async (req, res, next) => {
    console.log('[Router] PUT /api/campuses/:campusId', req.params.campusId);

    try {
        const [rows, [updatedCampus]] = await Campus.update(req.body, {
            returning: true,
            where: { id: req.params.campusId }
        });

        res.json(updatedCampus.dataValues);
    } catch (error) {
        res.json({ error });
        next(error);
    }
});

router.delete('/:campusId', async (req, res, next) => {
    console.log('[Router] DELETE /api/campuses/:campusId', req.params.campusId);

    try {
        const response = await Campus.destroy({
            where: { id: req.params.campusId }
        });

        res.json(response);
    } catch (error) {
        res.json({ error });
        next(error);
    }
});

router.use((req, res, next) => {
    const error = new Error('campuses API route not found!');
    error.status = 404;
    next(error);
});

module.exports = router;
