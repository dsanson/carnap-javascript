function checklist() {
    try {
        var as = JSON.parse(AssignmentState);
    }
    catch {
        var as = {}
        as["syllabus"] = true
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
            putAssignmentState(JSON.stringify(a));
        });
    }); 
}

$( document ).ready(function() {
    checklist();     
})




