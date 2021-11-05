const express = require("express")
const router = express.Router();

const {
    minsertOne,
    minsertMany,
    mFindAll,
    mUpdateOne,
    mDeleteOne
} = require("./controllers/task.controller.js")

const  {
    verifyToken
} = require("./controllers/auth.controller.js")

//http://localhost:3000/Task
router.post('/create', minsertOne);
router.get('/', mFindAll);
router.post('/update', mUpdateOne);
router.post('/delete', mDeleteOne);

module.exports = router;