//BUdget Controller
var budgetController = (function () {
        var Expense = function (id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        };

        var Income = function (id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        };



        var data = {
            allItems: {
                exp: [],
                inc: []
            },
            totals: {
                exp: 0,
                inc: 0
            }
        };

        return {
            addItem: function (type, des, val) {
                var newItem, ID;

                //Creating new ID
                if (data.allItems[type].length > 0) {
                    ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                } else {
                    ID = 0;
                }

                //Making new obj based on Income and Expenditure
                if (type === 'exp') {
                    newItem = new Expense(ID, des, val);
                } else if (type === 'inc') {
                    newItem = new Income(ID, des, val);
                }

                //Pushing into the newItem
                data.allItems[type].push(newItem);
                return newItem;;

            },
            testing: function () {
                console.log(data);
            }
        }




    }

)();



//UI Controller
var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value

            };


        },
        getDOMstrings: function () {
            return DOMStrings;
        }
    }

})();


//Global App Controller
var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

    };



    var ctrlAddItem = function () {
        //Getting the input from the input field
        var input = UICtrl.getInput();

        //Adding the item in budgetCtrl function
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    }


    return {
        init: function () {
            console.log("Application has started");
            setupEventListeners();
        }
    }
})(budgetController, UIController);


controller.init();