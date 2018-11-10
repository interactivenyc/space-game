const router = require('express').Router();
const path = require('path');
const { Student, Campus } = require(path.join(__dirname, '..', 'db'));
// const { sortArrayByObjectProp } = require('../../app/utilities');

router.get('/', async (req, res, next) => {
    console.log('[Router] GET /api/students');

    try {
        const students = await Student.findAll({ include: [{ model: Campus }] });
        students.sort(function(a, b) {
            return a.id - b.id;
        });
        // sortArrayByObjectProp(students, 'id');
        res.json(students);
    } catch (error) {
        res.json({ error });
        next(error);
    }
});

router.post('/add-student', async (req, res, next) => {
    console.log('[Router] POST /api/students/add-student', req.body);

    try {
        const student = await Student.create(req.body);
        res.json(student);
    } catch (error) {
        res.json({ error });
        next(error);
    }
});

router.get('/:studentId', async (req, res, next) => {
    console.log('[Router] GET /api/students/:studentId', req.params.studentId);

    try {
        const student = await Student.findOne({
            where: { id: req.params.studentId },
            include: [{ model: Campus }]
        });
        res.json(student);
    } catch (error) {
        res.json({ error });
        next(error);
    }
});

router.put('/:studentId', async (req, res, next) => {
    console.log('[Router] PUT /api/students/:studentId', req.params.studentId);

    try {
        const [rows, [updatedStudent]] = await Student.update(req.body, {
            returning: true,
            where: { id: req.params.studentId }
        });

        res.json(updatedStudent.dataValues);
    } catch (error) {
        res.json({ error });
        next(error);
    }
});

router.delete('/:studentId', async (req, res, next) => {
    console.log('[Router] DELETE /api/students/:studentId', req.params.studentId);

    try {
        const response = await Student.destroy({
            where: { id: req.params.studentId }
        });

        res.json(response);
    } catch (error) {
        res.json({ error });
        next(error);
    }
});

router.use((req, res, next) => {
    const error = new Error('students API route not found!');
    error.status = 404;
    next(error);
});

module.exports = router;
