// Lindsay Hooton

window.addEventListener("DOMContentLoaded", function(){

//option selector for relation
var relations = ["Select One", "Grandparent", "Parent", "Sibling", "Significant Other", "Child", "Friend", "Co-Worker", "Other"];
function makeOptionSelector (){
    var selectTag = document.getElementsByTagName("form"),
        selectOpTag = document.getElementById('relation'),
        makeOption = document.createElement('select');
        makeOption.setAttribute("id", "relation");
    for (var i=0, j=relations.length; i<j; i++){
        var makeSelections = document.createElement('option');
        var optionText = relations[i];
            makeSelections.setAttribute("value", optionText);
            makeSelections.innerHTML = optionText;
            makeOption.appendChild(makeSelections);
    };
    selectOpTag.appendChild(makeOption);
};
makeOptionSelector();
console.log(makeOptionSelector);

//save the checked interests
var saveChecked = function(){
    var checkedInterests = document.forms[0].interest;
    var checkedValues = [];
    for(i=0, j=checkedInterests.length; i<j; i++){
        if(checkedInterests[i].checked){
            var checkedBox = checkedInterests[i].value;
            checkedValues.push(checkedBox);
        }
    }
    localStorage.setItem("test", JSON.stringify(checkedValues));
};

var addChecked = function(){
    var checkedInterests = document.forms[0].interest;
    var key = localStorage.key("test");
    var value = localStorage.getItem(key);
    var myData = JSON.parse(value);
    for (i=0; i<checkedInterests.length; i++) {
        for (j=0; j<myData.lenght; j++) {
            if (checkedInterests[i].value === myData) {
                checkedInterests[i].setAttribute("checked", "checked");
            }
        }
    }
};

//get the data entered in the text fields and create sub lists
function getData () {
    showHide("on");
    if (localStorage.length === 0) {
        alert("You haven't added anyone! So we've added some data for testing.");
        defaultAdded();
    }
    var makeDiv = document.createElement('div');
    makeDiv.setAttribute("id", "items");
    var makeList = document.createElement('ul');
    makeDiv.appendChild(makeList);
    document.body.appendChild(makeDiv);
    document.getElementById('items').style.display = "block";
    for (var i=0, j=localStorage.length; i<j; i++) {
        var makeLi = document.createElement('li');
        var buttonLi = document.createElement('li');
        makeList.appendChild(makeLi);
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var object = JSON.parse(value);
        var makeSub = document.createElement('ul');
        makeLi.appendChild(makeSub);
        //getImage(makeSub, iconName);
        for (var n in object) {
            var makeSubList = document.createElement('li');
            makeSub.appendChild(makeSubList);
            var subText = object[n][0]+ " " +object[n][1];
            makeSubList.innerHTML = subText;
            makeSubList.appendChild(buttonLi);
        };
        makeButtons(localStorage.key(i), buttonLi);
    };
};
console.log(getData);

//on click get stored data 
var displayData = document.getElementById("displayData"); 
displayData.addEventListener("click", getData);
console.log(displayData);

//get the values from the input fields and save
function storeData(key){
    if(!key) {
        var id = Math.floor(Math.random()*10002);
    }else{
        id = key;
    }
    var items = {};
        items.name = ["Name:", document.getElementById('name').value];
        items.email = ["E-Mail:", document.getElementById('email').value];
        items.phone = ["Phone:", document.getElementById('phone').value];
        items.bday = ["Birthday:", document.getElementById('bday').value];
        items.relation = ["Relation:", document.getElementById('relation').value];
        items.interests = ["Interests:", document.getElementById('interests').value];
        items.price = ["Price Range:", document.getElementById('priceRange').value];
        items.ideas = ["Quick Ideas:", document.getElementById('ideas').value];
    localStorage.setItem(id, JSON.stringify(items));
    alert("Sucessfully Added");
};
console.log(storeData);

//on click save data
var save = document.getElementById('submit');
save.addEventListener("click", validate);
console.log(save);

//on click store data
var submit = document.getElementById('submit');
submit.addEventListener("click", storeData);
console.log(submit);

//turns the submit button into delete and edit buttons while displaying data
function makeButtons(key, buttonLi) {
    var editButton = document.createElement('a');
    editButton.href = "#";
    editButton.key = key;
    var editButtonText = "Edit ";
    editButton.addEventListener("click", editItem);
    editButton.innerHTML = editButtonText;
    buttonLi.appendChild(editButton);
    
    var deleteButton = document.createElement('a');
    deleteButton.href = "#";
    deleteButton.key = key;
    var deleteButtonText = "| Delete";
    deleteButton.addEventListener("click", deleteItem);
    deleteButton.innerHTML = deleteButtonText;
    buttonLi.appendChild(deleteButton);
};
console.log(makeButtons);

//deleting the item or person in your list from the display data field
function deleteItem() {
    var ask = confirm("Are you sure you want to delete?");
    if (ask) {
        localStorage.removeItem(this.key);
        alert("Information deleted.");
        window.location.reload();
    }else{
        alert("Your information is still saved!");
    }
};
console.log(deleteItem);

//edit the items of a persons information
function editItem(){
    var value = localStorage.getItem(this.key);
    var items = JSON.parse(value);
    showHide("on");
    document.getElementById('name').value = items.name[1];
    document.getElementById('email').value = items.email[1];
    document.getElementById('phone').value = items.phone[1];
    document.getElementById('bday').value = items.bday[1];
    document.getElementById('relation').value = items.relation[1];
    document.getElementById('interests').value = items.interests[1];
    document.getElementById('priceRange').value = items.priceRange[1];
    document.getElementById('ideas').value = items.ideas[""];
    
    save.removeEventListener("click", storeData);
    document.getElementById('submit').value = "Edit";
    var editSubmit = document.getElementById('submit');
    editSubmit.addEventListener("click", validate);
    editSubmit.key = this.key;
};
console.log(editItem);

//validate the input fields provide error message when blank
function validate(e) {
    var getName = document.getElementById('name');
    var getBday = document.getElementById('bday');
    
    errorMessage.innerHTML = "";
        getName.style.border = "1px solid black";
        getBday.style.border = "1px solid black";

    var messages = [];
    if (getName.value==="") {
        var nameError = "Please enter a name.";
        getName.style.border = "1px solid red";
        messages.push(nameError);
        alert("Please add the required data.");
    }
    
    if (getBday.value==="") {
        var bdayError = "Please enter a date.";
        getBday.style.border = "1px solid red";
        messages.push(bdayError);
    }
    
    if (messages.length >= 1) {
        for (var i=0, j=messages.length; i < j; i++) {
            var text = document.createElement('li');
            text.innerHTML = messages[i];
            errorMessage.appendChild(text);
        }
        e.preventDefault();
        return false;
    }else{
        storeData(this.key);
    }
};
console.log(validate);
var errorMessage = document.getElementById('errors');

//clears all the data
function clearAllData(){
    if (localStorage.length === 0) {
        alert("No Information to clear.");
    } else {
        localStorage.clear();
        alert("All Information has been cleared.");
        window.location.reload();
        return false;
    };
};
console.log(clearAllData);

//on click clear all data
var clearData = document.getElementById("clearData");  
clearData.addEventListener("click", clearAllData);
console.log(clearData);

//show and hide fields when displaying data
function showHide (n){
    switch(n) {
        case "on":
            document.getElementById('submit').style.display = "none";
            document.getElementById('fieldOne').style.display = "none";
            document.getElementById('fieldTwo').style.display = "none";
            break;
        case "off":
            document.getElementById('submit').style.display = "block";
            document.getElementById('fieldOne').style.display = "block";
            document.getElementById('fieldTwo').style.display = "block";
            break;
        default:
            return false;
    }
};
console.log(showHide);

//adds the dummy data from the json file
function defaultAdded() {
    for (var n in json){
        var id = Math.floor(Math.random()*10002);
        localStorage.setItem(id, JSON.stringify(json[n]));
    }
};
console.log(defaultAdded);

});