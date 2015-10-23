        var numPat  = /^[0-9]+$/;
        var alphaPat  = /^[a-zA-Z]+$/;
        var emailRegEx = /^([A-Za-z0-9_\-\.#~\$=;%\*,\!\+:&()])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,6})$/;
        var namePat  = /^[a-zA-Z\s.,'\-]+$/;
        var addressPat  = /^[a-zA-Z0-9\s.,'\-]+$/;
        var statePat = /^[A-Za-z\s]+$/;
        var phonePat = /^[.\-0-9()]+$/;

        var NAME_LENGTH = 30;
        var PHONE_LENGTH = 15;
        var ADDRESS_LENGTH = 30;
        var EMAIL_LENGTH = 50;

        var cc_card_type = "";

        document.getElementById("address").addEventListener("change", function(e){handleSelect(e)},false);
        document.getElementById("pizzaChoice").addEventListener("change", function(e){ pizzaDough(e)},false);
        document.getElementById("cheese").addEventListener("change", function(e){ updatePriceTotal(e)},false);
        document.getElementById("sauce").addEventListener("change", function(e){ updatePriceTotal(e)},false);
        document.getElementById("toppings").addEventListener("change", function(e){ updatePriceTotal(e)},false);
        document.getElementById("useDelivery").addEventListener("change", function(e){ copyDelivery(e)},false);
        document.getElementById("ccInfo").addEventListener("change", function(e){ processCCInfo(e)},false);
        document.getElementById("submitOrder").addEventListener("click", function(e){ orderCheck(e)},false);
        document.getElementById("finishPizzaBuild").addEventListener("click", function(e){ finishPizzaBuild(e)},false);
        window.addEventListener("load", console.log.bind(console), false);
  
        var orderCheck = function(e){
            
            e.preventDefault();
            checkBilling();
            
        }
        
        var finishPizzaBuild = function(e){
            e.preventDefault();
            var myConfirm = confirm("Are you sure you are done building Pizza?");
            if(myConfirm){
               
                if(checkForm()){
                    document.getElementById('ccInfo').style.display = "block";
                    document.getElementById('pizzaChoice').style.display = "none";
                     document.getElementById('pizzaPrice').style.display = "none";
                    document.getElementById('cheese').style.display = "none";
                    document.getElementById('sauce').style.display = "none";
                    document.getElementById('toppings').style.display = "none";
                    document.getElementById('finishPizzaBuild').style.display = "none";
                }
            }
        }
        var processCCInfo = function(e){
            
           //  console.log("CC target = " + e.target.id);
             if(e.target.id == "ccNum"){
                 
                 var ccStr = e.target.value.replace(/\s+/g, '');  // strip spaces out
                 if(CheckCCNum(ccStr)){
                     
                    //alert("good CC");
                      document.getElementById('ccNote').innerHTML = "";
                     document.getElementById('ccNum').style.borderColor = "lightgray";
                 }
                 else{
                     alert("Credit Card Number Error");
                      document.getElementById('ccNum').style.borderColor = "red";
                      document.getElementById('ccNote').innerHTML = "Credit Card is Invalid, Try Again";
                 }
             }
            
        }
          var ccSubmitCheck = function(id){
            
             if(id == "ccNum"){
                 var ccStr = document.getElementById("ccNum").value;
                 ccStr = ccStr.replace(/\s+/g, '');  // strip spaces out
                 if(CheckCCNum(ccStr)){
                     
                    //alert("good CC");
                      document.getElementById('ccNote').innerHTML = "";
                     document.getElementById('ccNum').style.borderColor = "lightgray";
                     return true;
                 }
                 else{
                     alert("Credit Card Number Error");
                      document.getElementById('ccNum').style.borderColor = "red";
                      document.getElementById('ccNote').innerHTML = "Credit Card is Invalid, Try Again";
                     return false;
                 }
             }
            
        }      
        var CheckCCNum = function(cc){
            
            var goodCC = false;
            var alertStr = "";
        
            if(!patternChecks(cc,numPat,16, 13)){  // max length - 16 min length - 13

                return false;
            }
            else if(cc.length == 14){
                
                return false;
            }
            else if(cc.length == 15 && cc.indexOf("37") == 0){
                goodCC = true;
                cc_card_type = "American Express";
                document.getElementById("cardType").innerHTML = cc_card_type;
            }
            else if(cc.length == 13 && cc.indexOf("4") == 0){
                goodCC = true;
                cc_card_type = "Visa";
                document.getElementById("cardType").innerHTML = cc_card_type;
            }
            else if(cc.length == 16){
                
                if(cc.indexOf("4") == 0){
                    goodCC = true;  
                    cc_card_type = "Visa";
                    document.getElementById("cardType").innerHTML = cc_card_type;
                }
                else if((cc.indexOf("51") == 0) || (cc.indexOf("52") == 0) || (cc.indexOf("53") == 0) || (cc.indexOf("54") == 0) || (cc.indexOf("55") == 0)){
                    goodCC = true;
                    cc_card_type = "MasterCard";
                    document.getElementById("cardType").innerHTML = cc_card_type;
                }
            }
            
            if(goodCC){
               
               goodCC = doLuhn(cc);
            }
            
            return goodCC;
        }
        
        var doLuhn = function(cc) {
            
            var luhnArray = [];
            var luhnIndex = 0;
            var luhnTotal = 0;
            var modCounter = 0;
            for(var i = cc.length - 1;i >= 0; i--){
                
                if(modCounter++%2 == 1){
                    
                    var newNum = Number(cc.charAt(i)) * 2;
                    
                    if(newNum >= 10){
                        
                        var twoDigitStr = newNum.toString();
                        luhnArray[luhnIndex++] = Number(twoDigitStr.charAt(1));
                        luhnArray[luhnIndex++] = Number(twoDigitStr.charAt(0));
                    }
                    else{
                        luhnArray[luhnIndex++] = Number(newNum);
                    }
                }
                else{
                    luhnArray[luhnIndex++] = Number(cc.charAt(i));
                }
              //  console.log(" index[" + eval(luhnIndex -1) + " - " + luhnArray[luhnIndex -1]);
            }
            // sum the array
            for(var i = 0;i < luhnArray.length;i++){
                
                luhnTotal += luhnArray[i];
            }
            
            if((luhnTotal % 10) == 0){            
                return true;
            }
            else{
                return false;
            }    
        }
        
        
        var handleSelect = function(e){
            if(e.target.value.toLowerCase() == "other"){
                document.getElementById('other').style.display = "block";
            }
        }
        var validate = function(e){
            
            if(e.target.value.toLowerCase() == "other"){
                document.getElementById('other').style.display = "block";
            }
        } 
        var pizzaDough = function(e){
            
                Dough.showDough(e);
        }    

        var part1Validate = function(e){
            
            if(checkForm() == true){
                
                document.getElementById('cheese').style.display = "block";
                document.getElementById('sauce').style.display = "block";
                document.getElementById('toppings').style.display = "block";
                document.getElementById('finishPizzaBuild').style.display = "block";
            }
        }
        var Dough = {
            
	           showDough: function(e) {
                   
                   var myPrice;
                   switch(e.target.value){
                      
                       case "hand":  myPrice = Object.create(HandTossed); 
                                       break;
                       case "thin":  myPrice = Object.create(ThinCrust);
                                       break;
                       case "nyStyle":  myPrice = Object.create(NYStyle);
                                        break;
                           
                       case "glutenFree":  myPrice = Object.create(GlutenFree);
                                            break;
                           
                   }

                   var myform = document.getElementById("pizzaForm");
                   var myNewSelect = document.getElementById("pizzaPrice");
                   if(myNewSelect != null){
                     myform.removeChild(myNewSelect);
                   }

                   var mySelect = document.getElementById("pizzaChoice"); 
                   var sizeSelect = document.createElement("select"); 
                   var thisAttribute = document.createAttribute("id");
                   thisAttribute.value = "pizzaPrice"; 
                   sizeSelect.setAttributeNode(thisAttribute); 
                   
                  var newOption = document.createElement("option"); 
                  var optionText = document.createTextNode("Choose Size:");
                  newOption.appendChild(optionText);
                  sizeSelect.appendChild(newOption);                    
                  for(var key in myPrice) {

                      var val = myPrice[key];
                      
                //      if(key != "crust"){
                            var newOption = document.createElement("option"); 
                            var thisAttribute = document.createAttribute("value");
                            thisAttribute.value = val;
                            newOption.setAttributeNode(thisAttribute); 
                            var optionText = document.createTextNode(key + " - $" + val);
                            newOption.appendChild(optionText);
                            sizeSelect.appendChild(newOption); 
                 //     }
                  } 
                
              //    myform.appendChild(sizeSelect);
                    var myCheese = document.getElementById("cheese"); 
                   myform.insertBefore(sizeSelect,myCheese);
                   
                    document.getElementById("pizzaPrice").addEventListener("change", function(e){ part1Validate(e)},false);
                   document.getElementById("pizzaPrice").addEventListener("change", function(e){ updatePriceTotal(e)},false);
 
               }
        } 
    
        var HandTossed = {
           //     crust: "Hand Tossed",
                small: "9.99",
                medium: "12.99",
                large:  "14.99"
        };
        var ThinCrust = {
            //    crust: "Thin Crust",
                medium:  "11.99",
                large:  "12.99"
        };       
        var NYStyle = {
             //   crust: "New York Style",
                large:  "16.99",
                extralarge:  "19.99"
        };        
        var GlutenFree = {
             //   crust: "Gluten Free",
                small: "10.99"
        }; 

        var updatePriceTotal = function(){
             
            var priceTotal = 0;
            var piePrice = document.getElementById("pizzaPrice").value;
            priceTotal += parseFloat(piePrice);
            
            //var cheesePrice = document.getElementById("cheese").value
            var cheesePrice =  document.pizzaForm.cheese.value;
            
            if(cheesePrice != undefined && (isNaN(cheesePrice) == false)){
                
                priceTotal += parseFloat(cheesePrice);
            }
            var saucePrice = document.pizzaForm.sauce.value
            
            if(saucePrice != undefined && (isNaN(saucePrice) == false)){
                
                priceTotal += parseFloat(saucePrice);
            }
            
            var toppingsTotal = 0;
            for (i = 0; i < document.pizzaForm.toppings.length; i++) {
                if (document.pizzaForm.toppings[i].checked) {
                    toppingsTotal += .99;
                }
            }
            
            priceTotal += parseFloat(toppingsTotal);
          //  console.log("piePrice = " + cheesePrice + ", sauce = " + saucePrice + ", toppings = " + toppingsTotal);
                      
            document.getElementById("priceTotal").innerHTML = Number(priceTotal.toFixed(2));
        }
        
        var copyDelivery = function(e){
            
            var myElement = document.getElementById("copyDelivery");
            if (myElement.checked) {
               
                document.pizzaForm.ccName.value =  document.pizzaForm.name.value;
                document.pizzaForm.ccAddress.value = document.pizzaForm.address.value;
                document.pizzaForm.ccApt.value = document.pizzaForm.apt.value;
                document.pizzaForm.ccCity.value = document.pizzaForm.city.value;
                document.pizzaForm.ccState.value = document.pizzaForm.state.value;
                document.pizzaForm.ccZip.value = document.pizzaForm.zip.value;
                document.pizzaForm.ccPhone.value = document.pizzaForm.phone.value;
            }            
        }

          function patternChecks(nameVal,thisPattern,thisLength,minLength) {

              // if minLength == 0 it means this is an optional arg with no value
              // so return true
              if(minLength > 0){
                  
                    if(nameVal == null || nameVal == "") {  return false; }

                    if(nameVal.length < 0 || nameVal.length > thisLength) { return false; }
                    if(arguments.length > 3){ 

                        if(nameVal.length < minLength) { return false; }
                    }
                    var matchA = nameVal.match(thisPattern);

                    if(matchA == null){ return false; }
              }
              return true;
          }        
        function checkForm(){

            var alertStr = "Error in input fields: \n"
            var badInput = 0;

            var inputName = document.pizzaForm.name.value;
            var address = document.pizzaForm.address.value;
            var unitNum = document.pizzaForm.apt.value;
            var other = document.pizzaForm.other.value;
            var city = document.pizzaForm.city.value;
            var state = document.pizzaForm.state.value;
            var zip = document.pizzaForm.zip.value;
            var email = document.pizzaForm.email.value;
            var phone = document.pizzaForm.phone.value;
            
            var addressTypeSelect = document.pizzaForm.addressType.selectedIndex;
            var doughRadios = document.pizzaForm.elements.dough;

            if(!patternChecks(inputName,namePat,NAME_LENGTH, 3)){

                alertStr += "Name\n"; badInput++;
            }
       
            if(!patternChecks(address,addressPat,ADDRESS_LENGTH, 3)){

                alertStr += "Address\n"; badInput++;
            }
            
            if(addressTypeSelect < 1){
                
                alertStr += "Address Type\n"; badInput++;
            }
            
            if(!patternChecks(unitNum,addressPat,10, 0)){

                alertStr += "Unit Number\n"; badInput++;
            } 
            
            if(!patternChecks(other,addressPat,ADDRESS_LENGTH, 0)){

                alertStr += "Other Type\n"; badInput++;
            } 
 
            if(!patternChecks(city,namePat,ADDRESS_LENGTH, 3)){

                alertStr += "City\n"; badInput++;
            }
            
            if(!patternChecks(state,statePat,2, 2)){

                alertStr += "State must be 2 characters only\n"; badInput++;
            }
            if(!patternChecks(zip,numPat,5,5)){

                alertStr += "Zip Code\n"; badInput++;
            }
            if(!patternChecks(phone,phonePat,PHONE_LENGTH,10)){

                alertStr += "Phone\n"; badInput++;
            }
            if(!patternChecks(email,emailRegEx,EMAIL_LENGTH,7)){

                alertStr += "Email\n"; badInput++;
            }
                        
            var doughChecked = false;
            for(var i=0; i < doughRadios.length; i++){
                if(doughRadios[i].checked) {
                    doughChecked = true;
                    break;
                }
            }
            if(!doughChecked){
                alertStr += "Dough not selected\n"; badInput++;
            }
            if(badInput > 0){

                alert(alertStr);
                return false;
            }
            else{
                return true;
            }

        }    
          
          function checkBilling(){

            var alertStr = "Error in input fields: \n"
            var badInput = 0;

           //   alert("checkBilling");
            var inputName = document.pizzaForm.ccName.value;
            var address = document.pizzaForm.ccAddress.value;
            var unitNum = document.pizzaForm.ccApt.value;
            var city = document.pizzaForm.ccCity.value;
            var state = document.pizzaForm.ccState.value;
            var zip = document.pizzaForm.ccZip.value;
            var phone = document.pizzaForm.ccPhone.value;
            var cvc = document.pizzaForm.cvc.value;

            if(!patternChecks(inputName,namePat,NAME_LENGTH, 3)){

                alertStr += "Name\n"; badInput++;
            }
       
            if(!patternChecks(address,addressPat,ADDRESS_LENGTH, 3)){

                alertStr += "Address\n"; badInput++;
            }
            
            if(!patternChecks(unitNum,addressPat,10, 0)){

                alertStr += "Unit Number\n"; badInput++;
            } 
 
            if(!patternChecks(city,namePat,ADDRESS_LENGTH, 3)){

                alertStr += "City\n"; badInput++;
            }
            
            if(!patternChecks(state,statePat,2, 2)){

                alertStr += "State must be 2 characters only\n"; badInput++;
            }
            if(!patternChecks(zip,numPat,5,5)){

                alertStr += "Zip Code\n"; badInput++;
            }
            if(!patternChecks(phone,phonePat,PHONE_LENGTH,10)){

                alertStr += "Phone\n"; badInput++;
            }
            if(!patternChecks(cvc,numPat,3,3)){

                alertStr += "CVC Code\n"; badInput++;
            }
            var month = Number(document.pizzaForm.expMonth.value); 
            var year = Number(document.pizzaForm.expYear.value);
            var d = new Date();
            var currentMonth = d.getMonth();
            if(year < 16 && month < currentMonth){
                alertStr += "Credit Card is Expired\n"; badInput++;
            }
           
            if(ccSubmitCheck("ccNum") == false){
                 badInput++;
            }
              
      //        console.log("month = " + month + " year " + year);
            if(badInput > 0){

                alert(alertStr);
                return false;
            }
            else{
                alert("Thank you for your order");
                return true;
            }

        }      
 