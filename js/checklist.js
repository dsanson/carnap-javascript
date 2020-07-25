function checklist() {
    // if we can't fetch AssignmentState, that means we are not
    // a Carnap assignment. So we'll just go ahead and create an
    // empty object.
    try {
        var as = JSON.parse(AssignmentState);
    }
    catch {
        console.log("Unable to parse AssignmentState");
        var as = {}
    }
    
    // if this is the first time we run on a given assignment page,
    // we need to create as["Checklist Items"]
    if (typeof as["Checklist Items"] === "undefined") {
        as["Checklist Items"] = {} 
    }
    
    $(":checkbox").each(function() {
        // pandoc disables all checkboxes by default, so we undisable them
        $( this ).prop("disabled", false);

        // apply stored settings from AssignmentState
        if (as["Checklist Items"][$( this ).val()]) {
            $( this ).prop("checked", true);
        }
        else {
            $( this ).prop("checked", false);
        }

        $( this ).click(function () {
            // when an input box is clicked, update AssignmentState
            v = $( this ).val()
            if ($( this ).is(":checked")) {
                as["Checklist Items"][v] = true;
                $(':checkbox[value="'+v+'"]').prop("checked", true);
            }
            else {
                as["Checklist Items"][v] = false;
                $(':checkbox[value="'+v+'"]').prop("checked", false);
            }
            console.log(as);
            
            // If we can't putArgumentState, that probably means we aren't
            // a Carnap.io assignment.
            try {
                putAssignmentState(JSON.stringify(as));
            }
            catch {
                console.log("Unable to putArgumentState")
            }
        });
    }); 
}

$( document ).ready(function() {
    checklist();     
})




