// Lindsay Hooton

window.addEventListener("DOMContentLoaded", function(){
    
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

//on click store data
var submit = document.getElementById('searchB');
submit.addEventListener("click", storeData);
console.log(submit);
    
//using search
var searchBtn = document.getElementById('searchB');
var browse = document.getElementById('browse');

var getSearch = function(){
    var searchB = document.getElementById('search').value;
    var browse = document.getElementById('browse');
    //category only
    /*if (browse != "Select One" && searchB === "") {
        for (var i=0, j=localStorage.length; i<j; i++){
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var object = JSON.parse(value);
            if (browse === object.items[1]) {
                for(n in object){
                    console.log(object[n][0]+ " : "+ object[n][1]);
                }
            }
        }
    };*/
    //term only
    if (searchB !== "") {
        var makeList = document.createElement("ul");
        document.getElementById("results").appendChild(makeList);
        for (var i=0, j=localStorage.length; i<j; i++){
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var object = JSON.parse(value);
            for(n in object){
                if (searchB === object[n][1]) {
                    var listItem = document.createElement("li");
                    var subList = document.createElement("ul");
                    listItem.appendChild(subList);
                    makeList.appendChild(listItem);
                    for (m in object) {
                        var finalLi = document.createElement("li");
                        subList.appendChild(finalLi);
                        finalLi.innerHTML = object[m][0]+ " " +object[m][1];
                        //console.log(object[m][0]+ " : " +object[m][1]);
                    }
                }
            }
        }
    };
    //both
    /*if (browse != "Select One" && searchB != "") {
        for (var i=0, j=localStorage.length; i<j; i++){
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var object = JSON.parse(value);
        }
    };*/
};

searchBtn.addEventListener("click", getSearch); 
    



});