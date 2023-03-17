import { api, LightningElement } from 'lwc';


export default class Childjsoncontent extends LightningElement {
 
    @api fieldName;
    @api fieldType ;
    @api jsonValue ;
    @api newOptions;
    @api selectedValue;
    selectedAuthorityValue;
    stringValue;
    clsName;
    patternValue;
    messageDisplay; 

    @api selectedAuthority;
    @api consessionTypeValue;
    @api crnTypeValue;
    @api isCheckedNext;

    connectedCallback(){
        if(this.fieldName === 'Concession Authority'){
            this.newOptions = this.jsonValue.ConcessionAuthority.authority;
            this.clsName = 'conAuthority';

        }
        else if(this.fieldName === 'Concession Type'){
            this.clsName = 'conType';
 
        }
        else if(this.fieldName === 'CRN Number'){
            this.clsName = 'crnNumber';
        }
    }

    @api 
    getNewOptions(value){
        if(this.fieldName === 'Concession Type'){
            this.selectedValue = null;
            this.newOptions=this.jsonValue.cardType[value];
        }   
        if(this.fieldName === 'CRN Number'){
           
            this.selectedValue = null;
            this.template.querySelector('.crnNumber').setCustomValidity('');
            this.template.querySelector('.crnNumber').reportValidity();
        }
    }

    handleOptionValue(event){ 
      
        this.selectedValue = event.target.value;
        let params={};
        params.fieldLabel = this.fieldName;
        params.fieldValue = this.selectedValue;
        this.selectedAuthorityValue = params.fieldValue;
    
        const selectedEvent = new CustomEvent("selectedjsonvalue", {
        detail: params
        });
        this.dispatchEvent(selectedEvent);
        
       
        let className = '.'+this.clsName;
        this.template.querySelector(className).setCustomValidity('');
        this.template.querySelector(className).reportValidity();
       
        
    }

    @api 
    handleValidation(authValue, conValue, crnValue){
        let className = '.'+this.clsName;
        if(this.fieldName === 'Concession Authority'){
            if(!authValue){
                this.template.querySelector(className).setCustomValidity(this.jsonValue.ErrorConcessionAuthority);
                this.template.querySelector(className).reportValidity();
                
            }
           
           
        }
        else if(this.fieldName === 'Concession Type'){
           if(!conValue){
                this.template.querySelector(className).setCustomValidity(this.jsonValue.ErrorConcessionType);
                this.template.querySelector(className).reportValidity();
            }  
           
       }
       else if(this.fieldName === 'CRN Number'){  
            if(!crnValue){
                this.template.querySelector(className).setCustomValidity(this.jsonValue.ErrorCrnNumber);
                this.template.querySelector(className).reportValidity();
            }
            else{
                this.handleCrnNumberValue(authValue, conValue, crnValue);
                console.log("++++++authValue in else+++++++ ", authValue);
                console.log("+++crnValue in else+++ ", crnValue);
                console.log("++++++conValue in else+++++++ ", conValue);

            }
        }
    }
     
    @api
    handleCrnNumberValue(authValue, conValue, crnValue){
       
        let centerPatternValue = "[0-9]+[A-Za-z]{1}$";
        let telstraPatternValue = "[A-Za-z0-9]{9}$";
        if(authValue == "CenterLink"){
            console.log("Inside If::::");
            if(conValue == "Pensionsers Concession Card"){
                if(!crnValue.match(centerPatternValue)){
                    console.log("+++++++++++childpesioners++++++++++");
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorPensionsersConcessionCard);
                    this.template.querySelector('.crnNumber').reportValidity();

        
                }
            }
            else if(conValue == "Health Care Card"){
                if(!crnValue.match(centerPatternValue)){
                    console.log("+++++++++++childhealth++++++++++");
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorHealthCareCard);
                    this.template.querySelector('.crnNumber').reportValidity();
        
                }
               
            }
            else if(conValue == "Commonwealth Seniors Health Card"){
                if(!crnValue.match(centerPatternValue)){
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorCommonwealthSeniorsHealthCard);
                    this.template.querySelector('.crnNumber').reportValidity();
        
                }
            }
            else if(conValue == "Low Income Card"){
                if(!crnValue.match(centerPatternValue)){
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorLowIncomeCard);
                    this.template.querySelector('.crnNumber').reportValidity();
        
                }
            }
        }
        else if(authValue == "TelstraLink"){
            if(conValue == "Pensionsers Concession Card"){
                if(!crnValue.match(telstraPatternValue)){
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorPensionsersConcessionCardt);
                    this.template.querySelector('.crnNumber').reportValidity();
        
                }
            }
            else if(conValue == "Gold Card"){
                if(!crnValue.match(telstraPatternValue)){
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorGoldCard);
                    this.template.querySelector('.crnNumber').reportValidity();
        
                }
            }
            else if(conValue == "Commonwealth Seniors Health Card"){
                if(!crnValue.match(telstraPatternValue)){
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorCommonwealthSeniorsHealthCardt);
                    this.template.querySelector('.crnNumber').reportValidity();
        
                }
            }
            else if(conValue == "MRCA White Card"){
                if(!crnValue.match(telstraPatternValue)){
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorMRCAWhiteCard);
                    this.template.querySelector('.crnNumber').reportValidity();
        
                }
            }
        }
    }
   

    get isPickList(){
        return this.fieldType === 'picklist' ? true : false;
    }

    get isString(){
        return this.fieldType === 'text' ? true : false;
    }
}