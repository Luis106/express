const { Task } = require("../models/task.model.js");

var taskList
const redis = require("redis")
client  = redis.createClient();
var cachecambios = true;

async function minsertOne(req,res){
    const taskName = req.body.name;
    const taskStatus = req.body.status;


    


    
    if (taskName){

       try {

            const newTask = await new Task({
                name: taskName,
                status: taskStatus
            }).save();

            cachecambios = true;
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
      ///Nombre de la lista
    const NombreListaN = `ListaTareasNueA${taskStatus}`
    console.log(NombreListaN)
    

    ///Consulta guardada en la variable r
    var r = await client.get(NombreListaN)
    console.log(r)
    taskList =  JSON.parse(r)

    console.log(taskStatus)

    if(taskList && !cachecambios){
        console.log("Extraido de cache")
        res.status(200).json(taskList);
       
    }else{


        try {
            const result =  await Task.find({
                status: taskStatus
            });

            if (result && result.length > 0) {

                console.log("Guardado en cache")
                client.set(NombreListaN, JSON.stringify(result));
                cachecambios = false

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
}

async function mDeleteOne(req,res){

    const taskId = req.body._id;
    console.log(taskId)
    
    if (taskId){

       try {

            await Task.deleteOne({
                _id: taskId,
            }); 
            cachecambios = true;
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
            cachecambios = true;
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