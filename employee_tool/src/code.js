/* Add your code here... */

$(document).ready(function(){
    $.get("http://localhost:8080/employees", function (data, status) {
        //alert("Data: " + data + "\nStatus: " + status);
        if (status != "success") {
            throw "error reading data. Please check if server is running."
        } else {
            loadData(data);
        }
    });

    $("#addEmployee").click(function () {
        //$("#empForm").ajaxSubmit({
        $.post(
            'http://localhost:8080/employees/',
            $("#empForm").serialize()
        );
        loadData(("#empForm").load('http://localhost:8080/employees/'));
    });
    

    $("a").on("click", (function () {
        alert(this.id);

        $.ajax({
            url: 'http://localhost:8080/employees/' + this.id,
            type: 'DELETE',
            success: function (result) {
                alert(result);
            }
        });
    }));

    function loadData(data) {
        //alert("1");
        var emp = $.parseJSON(data);
        //alert("2");
        //document.getElementById("demo").innerHTML = emp.name;
        htmTable = ""
        //alert(emp.length);
        $.each(emp, function (key, val) {
            htmTable = htmTable + "<tr><td>" + emp[key].name + "</td><td>" + emp[key].role + "</td><td>" + emp[key].salary + "</td>"
            htmTable = htmTable + "<td>"
            //"<img src='pics/delete.png' style='width:20px; height:20px; alt='delete record' id=" + emp[key].id + " />"
            htmTable = htmTable + $("<div id=" + emp[key].id + ">Delete</div>").on('click', function () {
                $.ajax({
                    url: 'http://localhost:8080/employees/' + this.id,
                    type: 'DELETE',
                    success: function (result) {
                        alert(result);
                    }
                });
            });

            htmTable = htmTable + "</a></td></tr>";
        });


        $("#empRecords").append(htmTable);
    }
});


/*
$("form").submit(function(event){
  event.preventDefault();
  var formData = $("form").serializeArray(); // Create array of object
  var jsonConvertedData = JSON.stringify(formData);  // Convert to json
  consol.log(jsonConvertedData);
});
*/