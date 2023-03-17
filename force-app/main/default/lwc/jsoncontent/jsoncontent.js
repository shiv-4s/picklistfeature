import { api, LightningElement } from 'lwc';
import jsonresource from '@salesforce/resourceUrl/jsonresource';

export default class Jsoncontent extends LightningElement {

    jsonValue;
    
    selectedAuthority;
    consessionTypeValue;
    crnTypeValue;
    isCheckedNext = false;
 
    connectedCallback(){ 
        this.getLabel(); 
    }

    getLabel(){

        var request = new XMLHttpRequest();
        request.open("GET", jsonresource, false);
        request.send();
        this.jsonValue = JSON.parse(request.responseText,this.jsonValue);

    }


    handleSelectValue(event){

       let selectedValue = event.detail;
        if(selectedValue.fieldLabel === 'Concession Authority'){
            this.selectedAuthority = selectedValue.fieldValue;
            console.log("+++parentselectedAuthorityvalue+++ ", this.selectedAuthority);
            this.template.querySelectorAll('c-childjsoncontent').forEach( element => {
                element.getNewOptions(this.selectedAuthority);
            });
        }
        else if(selectedValue.fieldLabel === 'Concession Type'){
            this.consessionTypeValue = selectedValue.fieldValue;
            console.log("+++parentconsessionTypeValuevalue+++ ", this.consessionTypeValue);
            if(this.isCheckedNext){
                this.template.querySelectorAll('c-childjsoncontent').forEach( element => {
                    element.handleValidation(this.selectedAuthority, this.consessionTypeValue, this.crnTypeValue);
                });
            }

        }
        else if(selectedValue.fieldLabel === 'CRN Number'){
            this.crnTypeValue = selectedValue.fieldValue;
            console.log("+++parentcrnTypeValuevalue+++ ", this.crnTypeValue);
           
        }

    }

   
    goToNext(){
      this.isCheckedNext = true;
        this.template.querySelectorAll('c-childjsoncontent').forEach(element => {
            element.handleValidation(this.selectedAuthority, this.consessionTypeValue, this.crnTypeValue);
        });
        
    }
}