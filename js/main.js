// Lindsay Hooton

$(document).on('pageinit', function(){

//dynamicly creating an option to select one of the relations
var relations = [
  {val : 0, text: 'Select One'},
  {val : 1, text: 'Grandparent'},
  {val : 2, text: 'Parent'},
  {val : 3, text: 'Sibling'},
  {val : 4, text: 'Significant Other'},
  {val : 5, text: 'Child'},
  {val : 6, text: 'Friend'},
  {val : 7, text: 'Co-Worker'},
  {val : 8, text: 'Other'}
];

var selectTag = $('<select>').appendTo('body');
$(relations).each(function() {
 selectTag.append($("<option>").attr('value',this.val).text(this.text));
});
console.log(selectTag);

//save interests from the check box
$("#submit").click(function(event){
  event.preventDefault();

  var checked = [];

  $("input").map(function(){
    checked.push($(this).val());
  });

  console.log(checked);
});

/*
//get the data entered in the fields and create sub lists
function getData () {
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
        var object = JSON.stringify(json);
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
console.log(getData);*/

//on click get stored data 
//$('#displayData').on("click", getData);
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
        window.location.reload();
};
console.log(storeData);

//on click store data
$('#submit').on("click", storeData);
//console.log(submit);
/*
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
*/
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
/*
//edit the items of a persons information
function editItem(){
    var value = localStorage.getItem(this.key);
    var items = JSON.parse(value);
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
*/
$('#clearData').on("click", function(){
    if(localStorage.length === 0){
        alert("No Information to clear.");
        return;
    }
    else{
        localStorage.clear();
        alert("All information has been deleted.");
        window.location.reload();
    };
});

//function to add dummy data w/ ajax
$('#displayData').on("click", function(){
    $.ajax({
        url: 'xhr/json.js',
        type: 'GET',
        dataType: 'json',
        success: function(response){
            $.each(response.rows, function(index, jsonObj){
                var name = jsonObj.value.name;
                var email = jsonObj.value.email;
                var phone = jsonObj.value.phone;
                var birthday = jsonObj.value.birthday;
                var relation = jsonObj.value.relation;
                var interests = jsonObj.value.interests;
                var pricerange = jsonObj.value.pricerange;
                $('#dataview').append($('<li>').text(name));
                //.value possibly change to .doc? cant figure this out
            })
        }
    });
}); 

//$('#displayData').on("click", defaultAdded);

//function for xml data w/ ajax
$('#xml').on('click', function(){
   $.ajax({
        url: 'xhr/main.xml',
        type: 'GET',
        dataType: 'xml',
        success: function(response){
        $(response).find("item").each(function(){
            var item = $(this);
                $(''+
                    '<ul class="contacts">'+
                        '<li>'+ item.find("name").text() +'</li>'+
                        '<li>'+ item.find("email").text() +'</li>'+
                        '<li>'+ item.find("phone").text() +'</li>'+
                        '<li>'+ item.find("birthday").text() +'</li>'+
                        '<li>'+ item.find("relation").text() +'</li>'+
                        '<li>'+ item.find("interests").text() +'</li>'+
                        '<li>'+ item.find("pricerange").text() +'</li>'+
                    '</ul>'
                ).appendTo('#xmllist');
            });
        }
    }); 
});





//end
});
