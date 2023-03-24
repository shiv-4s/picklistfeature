import { api, LightningElement } from 'lwc';
export default class Childjsoncontent extends LightningElement {
    
    @api fieldName;
    @api fieldType;
    @api jsonValue;
    @api newOptions;
    @api selectedValue;
    selectedAuthorityValue;
    clsName;
    @api finalCrnValue;
    oldCrnValue;
    @api selectedAuthority;
    @api consessionTypeValue;
    @api isCheckedNext;

    connectedCallback() {

        if (this.fieldName === 'Concession Authority') {
            this.newOptions = this.jsonValue.ConcessionAuthority.authority;
            this.clsName = 'conAuthority';

        }
        else if (this.fieldName === 'Concession Type') {
            this.clsName = 'conType';

        }
        else if (this.fieldName === 'CRN Number') {
            this.clsName = 'crnNumber';
        }
    }

    @api
    getNewOptions(value) {
        if (this.fieldName === 'Concession Type') {
            this.selectedValue = null;
            this.newOptions = this.jsonValue.cardType[value];
        }
        if (this.fieldName === 'CRN Number') {
            this.template.querySelector('.crnNumber').setCustomValidity('');
            this.template.querySelector('.crnNumber').reportValidity();
            this.selectedValue = null;

        }
    }

    handleOptionValue(event) {

        //this.isCheckedNext=true;
        this.selectedValue = event.target.value;
        let params = {};
        params.fieldLabel = this.fieldName;
        params.fieldValue = this.selectedValue;
        this.selectedAuthorityValue = params.fieldValue;
        const selectedEvent = new CustomEvent("selectedjsonvalue", {
            detail: params
        });
        this.dispatchEvent(selectedEvent);
        let className = '.' + this.clsName;
        this.template.querySelector(className).setCustomValidity('');
        this.template.querySelector(className).reportValidity();

        console.log("+++++selectvalue+++++++++++ ", this.selectedValue);

        if(this.fieldName === "Concession Authority"){
            this.selectedAuthority = this.selectedValue;
        }
        if(this.fieldName === "Concession Type"){
            this.consessionTypeValue = this.selectedValue;
        }
        if(this.fieldName === "CRN Number"){
            this.finalCrnValue = this.selectedValue;
        }

        console.log("++++childselectedAuthority++++ ", this.selectedAuthority);
        console.log("++++childconsessionTypeValue++++ ", this.consessionTypeValue);
        console.log("++++isCheckedNext++++ ", this.isCheckedNext);


        if(this.isCheckedNext){
            this.handleValidation(this.selectedAuthority, this.consessionTypeValue, this.finalCrnValue)
        }

    }

    @api
    handleValidation(authValue, conValue, crnValue) {
        let className = '.' + this.clsName;
        if (this.fieldName === 'Concession Authority') {
            if (!authValue) {
                this.template.querySelector(className).setCustomValidity(this.jsonValue.ErrorConcessionAuthority);
                this.template.querySelector(className).reportValidity();
            }
        }
        else if (this.fieldName === 'Concession Type') {
            if (!conValue) {
                this.template.querySelector(className).setCustomValidity(this.jsonValue.ErrorConcessionType);
                this.template.querySelector(className).reportValidity();
            }
        }
        else if (this.fieldName === 'CRN Number') {

            if (!crnValue) {
                this.template.querySelector(className).setCustomValidity(this.jsonValue.ErrorCrnNumber);
                this.template.querySelector(className).reportValidity();
            }
            else {
                return this.handleCrnNumberValue(authValue, conValue, crnValue);
            }
        }
    }

    handleCrnNumberValue(authValue, conValue, crnValue){
        console.log("+++authValue+++ ", authValue);
        console.log("+++conValue+++ ", conValue);
        console.log("+++crnValue+++ ", crnValue);
        if (authValue == "CenterLink") {
            const centerPattern = /([0-9]{9})([A-Za-z]{1}$)/;
            if (conValue == "Pensionsers Concession Card") {
                console.log("++++++++++++crnvaluelength+++++++ ", crnValue.length);
                if (!crnValue.match(centerPattern) || crnValue.length !== 10){
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorPensionsersConcessionCard);
                    this.template.querySelector('.crnNumber').reportValidity();
                }
                else {
                    this.finalCrnValue = crnValue;
                    console.log("++++++finalcrnvalue+++++ ", this.finalCrnValue);
                    return this.finalCrnValue;
                }

            }
            else if (conValue == "Health Care Card") {
                console.log("++++++++++++crnvaluelength+++++++ ", crnValue.length);
                if (!crnValue.match(centerPattern) || crnValue.length !== 10){
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorHealthCareCard);
                    this.template.querySelector('.crnNumber').reportValidity();
                }
                else {
                    this.finalCrnValue = crnValue;
                    console.log("++++++finalcrnvalue+++++ ", this.finalCrnValue);
                    return this.finalCrnValue;
                }


            }
            else if (conValue == "Commonwealth Seniors Health Card") {
                console.log("++++++++++++crnvaluelength+++++++ ", crnValue.length);
                if (!crnValue.match(centerPattern) || crnValue.length !== 10){
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorCommonwealthSeniorsHealthCard);
                    this.template.querySelector('.crnNumber').reportValidity();
                }
                else {
                    this.finalCrnValue = crnValue;
                    console.log("++++++finalcrnvalue+++++ ", this.finalCrnValue);
                    return this.finalCrnValue;
                }

            }
            else if (conValue == "Low Income Card") {
                console.log("++++++++++++crnvaluelength+++++++ ", crnValue.length);
                if (!crnValue.match(centerPattern) || crnValue.length !== 10){
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorLowIncomeCard);
                    this.template.querySelector('.crnNumber').reportValidity();
                }
                else {
                    this.finalCrnValue = crnValue;
                    console.log("++++++finalcrnvalue+++++ ", this.finalCrnValue);
                    return this.finalCrnValue;
                }   

            }
        }
        else if (authValue == "TelstraLink") {
            const telstraPattern = /[A-Za-z0-9]{8,9}$/;
            if (conValue == "Pensionsers Concession Card") {
                console.log("++++++++++++crnvaluelength+++++++ ", crnValue.length);
                if (!crnValue.match(telstraPattern) || crnValue.length !== 9 || crnValue.length !== 8) {
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorPensionsersConcessionCardt);
                    this.template.querySelector('.crnNumber').reportValidity();
                }
                else {
                    this.finalCrnValue = crnValue;
                    console.log("++++++finalcrnvalue+++++ ", this.finalCrnValue);
                    return this.finalCrnValue;
                }

            }
            else if (conValue == "Gold Card") {
                console.log("++++++++++++crnvaluelength+++++++ ", crnValue.length);
                if (!crnValue.match(telstraPattern) || crnValue.length !== 9) {
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorGoldCard);
                    this.template.querySelector('.crnNumber').reportValidity();
                }
                else {
                    this.finalCrnValue = crnValue;
                    console.log("++++++finalcrnvalue+++++ ", this.finalCrnValue);
                    return this.finalCrnValue;
                }

            }
            else if (conValue == "Commonwealth Seniors Health Card") {
                console.log("++++++++++++crnvaluelength+++++++ ", crnValue.length);
                if (!crnValue.match(telstraPattern) || crnValue.length !== 9) {
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorCommonwealthSeniorsHealthCardt);
                    this.template.querySelector('.crnNumber').reportValidity();
                }
                else {
                    this.finalCrnValue = crnValue;
                    console.log("++++++finalcrnvalue+++++ ", this.finalCrnValue);
                    return this.finalCrnValue;
                }

            }
            else if (conValue == "MRCA White Card") {
                console.log("++++++++++++crnvaluelength+++++++ ", crnValue.length);
                if (!crnValue.match(telstraPattern) || crnValue.length !== 9) {
                    this.template.querySelector('.crnNumber').setCustomValidity(this.jsonValue.ErrorMRCAWhiteCard);
                    this.template.querySelector('.crnNumber').reportValidity();
                }
                else {
                    this.finalCrnValue = crnValue;
                    console.log("++++++finalcrnvalue+++++ ", this.finalCrnValue);
                    return this.finalCrnValue;
                }

            }
        }
    }


    get isPickList() {
        return this.fieldType === 'picklist' ? true : false;
    }

    get isString() {
        return this.fieldType === 'text' ? true : false;
    }
}