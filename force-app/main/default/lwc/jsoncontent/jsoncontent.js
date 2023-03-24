import { api, LightningElement, track } from 'lwc';
import jsonresource from '@salesforce/resourceUrl/jsonresource';

export default class Jsoncontent extends LightningElement {

    isModalOpen = false;
    jsonValue;
    selectedAuthority;
    consessionTypeValue;
    crnTypeValue;
    isCheckedNext = false;
    isValidate = false;
    isModalOpen = false;

    connectedCallback(){ 
        this.getLabel(); 
    }
    closeModal() {
        this.isModalOpen = false;
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
            if(element.handleValidation(this.selectedAuthority, this.consessionTypeValue, this.crnTypeValue)){
                this.isValidate = true;
                this.isModalOpen = true;
            }
        });
        
    }
}