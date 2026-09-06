async function loadIntakeModal(){

const root = document.getElementById("intake-modal-root");

if(!root){
return;
}

try{

const response = await fetch("intake-modal.html");
const html = await response.text();

root.innerHTML = html;

}catch(err){

console.error("Failed to load intake modal:",err);
return;

}

initIntakeModal();

}

function initIntakeModal(){

const modal = document.getElementById("intakeModal");
const closeModalButton = document.getElementById("closeModal");

const packageButtons = document.querySelectorAll(".package-button");
const openIntakeButtons = document.querySelectorAll(".open-intake");

const packageSelect = document.getElementById("package");
const hiddenPackage = document.getElementById("selectedPackage");
const selectedPackageBox = document.getElementById("selectedPackageBox");

if(!modal || !closeModalButton || !packageSelect){
return;
}

let lastFocusedElement = null;

function openModal(selectedPackage = ""){

lastFocusedElement = document.activeElement;

modal.classList.add("active");
modal.setAttribute("aria-hidden","false");

document.body.classList.add("modal-open");

setSelectedPackage(selectedPackage);

setTimeout(function(){

if(packageSelect){
packageSelect.focus();
}

},100);

}

function closeModal(){

modal.classList.remove("active");
modal.setAttribute("aria-hidden","true");

document.body.classList.remove("modal-open");

if(window.location.hash === "#intake"){

history.replaceState(
null,
"",
window.location.pathname + window.location.search
);

}

if(lastFocusedElement){
lastFocusedElement.focus();
}

}

function setSelectedPackage(selected){

hiddenPackage.value = selected;
packageSelect.value = selected;

if(selected){

selectedPackageBox.textContent =
"Selected package: " + selected;

}else{

selectedPackageBox.textContent =
"Selected package: Please choose a package below.";

}

}

packageButtons.forEach(function(button){

button.addEventListener("click",function(event){

event.preventDefault();

const selected =
button.getAttribute("data-package");

openModal(selected);

});

});

openIntakeButtons.forEach(function(button){

button.addEventListener("click",function(event){

event.preventDefault();

openModal();

});

});

packageSelect.addEventListener("change",function(){

setSelectedPackage(packageSelect.value);

});

closeModalButton.addEventListener("click",function(){

closeModal();

});

modal.addEventListener("click",function(event){

if(event.target === modal){
closeModal();
}

});

document.addEventListener("keydown",function(event){

if(
event.key === "Escape" &&
modal.classList.contains("active")
){
closeModal();
}

});

if(window.location.hash === "#intake"){
openModal();
}

}

document.addEventListener("DOMContentLoaded",loadIntakeModal);

function initMobileNav(){

const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

if(!navToggle || !siteNav){
return;
}

function closeNav(){
siteNav.classList.remove("nav-open");
navToggle.setAttribute("aria-expanded","false");
}

function toggleNav(){
const isOpen = siteNav.classList.toggle("nav-open");
navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

navToggle.addEventListener("click",toggleNav);

siteNav.querySelectorAll("a").forEach(function(link){
link.addEventListener("click",closeNav);
});

document.addEventListener("keydown",function(event){
if(event.key === "Escape"){
closeNav();
}
});

}

document.addEventListener("DOMContentLoaded",initMobileNav);

async function loadBookingModals(){

const root = document.getElementById("booking-modal-root");

if(!root){
return;
}

try{

const response = await fetch("booking-modal.html");
const html = await response.text();

root.innerHTML = html;

}catch(err){

console.error("Failed to load booking modals:",err);
return;

}

// Script tags inserted via innerHTML do not execute automatically,
// so the TidyCal embed script must be created and appended manually.
const tidycalScript = document.createElement("script");
tidycalScript.src = "https://asset-tidycal.b-cdn.net/js/embed.js";
tidycalScript.async = true;
document.body.appendChild(tidycalScript);

initBookingModals();

}

function initBookingModals(){

const triggers = document.querySelectorAll(".booking-trigger");
const closeButtons = document.querySelectorAll(".booking-modal-close");
const modals = document.querySelectorAll("#booking-modal-root .modal");

if(!modals.length){
return;
}

let lastFocusedElement = null;

function closeAllBookingModals(){

modals.forEach(function(modal){
modal.classList.remove("active");
modal.setAttribute("aria-hidden","true");
});

document.body.classList.remove("modal-open");

if(lastFocusedElement){
lastFocusedElement.focus();
}

}

triggers.forEach(function(trigger){

trigger.addEventListener("click",function(event){

event.preventDefault();

lastFocusedElement = document.activeElement;

const targetId = trigger.getAttribute("data-booking-modal");
const modal = document.getElementById(targetId);

if(modal){

modal.classList.add("active");
modal.setAttribute("aria-hidden","false");

document.body.classList.add("modal-open");

}

});

});

closeButtons.forEach(function(button){

button.addEventListener("click",function(){
closeAllBookingModals();
});

});

modals.forEach(function(modal){

modal.addEventListener("click",function(event){

if(event.target === modal){
closeAllBookingModals();
}

});

});

document.addEventListener("keydown",function(event){

if(event.key === "Escape"){
closeAllBookingModals();
}

});

}

document.addEventListener("DOMContentLoaded",loadBookingModals);
