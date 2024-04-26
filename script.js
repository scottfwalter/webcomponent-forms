"use strict";
var _a;
customElements.define("my-input", (_a = class extends HTMLElement {
        constructor() {
            super();
            this._attrs = {};
            this._defaultValue = "";
            this._internals = this.attachInternals();
            this._internals.role = "textbox";
            this.tabindex = 0;
        }
        static get observedAttributes() {
            return ["required", "value"];
        }
        connectedCallback() {
            const shadowRoot = (this.attachShadow({
                mode: "open",
                delegatesFocus: true
            }).innerHTML = `<input type="text" role="none" tabindex="-1" />`);
            this.$input = this.shadowRoot.querySelector("input");
            this.setProps();
            this._defaultValue = this.$input.value;
            this._internals.setFormValue(this.value);
            this._internals.setValidity(this.$input.validity, this.$input.validationMessage, this.$input);
            this.$input.addEventListener("input", () => this.handleInput());
        }
        attributeChangedCallback(name, prev, next) {
            this._attrs[name] = next;
        }
        formDisabledCallback(disabled) {
            this.$input.disabled = disabled;
        }
        formResetCallback() {
            this.$input.value = this._defaultValue;
        }
        checkValidity() {
            return this._internals.checkValidity();
        }
        reportValidity() {
            return this._internals.reportValidity();
        }
        get validity() {
            return this._internals.validity;
        }
        get validationMessage() {
            return this._internals.validationMessage;
        }
        setProps() {
            // prevent any errors in case the input isn't set
            if (!this.$input) {
                return;
            }
            // loop over the properties and apply them to the input
            for (let prop in this._attrs) {
                switch (prop) {
                    case "value":
                        this.$input.value = this._attrs[prop];
                        break;
                    case "required":
                        const required = this._attrs[prop];
                        this.$input.toggleAttribute("required", required === "true" || required === "");
                        break;
                }
            }
            // reset the attributes to prevent unwanted changes later
            this._attrs = {};
        }
        handleInput() {
            this._internals.setValidity(this.$input.validity, this.$input.validationMessage, this.$input);
            this._internals.setFormValue(this.value);
        }
    },
    _a.formAssociated = true,
    _a));
const form = document.getElementById("my-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(`My Input Value - '${formData.get("myInput")}'`);
});