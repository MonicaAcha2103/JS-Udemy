var budgetController = (function() {

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0) {
        this.percentage = Math.round((this.value/totalIncome)*100);
        } else {
            this.percentage =-1;
        }
    };
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;

    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {

            sum += cur.value;

        });
        data.totals[type] = sum;

    };

    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        },
        budget : 0,
        percentage : 0  
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            } else {
            ID = 0;
            }
            //Create new item
            if(type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            //Push into our Data structure
            data.allItems[type].push(newItem);
            //return the item
            return newItem;
        },

        deleteItem : function(type,id) {
           //map loops thrugh every element ike foreach. But map returns a brand new array
           var ids,index; 
           ids = data.allItems[type].map(function(current){
                return current.id;
           });   

           index = ids.indexOf(id);
           if(index !== -1) {
            data.allItems[type].splice(index,1);
            //what to delete and how many elements to delete
            //so many remove an element the a particular index and one element only
           }
        },

        calculateBudget: function(){
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate budget: icome- expense
            data.budget = data.totals.inc - data.totals.exp;
 
            if(data.totals.inc > 0){
            //calculate the percentage of income spent
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else {
                data.percentage = -1; 
            }

        },

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(curr){
                curr.calcPercentage(data.totals.inc);
                
            })

        },
        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(curr){
               return curr.getPercentage();
                
            })
            return allPerc;
        },

        getBugdet: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }

        },
        testing:function(){
            console.log(data);
        }
    }

})();

var UIController = (function(){

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue : '.add__value',
        inputButton: '.add__btn',
        incomeContainer:'.income__list',
        expenseContainer:'.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel : '.budget__expenses--value',
        percentageLabel : '.budget__expenses--percentage',
        container : '.container',
        expensesPercLabel:'.item__percentage',
        dateLabel: '.budget__title--month'
    };
    var formatNumber = function(num,type){
        var numSplit, int, dec;
        // + or - before numbers
        // exactly 2 decimal points
        //comma seperation thousands
        
        num = Math.abs(num);// abs remove sign from the number
        num = num.toFixed(2);// 2 decimal points
        numSplit= num.split('.');
        int = numSplit[0];
        dec= numSplit[1];
        if(int.length > 3 ) {
            int.substr(0,int.length -3 ) + ',' + int.substr(int.length -3,int.length);
        }

        
        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;
    };
    var nodeListForEach = function(nodeList, callback) {
        for(var i = 0; i < nodeList.length; i++) {
        callback(nodeList[i], i);
        }
        };
    return {
        getInput : function(){
            return{
                 type : document.querySelector(DOMstrings.inputType).value,
                 description : document.querySelector(DOMstrings.inputDescription).value,
                 value : parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }

        },

        getDOMstrings: function(){
            return DOMstrings;
        },
        clearFields: function(){
            var fields;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue );
            //fields return a list
            var fieldsArr = Array.prototype.slice.call(fields);
            //slice can be used with arrays only. But we can fool the system, by passing the list within the call method, ie can be accessed by 'this'

            fieldsArr.forEach(function(current , index , array){
                current.value = "";

            });

            fieldsArr[0].focus();

        },

        displayBudget: function(obj) {
            var type; 
            obj.budget > 0 ?  type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');


            if(obj.percentage > 0 ){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },
        displayPercentages: function(percentages){
            
            var fields;
            //this returns a nodelist
            //can be used with foreach in current browsers
            fields = document.querySelectorAll(DOMstrings.expensesPercLabel);


            Array.prototype.forEach.call(fields, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });

        },

        displayMonth: function(){
            var now, year, month;
            now = new Date();
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
            month= now.getMonth();
            year = now.getFullYear();
             document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
           
        },
        changedType: function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);

        nodeListForEach(fields, function(item) {
        item.classList.toggle('red-focus');
        });
        document.querySelector(DOMstrings.inputButton).classList.toggle('red');
        },

        addListItem: function(obj, type){
            //create Html string with placeholder
            var html,newhtml;
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if(type === 'exp') {
                element = DOMstrings.expenseContainer;
                html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }
            // replace the placeholder text with actual data
            newhtml = html.replace('%id%', obj.id);
            newhtml = newhtml.replace('%description%', obj.description);
            newhtml = newhtml.replace('%value%', formatNumber(obj.value), type);

            //Insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newhtml);
    
        },
        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        }
        
    }
    

})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
    var setupEventListeners = function(){
        var DOM= UICtrl.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click',CtrlAddItem);

        document.addEventListener('keypress',function(event){
            if(event.keyCode === 13 || event.which === 13){
                CtrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click',CtrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changedType);

    };

    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. return the budget
        var budget = budgetCtrl.getBugdet();
        //console.log(budget);

        // 3. Display the budget to the UI
        UICtrl.displayBudget(budget);
    };

   var updatePercentages = function() {
       //1.calculate percentages
    budgetCtrl.calculatePercentages();
    var percentages = budgetCtrl.getPercentages();
       //2. read from budget controller
       //3. Update UI
       UICtrl.displayPercentages(percentages);
   };

    var CtrlAddItem = function(){
        
        var input, newItem;
        //1. Get field input data


        input = UICtrl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {

        //2. Add item to budget controller
        var newItem =budgetCtrl.addItem(input.type, input.description, input.value)

        //3. Add item to the UI
        UICtrl.addListItem(newItem, input.type);

        //4. Clear the fields
        UICtrl.clearFields();

        //5. Calculate and update budget 
        updateBudget();
        //6. Calculate and update the percentages
        updatePercentages();         
        }  
    };
    
    var CtrlDeleteItem = function(event) {
        var itemID, splitID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID) {
             splitID = itemID.split('-');
             type = splitID[0];
             id = parseInt(splitID[1]);

             //1. delete the item from DS
             budgetCtrl.deleteItem(type,id);
             //2. Delete from UI
             UICtrl.deleteListItem(itemID);
             //3. Update budget
             updateBudget();
             //4. Calculate and update the percentages
            updatePercentages();    
        }

    }

    return {
        init: function(){
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();

        }
        
    };
    
})(budgetController, UIController);

controller.init();

