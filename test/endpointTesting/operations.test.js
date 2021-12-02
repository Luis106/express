const supertest = require("supertest");
const app = require("../../app")

describe("Pruebas e operaciones" , function(){
    describe("Obtención", function(){
        it("Deberia de regresar una lista de operaciones al ser llamada", function(done: DoneCallback){
            done();
        });

    });

    describe("Suma", function(){
        it("Deberia regresar un valor de 0 si no se manda ningun valor", function(){});
        it("Deberia regresar un valor de 5 si se manda el 1° paramentro como 5", function(){});
        it("Deberia regresar un valor de 20 si se manda valor 2 como 20", function(){});
        it("Deberia regresar un valor de 40 si se manda valor 2 como 20 y valoe 1 como 20", function(){});
        it("Deberia regresar un error si se manda un string como valor", function(){});
    });
    describe("Resta", function(){

    });
    describe("Multipliación", function(){

    });
    describe("División", function(){

    });


});
