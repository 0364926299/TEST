
 // đối tượng calodator

function Validator ( options){

    function Validate( inputElement, rule ){
        var errorMessage= rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

        if (errorMessage){
            errorElement.innerText= errorMessage; 
            inputElement.parentElement.classList.add('invalid');
           } else{
            errorElement.innerText='';
            inputElement.parentElement.classList.remove('invalid');
           }

     
    }

    // laays element cua form can validate
    var formElement = document.querySelector(options.form);
    if(formElement){
        options.rules.forEach(function (rule){
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                 // xu lý trường hợp blur khoi input
                inputElement.onblur = function(){
    
                    Validate(inputElement, rule);
                   
                }
                // xử lý người dùng nhập input

                inputElement.oninput = function( ){
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText='';

                    inputElement.parentElement.classList.remove('invalid');
                }
            }

         });
    }
}
//  Định nghĩa các rules 
// nguyeen tac cua cac rules;
// 1. khi có lỗi => trả ra messenger lỗi ;
// 2. khi hợp lệ => không trả ra cái gì cả (undeffined)
Validator.isRequired = function(selector,message ){
   return{
        selector: selector,
        test : function(value){
           return value.trim() ? undefined :message ||'! Vui lòng nhập lại ';
        }
   } 
}
Validator.isEmail = function(selector,message){
    return{
        selector: selector,
        test : function( value){
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
                return  regex.test(value)? undefined: message ||' !Vui Lòng nhập email';

        }
   } 
}

Validator.minLength = function(selector, min ,message ){
    return{
        selector: selector,
        test: function( value){
               
                return  value.length >= min ? undefined:message || `vui lòng nhập tối thiểu ${min} ký tự `;

        }
   } 
}
 Validator.isConfirmed =function(selector, getCofirmValue ,message){
     return{
         selector: selector, 
         test :function(value){
            return  value === getCofirmValue ()? undefined : message ||'Giá trị nhập vào không chính xác';

         }
     }

 }
