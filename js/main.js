// Lindsay Hooton

$(document).ready(function(){
    
//dynamicly creating an option to select one of the relations
var relations = ["Select One", "Grandparent", "Parent", "Sibling", "Significant Other", "Child", "Friend", "Co-Worker", "Other"];
function makeOptionSelector (){
    var selectTag = $("form"),
        selectOpTag = $('#relation'),
        makeOption = $('select').appendTo('relation');
        makeOption.attr("id", "relation");
    for (var i=0, j=relations.length; i<j; i++){
        var makeSelections = $('<option>');
        var optionText = relations[i];
            makeSelections.attr("value", optionText);
            makeSelections.innerHTML = optionText;
            makeOption.appendTo(makeSelections);
    };
    selectOpTag.appendTo(makeOption);
};
makeOptionSelector();
console.log(makeOptionSelector);

//save interests from the check box
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
                checkedInterests[i].attr("checked", "checked");
            }
        }
    }
};

//get the data entered in the fields and create sub lists
function getData () {
    showHide("on");
    if (localStorage.length === 0) {
        alert("You haven't added anyone! So we've added some data for testing.");
        defaultAdded();
    }
    var makeDiv = $("<div>");
    makeDiv.attr("id", "items");
    var makeList = $("<ul>");
    makeDiv.appendTo(makeList);
    $('<div>').appendTo(makeDiv);
    $('#items').css("display","block");
    for (var i=0, j=localStorage.length; i<j; i++) {
        var makeLi = $("<li>");
        var buttonLi = $("<li>");
        makeList.appendTo(makeLi);
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var object = JSON.parse(value);
        var makeSub = $("<ul>");
        makeLi.appendTo(makeSub);
        for (var n in object) {
            var makeSubList = $("<li>");
            makeSub.appendTo(makeSubList);
            var subText = object[n][0]+ " " +object[n][1];
            makeSubList.innerHTML = subText;
            makeSubList.appendTo(buttonLi);
        };
        makeButtons(localStorage.key(i), buttonLi);
    };
};
console.log(getData);

//on click get stored data 
$('#displayData').on("click", getData);
//console.log(displayData);

//get the values from the input fields and save
function storeData(key){
    if(!key) {
        var id = Math.floor(Math.random()*10002);
    }else{
        id = key;
    }
    var items = {};
        items.name = ["Name:", $('#name').val()];
        items.email = ["E-Mail:", $('#email').val()];
        items.phone = ["Phone:", $('#phone').val()];
        items.bday = ["Birthday:", $('#bday').val()];
        items.relation = ["Relation:", $('#relation').val()];
        items.interests = ["Interests:", $('#interests').val()];
        items.price = ["Price Range:", $('#priceRange').val()];
        items.ideas = ["Quick Ideas:", $('#ideas').val()];
        localStorage.setItem(id, JSON.stringify(items));
        alert("Sucessfully Added");
};
console.log(storeData);

//on click store data
$('#submit').on("click", storeData);
//console.log(submit);

//turns the submit button into delete and edit buttons while displaying data
function makeButtons(key, buttonLi) {
    var editButton = $("<a>");
    editButton.href = "#";
    editButton.key = key;
    var editButtonText = "Edit ";
    editButton.on("click", editItem);
    editButton.innerHTML = editButtonText;
    buttonLi.appendTo(editButton);
    
    var deleteButton = $("<a>");
    deleteButton.href = "#";
    deleteButton.key = key;
    var deleteButtonText = "| Delete";
    deleteButton.on("click", deleteItem);
    deleteButton.innerHTML = deleteButtonText;
    buttonLi.appendTo(deleteButton);
};
console.log(makeButtons);

//deleting the item or person in your list from the display data field
function deleteItem() {
    var ask = confirm("Are you sure you want to delete?");
    if (ask) {
        localStorage.remove(this.key);
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
    var items = $.getJSON().serializeArray();
    showHide("on");
    $('#name').value = items.name[1];
    $('#email').value = items.email[1];
    $('#phone').value = items.phone[1];
    $('#bday').value = items.bday[1];
    $('#relation').value = items.relation[1];
    $('#interests').value = items.interests[1];
    $('#priceRange').value = items.priceRange[1];
    $('#ideas').value = items.ideas[""];
    
    save.off("click", storeData);
    $('#submit').value = "Edit";
    var editSubmit = $('#submit');
    editSubmit.on("click", validate);
    editSubmit.key = this.key;
};
console.log(editItem);

//clears all the data
var clearAllData = function (){
    if (localStorage.length === 0) {
        alert("No Information to clear.");
    } else {
        var clear = confirm("Are you sure you want to delete all information?");
                if (clear) {
                     localStorage.clear();
                     alert("All information has been deleted.");
                     window.location.reload();
                     return false;
                }else{
                     alert("Your information is still saved.");
                }
    }
};
console.log(clearAllData);

//on click clear all data 
$("#clearData").on("click", clearAllData);
//console.log(clearData);

//show and hide fields when displaying data
function showHide (n){
    switch(n) {
        case "on":
            $('#submit').hide();
            $('#fieldOne').hide();
            $('#fieldTwo').hide();
            break;
        case "off":
            $('#submit').css("display","block");
            $('#fieldOne').css("display","block");
            $('#fieldTwo').css("display","block");
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
        $.getJSON().serializeArray();
    }
};
console.log(defaultAdded);

var data = $.parseXML(xml);
$('#xml').on('click', data);

});
