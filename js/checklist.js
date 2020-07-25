function checklist() {
    try {
        var as = JSON.parse(AssignmentState);
    }
    catch {
        console.log("Unable to parse AssignmentState");
        console.log(AssignmentState);
        var as = {}
    }

    $(".task-list :checkbox").each(function() {
        $( this ).prop("disabled", false);
        if (as[$( this ).val()]) {
            $( this ).prop("checked", true);
        }
        $( this ).click(function () {
            if ($( this ).is(":checked")) {
                as[$( this ).val()] = true;
            }
            else {
                as[$( this ).val()] = false;
            }
            console.log(as);
            putAssignmentState(JSON.stringify(as));
        });
    }); 
}

$( document ).ready(function() {
    checklist();     
})




