function checklist() {
    try {
        var as = JSON.parse(AssignmentState);
    }
    catch {
        console.log("Unable to parse AssignmentState");
        var as = {}
    }

    if (typeof as["Checklist Items"] === "undefined") {
        as["Checklist Items"] = {} 
    }

    $(".task-list :checkbox").each(function() {
        $( this ).prop("disabled", false);
        if (as["Checklist Items"][$( this ).val()]) {
            $( this ).prop("checked", true);
        }
        else {
            $( this ).prop("checked", false);
        }
        $( this ).click(function () {
            if ($( this ).is(":checked")) {
                as["Checklist Items"][$( this ).val()] = true;
            }
            else {
                as["Checklist Items"][$( this ).val()] = false;
            }
            console.log(as);
            putAssignmentState(JSON.stringify(as));
        });
    }); 
}

$( document ).ready(function() {
    checklist();     
})




