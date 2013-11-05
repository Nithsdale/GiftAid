// Lindsay Hooton

$('#home').on('pageinit', function(){
         function launchSearch(){
               window.location="search.js"; 
         };       
});	
		
$('#addItem').on('pageinit', function(){

		var myForm = $('#form1'),
                errorLink = $("#additemerrorlink");
                myForm.validate({
                     invalidHandler: function(form, validator) {
                     errorLink.click();
                
                var html = "";
                for (var key in validator.submitted) {
                     var label = $('label[for^="'+ key + '"]').not('[generated]');
                     console.log(label.text());
                     var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                     var fieldName = legend.length ? legend.text() : label.text();
                     html += "<li>"+ fieldName +"</li>";
                }
                $("#additemerror ul").html(html);
                console.log(html);
                },
                submitHandler: function() {
                     var data = myForm.serializeArray();
                     storeData(data);
                     console.log(data);
                }
	});
});