
const {
    validateTaskParameters
} = require("../../routes/controllers/task.controller");

describe("Task", function(){
    describe("Given that name parameter is correct", function(){
        it("Should return true", function(){
            expect(validateTaskParameters(null)),toEqual(true);
        });
    });
})
