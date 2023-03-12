

function LiveAvailable() {
    
    function deleteMeets (meetsId, td) {
        console.log("to delete user "+meetsId);

        if (confirm("Do you really want to delete meet " + meetsId + "? ")) {

            // HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
            // following (delete the row that was clicked from the User Interface).

            // get the row of the cell that was clicked 
            var dataRow = td.parentNode;
            var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
            var dataTable = dataRow.parentNode;
            dataTable.deleteRow(rowIndex);
            alert("Note: this version of the sample code does NOT actually invoke the delete Web API " +
                    "so the row will reappear when you refresh the page.");
        }
    }
    
    var ele = document.createElement("div");
    ele.classList.add("clickSort");
    ele.classList.add("background");
    var myDiv1 = document.createElement("div");

    ajax("webAPIs/listOtherAPI.jsp", processMeetsData, myDiv1);
    ajax("webAPIs/listUsersAPI.jsp", processMeetsData, myDiv1);
    
    function processMeetsData (meetsList) { // callback function
        
        if (meetsList.dbError.length !== 0) 
        {
            myDiv1.innerHTML = meetsList.dbError;
        } 
        else 
        {
            var heading = Utils.make({
                htmlTag: "h2",
                parent: myDiv1
            });
            Utils.make({// don't need reference to this span tag...
                htmlTag: "span",
                innerHTML: "Committed Availability ",
                parent: heading
            });
            var img = Utils.make({
                htmlTag: "img",
                parent: heading
            });
            
            img.src = CRUD_icons.insert;
            img.onclick = function () {
                // By changing the URL, you invoke the user insert. 
                window.location.hash = "#/meetsInsert";
            };
            
            var meetsList = meetsList.swimMeetsList;
            var newMeetsList = [];
            
            for (var i = 0; i < meetsList.length; i++) 
            {
                newMeetsList[i] = {};

                newMeetsList[i].Image = TableUtils.makeImage(meetsList[i].image, "2rem");
                newMeetsList[i].swimMeetsId = TableUtils.makeNumber(meetsList[i].swimMeetsId, false);
                newMeetsList[i].Name = TableUtils.makeText(meetsList[i].meetsName);
                newMeetsList[i].Date = TableUtils.makeDate(meetsList[i].meetsDate);
                newMeetsList[i].Place = TableUtils.makeText(meetsList[i].meetsPlace);
                newMeetsList[i].Committed = TableUtils.makeText(meetsList[i].committed);
                newMeetsList[i].WebUserId = TableUtils.makeNumber(meetsList[i].webuserID, false);
                newMeetsList[i].Email = TableUtils.makeText(meetsList[i].userEmail);
                
                newMeetsList[i]._Update = TableUtils.makeLink(
                    "<img src='" + CRUD_icons.update + "'  style='width:1rem' />", // innerHTML of link
                    '#/meetsUpdate/' + meetsList[i].swimMeetsId             // href of link
                    );
                
                newMeetsList[i]._Delete = TableUtils.makeImage(CRUD_icons.delete, '1rem');
                
                const meetsId = meetsList[i].swimMeetsId;
                newMeetsList[i]._Delete.onclick = function () {
                    deleteMeets(meetsId,this);
                };
            }

            var swim = MakeClickSort(" ", newMeetsList, "swimMeetsId");
            myDiv1.appendChild(swim);
        }
    }
    ele.appendChild(myDiv1);
    return ele;
}