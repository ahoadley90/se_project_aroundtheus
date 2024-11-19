!function(){"use strict";class t{constructor(t){this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(t){"Escape"===t.key&&this.close()}setEventListeners(){this._popup.addEventListener("mousedown",(t=>{(t.target.classList.contains("modal_opened")||t.target.classList.contains("modal__close"))&&this.close()}))}}class e extends t{constructor(t,e){super(t),this._handleFormSubmit=e,this._form=this._popup.querySelector(".modal__form"),this._inputs=this._form.querySelectorAll(".modal__input"),this._submitButton=this._form.querySelector(".modal__button")}_getInputValues(){const t={};return this._inputs.forEach((e=>{t[e.name]=e.value})),t}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(t=>{t.preventDefault(),this._handleFormSubmit(this._getInputValues()),this._form.reset()}))}getForm(){return this._form}resetForm(){this._form.reset()}setInputValues(t){this._inputs.forEach((e=>{e.value=t[e.name]}))}}class s{constructor(t,e,s){this._name=t.name,this._link=t.link,this._cardSelector=e,this._handleImageClick=s,this._element=null,this._cardImage=null,this._cardTitle=null,this._likeButton=null,this._deleteButton=null}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}_setEventListeners(){this._likeButton.addEventListener("click",(()=>this._handleLikeClick())),this._deleteButton.addEventListener("click",(()=>this._handleDeleteClick())),this._cardImage.addEventListener("click",(()=>this._handleImageClick(this._name,this._link)))}_handleLikeClick(){this._likeButton.classList.toggle("card__like-button_active")}_handleDeleteClick(){this._element.remove(),this._element=null}generateCard(){return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".card__image"),this._cardTitle=this._element.querySelector(".card__title"),this._likeButton=this._element.querySelector(".card__like-button"),this._deleteButton=this._element.querySelector(".card__delete-button"),this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardTitle.textContent=this._name,this._setEventListeners(),this._element}}class n{constructor(t,e){this._settings=t,this._formElement=e,this._inputList=Array.from(this._formElement.querySelectorAll(this._settings.inputSelector)),this._buttonElement=this._formElement.querySelector(this._settings.submitButtonSelector),this._errorElements=this._inputList.reduce(((t,e)=>(t[e.id]=this._formElement.querySelector(`#${e.id}-error`),t)),{})}_showInputError(t,e){const s=this._errorElements[t.id];t.classList.add(this._settings.inputErrorClass),s.textContent=e,s.classList.add(this._settings.errorClass)}_hideInputError(t){const e=this._errorElements[t.id];t.classList.remove(this._settings.inputErrorClass),e.classList.remove(this._settings.errorClass),e.textContent=""}_checkInputValidity(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}_hasInvalidInput(){return this._inputList.some((t=>!t.validity.valid))}_toggleButtonState(){this._hasInvalidInput()?this.disableButton():(this._buttonElement.classList.remove(this._settings.inactiveButtonClass),this._buttonElement.disabled=!1)}disableButton(){this._buttonElement.classList.add(this._settings.inactiveButtonClass),this._buttonElement.disabled=!0}_setEventListeners(){this._toggleButtonState(),this._inputList.forEach((t=>{t.addEventListener("input",(()=>{this._checkInputValidity(t),this._toggleButtonState()}))}))}enableValidation(){this._formElement.addEventListener("submit",(t=>{t.preventDefault()})),this._setEventListeners()}resetValidation(){this._toggleButtonState(),this._inputList.forEach(this._hideInputError.bind(this))}}const i={},o=document.querySelector("#profile__edit-button"),r=document.querySelector(".profile__add-button"),a=(document.querySelector(".profile__title"),document.querySelector(".profile__description"),new e("#profile__edit_modal",(function(t){_.setUserInfo({name:t.title,job:t.description}),a.close()}))),l=new e("#card__edit_modal",(function(t){const e=u({name:t.title,link:t.url});d.addItem(e),l.close(),i["card-form"].disableButton()})),c=new class extends t{constructor(t){super(t),this._image=this._popup.querySelector(".modal__image"),this._caption=this._popup.querySelector(".modal__caption")}open(t){let{name:e,link:s}=t;this._image.src=s,this._image.alt=e,this._caption.textContent=e,super.open()}}("#image_modal"),_=new class{constructor(t){let{nameSelector:e,jobSelector:s}=t;this._nameElement=document.querySelector(e),this._jobElement=document.querySelector(s)}getUserInfo(){return{name:this._nameElement.textContent,job:this._jobElement.textContent}}setUserInfo(t){let{name:e,job:s}=t;this._nameElement.textContent=e,this._jobElement.textContent=s}}({nameSelector:".profile__title",jobSelector:".profile__description"});function u(t){return new s(t,"#card__template",m).generateCard()}function m(t,e){c.open({name:t,link:e})}const d=new class{constructor(t,e){let{items:s,renderer:n}=t;this._items=s,this._renderer=n,this._container=document.querySelector(e)}renderItems(){this._items.forEach((t=>{this._renderer(t)}))}addItem(t){this._container.prepend(t)}}({items:[{name:"Yosemite Valley",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"},{name:"Lake Louise",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"},{name:"Bald Mountains",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"},{name:"Latemar",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"},{name:"Vanoise National Park",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"},{name:"Lago di Braies",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"}],renderer:t=>{const e=u(t);d.addItem(e)}},".cards__list");var h;o.addEventListener("click",(function(){const t=_.getUserInfo();a.setInputValues({title:t.name,description:t.job}),i["profile-form"].resetValidation(),a.open()})),r.addEventListener("click",(function(){l.open()})),a.setEventListeners(),l.setEventListeners(),c.setEventListeners(),h={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__button_save",inactiveButtonClass:"modal__button_inactive",inputErrorClass:"modal__input_type_error",errorClass:"modal__error_visible"},Array.from(document.querySelectorAll(h.formSelector)).forEach((t=>{const e=new n(h,t),s=t.getAttribute("name");i[s]=e,e.enableValidation()})),d.renderItems()}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L0JSLEVBQWUsZ0JBQWdCRCxrQkFDL0JJLEVBQWlCN0YsTUFDbkIsSUFPQTRGLEVBQWlCekYsaUJBQWlCLFNBTGxDLFdBQ0VpRyxFQUFhcEcsTUFDZixJQUtBNkYsRUFBaUJwRixvQkFDakIyRixFQUFhM0Ysb0JBQ2JpRyxFQUFXakcsb0JBRWVzSCxFRHZGTSxDQUM5QkUsYUFBYyxlQUNkakUsY0FBZSxnQkFDZkUscUJBQXNCLHNCQUN0Qm9CLG9CQUFxQix5QkFDckJYLGdCQUFpQiwwQkFDakJDLFdBQVksd0JDa0ZLZCxNQUFNQyxLQUFLbkUsU0FBU3NCLGlCQUFpQjZHLEVBQU9FLGVBQ3BEM0csU0FBU29DLElBQ2hCLE1BQU13RSxFQUFZLElBQUkxRSxFQUFjdUUsRUFBUXJFLEdBQ3RDeUUsRUFBV3pFLEVBQVkwRSxhQUFhLFFBQzFDMUMsRUFBZXlDLEdBQVlELEVBQzNCQSxFQUFVMUMsa0JBQWtCLElBTWhDZ0IsRUFBWWtCLGEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Bcm91bmQgdGhlIFVTLy4vc3JjL2NvbXBvbmVudHMvUG9wdXAuanMiLCJ3ZWJwYWNrOi8vQXJvdW5kIHRoZSBVUy8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vQXJvdW5kIHRoZSBVUy8uL3NyYy9jb21wb25lbnRzL0NhcmQuanMiLCJ3ZWJwYWNrOi8vQXJvdW5kIHRoZSBVUy8uL3NyYy9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vQXJvdW5kIHRoZSBVUy8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vQXJvdW5kIHRoZSBVUy8uL3NyYy9wYWdlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9Bcm91bmQgdGhlIFVTLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vQXJvdW5kIHRoZSBVUy8uL3NyYy9jb21wb25lbnRzL1VzZXJJbmZvLmpzIiwid2VicGFjazovL0Fyb3VuZCB0aGUgVVMvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwIHtcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9oYW5kbGVFc2NDbG9zZSA9IHRoaXMuX2hhbmRsZUVzY0Nsb3NlLmJpbmQodGhpcyk7XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuX3BvcHVwLmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LnJlbW92ZShcIm1vZGFsX29wZW5lZFwiKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9oYW5kbGVFc2NDbG9zZSk7XG4gIH1cblxuICBfaGFuZGxlRXNjQ2xvc2UoZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldnQpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9vcGVuZWRcIikgfHxcbiAgICAgICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9fY2xvc2VcIilcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFdpdGhGb3JtIGV4dGVuZHMgUG9wdXAge1xuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XG4gICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCA9IGhhbmRsZUZvcm1TdWJtaXQ7XG4gICAgdGhpcy5fZm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2Zvcm1cIik7XG4gICAgdGhpcy5faW5wdXRzID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19pbnB1dFwiKTtcbiAgICB0aGlzLl9zdWJtaXRCdXR0b24gPSB0aGlzLl9mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2J1dHRvblwiKTtcbiAgfVxuXG4gIF9nZXRJbnB1dFZhbHVlcygpIHtcbiAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHt9O1xuICAgIHRoaXMuX2lucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgaW5wdXRWYWx1ZXNbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5wdXRWYWx1ZXM7XG4gIH1cblxuICBzZXRFdmVudExpc3RlbmVycygpIHtcbiAgICBzdXBlci5zZXRFdmVudExpc3RlbmVycygpO1xuICAgIHRoaXMuX2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZXZ0KSA9PiB7XG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQodGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKSk7XG4gICAgICB0aGlzLl9mb3JtLnJlc2V0KCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRGb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3JtO1xuICB9XG5cbiAgcmVzZXRGb3JtKCkge1xuICAgIHRoaXMuX2Zvcm0ucmVzZXQoKTtcbiAgfVxuXG4gIHNldElucHV0VmFsdWVzKGRhdGEpIHtcbiAgICB0aGlzLl9pbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgIGlucHV0LnZhbHVlID0gZGF0YVtpbnB1dC5uYW1lXTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XG4gIGNvbnN0cnVjdG9yKGRhdGEsIGNhcmRTZWxlY3RvciwgaGFuZGxlSW1hZ2VDbGljaykge1xuICAgIHRoaXMuX25hbWUgPSBkYXRhLm5hbWU7XG4gICAgdGhpcy5fbGluayA9IGRhdGEubGluaztcbiAgICB0aGlzLl9jYXJkU2VsZWN0b3IgPSBjYXJkU2VsZWN0b3I7XG4gICAgdGhpcy5faGFuZGxlSW1hZ2VDbGljayA9IGhhbmRsZUltYWdlQ2xpY2s7XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5fY2FyZEltYWdlID0gbnVsbDtcbiAgICB0aGlzLl9jYXJkVGl0bGUgPSBudWxsO1xuICAgIHRoaXMuX2xpa2VCdXR0b24gPSBudWxsO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbiA9IG51bGw7XG4gIH1cblxuICBfZ2V0VGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3Rvcih0aGlzLl9jYXJkU2VsZWN0b3IpXG4gICAgICAuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRcIilcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5faGFuZGxlTGlrZUNsaWNrKCkpO1xuICAgIHRoaXMuX2RlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIHRoaXMuX2hhbmRsZURlbGV0ZUNsaWNrKClcbiAgICApO1xuICAgIHRoaXMuX2NhcmRJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT5cbiAgICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2sodGhpcy5fbmFtZSwgdGhpcy5fbGluaylcbiAgICApO1xuICB9XG5cbiAgX2hhbmRsZUxpa2VDbGljaygpIHtcbiAgICB0aGlzLl9saWtlQnV0dG9uLmNsYXNzTGlzdC50b2dnbGUoXCJjYXJkX19saWtlLWJ1dHRvbl9hY3RpdmVcIik7XG4gIH1cblxuICBfaGFuZGxlRGVsZXRlQ2xpY2soKSB7XG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmUoKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgfVxuXG4gIGdlbmVyYXRlQ2FyZCgpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGhpcy5fZ2V0VGVtcGxhdGUoKTtcbiAgICB0aGlzLl9jYXJkSW1hZ2UgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9faW1hZ2VcIik7XG4gICAgdGhpcy5fY2FyZFRpdGxlID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX3RpdGxlXCIpO1xuICAgIHRoaXMuX2xpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmNhcmRfX2RlbGV0ZS1idXR0b25cIik7XG5cbiAgICB0aGlzLl9jYXJkSW1hZ2Uuc3JjID0gdGhpcy5fbGluaztcbiAgICB0aGlzLl9jYXJkSW1hZ2UuYWx0ID0gdGhpcy5fbmFtZTtcbiAgICB0aGlzLl9jYXJkVGl0bGUudGV4dENvbnRlbnQgPSB0aGlzLl9uYW1lO1xuXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MsIGZvcm1FbGVtZW50KSB7XG4gICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB0aGlzLl9mb3JtRWxlbWVudCA9IGZvcm1FbGVtZW50O1xuICAgIHRoaXMuX2lucHV0TGlzdCA9IEFycmF5LmZyb20oXG4gICAgICB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuX3NldHRpbmdzLmlucHV0U2VsZWN0b3IpXG4gICAgKTtcbiAgICB0aGlzLl9idXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIHRoaXMuX3NldHRpbmdzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yXG4gICAgKTtcbiAgICB0aGlzLl9lcnJvckVsZW1lbnRzID0gdGhpcy5faW5wdXRMaXN0LnJlZHVjZSgoYWNjLCBpbnB1dCkgPT4ge1xuICAgICAgYWNjW2lucHV0LmlkXSA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lucHV0LmlkfS1lcnJvcmApO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cblxuICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50LCBlcnJvck1lc3NhZ2UpIHtcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLl9lcnJvckVsZW1lbnRzW2lucHV0RWxlbWVudC5pZF07XG4gICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzKTtcbiAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gIH1cblxuICBfaGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5fZXJyb3JFbGVtZW50c1tpbnB1dEVsZW1lbnQuaWRdO1xuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3NldHRpbmdzLmlucHV0RXJyb3JDbGFzcyk7XG4gICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuZXJyb3JDbGFzcyk7XG4gICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbiAgfVxuXG4gIF9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KSB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcbiAgICAgIHRoaXMuX3Nob3dJbnB1dEVycm9yKGlucHV0RWxlbWVudCwgaW5wdXRFbGVtZW50LnZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBfaGFzSW52YWxpZElucHV0KCkge1xuICAgIHJldHVybiB0aGlzLl9pbnB1dExpc3Quc29tZSgoaW5wdXRFbGVtZW50KSA9PiAhaW5wdXRFbGVtZW50LnZhbGlkaXR5LnZhbGlkKTtcbiAgfVxuXG4gIF90b2dnbGVCdXR0b25TdGF0ZSgpIHtcbiAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KCkpIHtcbiAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idXR0b25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgICB0aGlzLl9idXR0b25FbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZUJ1dHRvbigpIHtcbiAgICB0aGlzLl9idXR0b25FbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5fc2V0dGluZ3MuaW5hY3RpdmVCdXR0b25DbGFzcyk7XG4gICAgdGhpcy5fYnV0dG9uRWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gIH1cblxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcblxuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fdG9nZ2xlQnV0dG9uU3RhdGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl9mb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldnQpID0+IHtcbiAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKHRoaXMuX2hpZGVJbnB1dEVycm9yLmJpbmQodGhpcykpO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgdmFsaWRhdGlvbkNvbmZpZyA9IHtcbiAgZm9ybVNlbGVjdG9yOiBcIi5tb2RhbF9fZm9ybVwiLFxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcbiAgc3VibWl0QnV0dG9uU2VsZWN0b3I6IFwiLm1vZGFsX19idXR0b25fc2F2ZVwiLFxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcIm1vZGFsX19idXR0b25faW5hY3RpdmVcIixcbiAgaW5wdXRFcnJvckNsYXNzOiBcIm1vZGFsX19pbnB1dF90eXBlX2Vycm9yXCIsXG4gIGVycm9yQ2xhc3M6IFwibW9kYWxfX2Vycm9yX3Zpc2libGVcIixcbn07XG5cbmV4cG9ydCBjb25zdCBpbml0aWFsQ2FyZHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcIllvc2VtaXRlIFZhbGxleVwiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC95b3NlbWl0ZS5qcGdcIixcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiTGFrZSBMb3Vpc2VcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGFrZS1sb3Vpc2UuanBnXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkJhbGQgTW91bnRhaW5zXCIsXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2JhbGQtbW91bnRhaW5zLmpwZ1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJMYXRlbWFyXCIsXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xhdGVtYXIuanBnXCIsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlZhbm9pc2UgTmF0aW9uYWwgUGFya1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC92YW5vaXNlLmpwZ1wiLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJMYWdvIGRpIEJyYWllc1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9sYWdvLmpwZ1wiLFxuICB9LFxuXTtcbiIsImltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xuaW1wb3J0IFNlY3Rpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvU2VjdGlvbi5qc1wiO1xuaW1wb3J0IFBvcHVwIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwLmpzXCI7XG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanNcIjtcbmltcG9ydCBQb3B1cFdpdGhGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanNcIjtcbmltcG9ydCBDYXJkIGZyb20gXCIuLi9jb21wb25lbnRzL0NhcmQuanNcIjtcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcbmltcG9ydCBcIi4uL3BhZ2VzL2luZGV4LmNzc1wiO1xuaW1wb3J0IHsgdmFsaWRhdGlvbkNvbmZpZywgaW5pdGlhbENhcmRzIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50cy5qc1wiO1xuXG5jb25zdCBmb3JtVmFsaWRhdG9ycyA9IHt9O1xuY29uc3QgcHJvZmlsZUVkaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2VkaXQtYnV0dG9uXCIpO1xuY29uc3QgYWRkTmV3Q2FyZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fYWRkLWJ1dHRvblwiKTtcbmNvbnN0IHByb2ZpbGVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZV9fdGl0bGVcIik7XG5jb25zdCBwcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGVfX2Rlc2NyaXB0aW9uXCIpO1xuY29uc3QgY2FyZExpc3RTZWxlY3RvciA9IFwiLmNhcmRzX19saXN0XCI7XG5cbmNvbnN0IHByb2ZpbGVFZGl0UG9wdXAgPSBuZXcgUG9wdXBXaXRoRm9ybShcbiAgXCIjcHJvZmlsZV9fZWRpdF9tb2RhbFwiLFxuICBoYW5kbGVQcm9maWxlRm9ybVN1Ym1pdFxuKTtcbmNvbnN0IGFkZENhcmRQb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFxuICBcIiNjYXJkX19lZGl0X21vZGFsXCIsXG4gIGhhbmRsZUNhcmRGb3JtU3VibWl0XG4pO1xuY29uc3QgaW1hZ2VQb3B1cCA9IG5ldyBQb3B1cFdpdGhJbWFnZShcIiNpbWFnZV9tb2RhbFwiKTtcbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcbiAgbmFtZVNlbGVjdG9yOiBcIi5wcm9maWxlX190aXRsZVwiLFxuICBqb2JTZWxlY3RvcjogXCIucHJvZmlsZV9fZGVzY3JpcHRpb25cIixcbn0pO1xuXG5mdW5jdGlvbiBoYW5kbGVQcm9maWxlRm9ybVN1Ym1pdChmb3JtRGF0YSkge1xuICB1c2VySW5mby5zZXRVc2VySW5mbyh7XG4gICAgbmFtZTogZm9ybURhdGEudGl0bGUsXG4gICAgam9iOiBmb3JtRGF0YS5kZXNjcmlwdGlvbixcbiAgfSk7XG4gIHByb2ZpbGVFZGl0UG9wdXAuY2xvc2UoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQ2FyZEZvcm1TdWJtaXQoZm9ybURhdGEpIHtcbiAgY29uc3QgbmV3Q2FyZCA9IGNyZWF0ZUNhcmQoeyBuYW1lOiBmb3JtRGF0YS50aXRsZSwgbGluazogZm9ybURhdGEudXJsIH0pO1xuICBjYXJkU2VjdGlvbi5hZGRJdGVtKG5ld0NhcmQpO1xuICBhZGRDYXJkUG9wdXAuY2xvc2UoKTtcbiAgZm9ybVZhbGlkYXRvcnNbXCJjYXJkLWZvcm1cIl0uZGlzYWJsZUJ1dHRvbigpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDYXJkKGRhdGEpIHtcbiAgY29uc3QgY2FyZCA9IG5ldyBDYXJkKGRhdGEsIFwiI2NhcmRfX3RlbXBsYXRlXCIsIGhhbmRsZUltYWdlQ2xpY2spO1xuICByZXR1cm4gY2FyZC5nZW5lcmF0ZUNhcmQoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlSW1hZ2VDbGljayhuYW1lLCBsaW5rKSB7XG4gIGltYWdlUG9wdXAub3Blbih7IG5hbWUsIGxpbmsgfSk7XG59XG5cbmNvbnN0IGNhcmRTZWN0aW9uID0gbmV3IFNlY3Rpb24oXG4gIHtcbiAgICBpdGVtczogaW5pdGlhbENhcmRzLFxuICAgIHJlbmRlcmVyOiAoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgY2FyZEVsZW1lbnQgPSBjcmVhdGVDYXJkKGl0ZW0pO1xuICAgICAgY2FyZFNlY3Rpb24uYWRkSXRlbShjYXJkRWxlbWVudCk7XG4gICAgfSxcbiAgfSxcbiAgY2FyZExpc3RTZWxlY3RvclxuKTtcblxuZnVuY3Rpb24gb3BlblByb2ZpbGVFZGl0TW9kYWwoKSB7XG4gIGNvbnN0IGN1cnJlbnRVc2VySW5mbyA9IHVzZXJJbmZvLmdldFVzZXJJbmZvKCk7XG4gIHByb2ZpbGVFZGl0UG9wdXAuc2V0SW5wdXRWYWx1ZXMoe1xuICAgIHRpdGxlOiBjdXJyZW50VXNlckluZm8ubmFtZSxcbiAgICBkZXNjcmlwdGlvbjogY3VycmVudFVzZXJJbmZvLmpvYixcbiAgfSk7XG4gIGZvcm1WYWxpZGF0b3JzW1wicHJvZmlsZS1mb3JtXCJdLnJlc2V0VmFsaWRhdGlvbigpO1xuICBwcm9maWxlRWRpdFBvcHVwLm9wZW4oKTtcbn1cblxuZnVuY3Rpb24gb3BlbkNhcmRGb3JtTW9kYWwoKSB7XG4gIGFkZENhcmRQb3B1cC5vcGVuKCk7XG59XG5cbnByb2ZpbGVFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuUHJvZmlsZUVkaXRNb2RhbCk7XG5hZGROZXdDYXJkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuQ2FyZEZvcm1Nb2RhbCk7XG5cbnByb2ZpbGVFZGl0UG9wdXAuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcbmFkZENhcmRQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuaW1hZ2VQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xuXG5jb25zdCBlbmFibGVWYWxpZGF0aW9uID0gKGNvbmZpZykgPT4ge1xuICBjb25zdCBmb3JtTGlzdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKSk7XG4gIGZvcm1MaXN0LmZvckVhY2goKGZvcm1FbGVtZW50KSA9PiB7XG4gICAgY29uc3QgdmFsaWRhdG9yID0gbmV3IEZvcm1WYWxpZGF0b3IoY29uZmlnLCBmb3JtRWxlbWVudCk7XG4gICAgY29uc3QgZm9ybU5hbWUgPSBmb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xuICAgIGZvcm1WYWxpZGF0b3JzW2Zvcm1OYW1lXSA9IHZhbGlkYXRvcjtcbiAgICB2YWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xuICB9KTtcbn07XG5cbmVuYWJsZVZhbGlkYXRpb24odmFsaWRhdGlvbkNvbmZpZyk7XG5cbmNhcmRTZWN0aW9uLnJlbmRlckl0ZW1zKCk7XG4iLCJpbXBvcnQgUG9wdXAgZnJvbSBcIi4vUG9wdXAuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcbiAgICB0aGlzLl9pbWFnZSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlXCIpO1xuICAgIHRoaXMuX2NhcHRpb24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19jYXB0aW9uXCIpO1xuICB9XG5cbiAgb3Blbih7IG5hbWUsIGxpbmsgfSkge1xuICAgIHRoaXMuX2ltYWdlLnNyYyA9IGxpbms7XG4gICAgdGhpcy5faW1hZ2UuYWx0ID0gbmFtZTtcbiAgICB0aGlzLl9jYXB0aW9uLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICBzdXBlci5vcGVuKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJJbmZvIHtcbiAgY29uc3RydWN0b3IoeyBuYW1lU2VsZWN0b3IsIGpvYlNlbGVjdG9yIH0pIHtcbiAgICB0aGlzLl9uYW1lRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmFtZVNlbGVjdG9yKTtcbiAgICB0aGlzLl9qb2JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihqb2JTZWxlY3Rvcik7XG4gIH1cblxuICBnZXRVc2VySW5mbygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdGhpcy5fbmFtZUVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgICBqb2I6IHRoaXMuX2pvYkVsZW1lbnQudGV4dENvbnRlbnQsXG4gICAgfTtcbiAgfVxuXG4gIHNldFVzZXJJbmZvKHsgbmFtZSwgam9iIH0pIHtcbiAgICB0aGlzLl9uYW1lRWxlbWVudC50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgdGhpcy5fam9iRWxlbWVudC50ZXh0Q29udGVudCA9IGpvYjtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XG4gICAgdGhpcy5faXRlbXMgPSBpdGVtcztcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICB9XG5cbiAgcmVuZGVySXRlbXMoKSB7XG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIoaXRlbSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRJdGVtKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlBvcHVwIiwiY29uc3RydWN0b3IiLCJwb3B1cFNlbGVjdG9yIiwidGhpcyIsIl9wb3B1cCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJvcGVuIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsb3NlIiwicmVtb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleSIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhGb3JtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsInN1cGVyIiwiX2hhbmRsZUZvcm1TdWJtaXQiLCJfZm9ybSIsIl9pbnB1dHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiX3N1Ym1pdEJ1dHRvbiIsIl9nZXRJbnB1dFZhbHVlcyIsImlucHV0VmFsdWVzIiwiZm9yRWFjaCIsImlucHV0IiwibmFtZSIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJyZXNldCIsImdldEZvcm0iLCJyZXNldEZvcm0iLCJzZXRJbnB1dFZhbHVlcyIsImRhdGEiLCJDYXJkIiwiY2FyZFNlbGVjdG9yIiwiaGFuZGxlSW1hZ2VDbGljayIsIl9uYW1lIiwiX2xpbmsiLCJsaW5rIiwiX2NhcmRTZWxlY3RvciIsIl9oYW5kbGVJbWFnZUNsaWNrIiwiX2VsZW1lbnQiLCJfY2FyZEltYWdlIiwiX2NhcmRUaXRsZSIsIl9saWtlQnV0dG9uIiwiX2RlbGV0ZUJ1dHRvbiIsIl9nZXRUZW1wbGF0ZSIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJfc2V0RXZlbnRMaXN0ZW5lcnMiLCJfaGFuZGxlTGlrZUNsaWNrIiwiX2hhbmRsZURlbGV0ZUNsaWNrIiwidG9nZ2xlIiwiZ2VuZXJhdGVDYXJkIiwic3JjIiwiYWx0IiwidGV4dENvbnRlbnQiLCJGb3JtVmFsaWRhdG9yIiwic2V0dGluZ3MiLCJmb3JtRWxlbWVudCIsIl9zZXR0aW5ncyIsIl9mb3JtRWxlbWVudCIsIl9pbnB1dExpc3QiLCJBcnJheSIsImZyb20iLCJpbnB1dFNlbGVjdG9yIiwiX2J1dHRvbkVsZW1lbnQiLCJzdWJtaXRCdXR0b25TZWxlY3RvciIsIl9lcnJvckVsZW1lbnRzIiwicmVkdWNlIiwiYWNjIiwiaWQiLCJfc2hvd0lucHV0RXJyb3IiLCJpbnB1dEVsZW1lbnQiLCJlcnJvck1lc3NhZ2UiLCJlcnJvckVsZW1lbnQiLCJpbnB1dEVycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiX2hpZGVJbnB1dEVycm9yIiwiX2NoZWNrSW5wdXRWYWxpZGl0eSIsInZhbGlkaXR5IiwidmFsaWQiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsIl9oYXNJbnZhbGlkSW5wdXQiLCJzb21lIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiZGlzYWJsZUJ1dHRvbiIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJkaXNhYmxlZCIsImVuYWJsZVZhbGlkYXRpb24iLCJyZXNldFZhbGlkYXRpb24iLCJmb3JtVmFsaWRhdG9ycyIsInByb2ZpbGVFZGl0QnV0dG9uIiwiYWRkTmV3Q2FyZEJ1dHRvbiIsInByb2ZpbGVFZGl0UG9wdXAiLCJmb3JtRGF0YSIsInVzZXJJbmZvIiwic2V0VXNlckluZm8iLCJ0aXRsZSIsImpvYiIsImRlc2NyaXB0aW9uIiwiYWRkQ2FyZFBvcHVwIiwibmV3Q2FyZCIsImNyZWF0ZUNhcmQiLCJ1cmwiLCJjYXJkU2VjdGlvbiIsImFkZEl0ZW0iLCJpbWFnZVBvcHVwIiwiX2ltYWdlIiwiX2NhcHRpb24iLCJfcmVmIiwibmFtZVNlbGVjdG9yIiwiam9iU2VsZWN0b3IiLCJfbmFtZUVsZW1lbnQiLCJfam9iRWxlbWVudCIsImdldFVzZXJJbmZvIiwiX3JlZjIiLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaXRlbXMiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwicmVuZGVySXRlbXMiLCJpdGVtIiwiZWxlbWVudCIsInByZXBlbmQiLCJjYXJkRWxlbWVudCIsImNvbmZpZyIsImN1cnJlbnRVc2VySW5mbyIsImZvcm1TZWxlY3RvciIsInZhbGlkYXRvciIsImZvcm1OYW1lIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==