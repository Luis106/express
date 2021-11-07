const { Task } = require("../models/task.model.js");


async function minsertOne(req,res){
    const taskName = req.body.name;
    const taskStatus = req.body.status;
    
    if (taskName){

       try {

            const newTask = await new Task({
                name: taskName,
                status: taskStatus
            }).save();
            res.status(200).json({
                savedTask:newTask
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo guardar la tarea");
       }

    }else{
        res.status(400).send("Falta de parametros");
    }

}

///http://localhost:3000/Task/listall?status=NEW
async function mFindAll(req,res){
    const taskStatus = req.query.status ? req.query.status : "NEW";
    console.log(taskStatus)

    try {
        const result =  await Task.find({
            status: taskStatus
        });

        if (result && result.length > 0) {
            console.log("Hola")
            res.status(200).json(result);
          
        }else{
            res.status(200).json([]);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {message: error,
             data: []
            });
    }
}

async function mDeleteOne(req,res){

    const taskId = req.body._id;
    console.log(taskId)
    
    if (taskId){

       try {

            await Task.deleteOne({
                _id: taskId,
            }); 
            res.status(200).json({
                msg: "Registro eliminado"
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo eliminar la tarea");
       }

    }
}

async function mUpdateOne(req,res){
    const taskId = req.body._id;
    const taskStatus = req.body.status;
    
    if (taskId){

       try {

            await Task.updateOne({
                _id: taskId,
            }, {
                $set:{
                    status: taskStatus
                }
            }); 
            res.status(200).json({
                msg: "Registro actualizado"
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo actualizar la tarea");
       }

    }
}
module.exports= {
    minsertOne,
    mFindAll,
    mUpdateOne,
    mDeleteOne
}