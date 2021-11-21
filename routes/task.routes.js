const express = require("express")
const router = express.Router();

const {
    minsertOne,
    mFindAll,
    mUpdateOne,
    mDeleteOne
} = require("./controllers/task.controller.js")

const  {
    verifyToken
} = require("./controllers/auth.controller.js")

//http://localhost:3000/Task
router.post('/create',verifyToken, minsertOne);
router.get('/',verifyToken, mFindAll);
router.put('/update',verifyToken, mUpdateOne);
router.delete('/delete',verifyToken, mDeleteOne);

module.exports = router;