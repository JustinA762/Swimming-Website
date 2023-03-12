

function LiveUsers() {
    
    function deleteUser (userId, td) {
        console.log("to delete user "+userId);

        if (confirm("Do you really want to delete user " + userId + "? ")) {

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

    // **************** ENTRY POINT *****************
    
    var ele = document.createElement("div");
    ele.classList.add("background");
    ele.classList.add("clickSort");
    var myDiv1 = document.createElement("div");

    ajax("webAPIs/listUsersAPI.jsp", processUserData, myDiv1);
    
    function processUserData (userList) { // callback function
        
        if (userList.dbError.length !== 0) 
        {
            myDiv1.innerHTML = userList.dbError;
        } 
        else 
        {   
            var heading = Utils.make({
                htmlTag: "h2",
                parent: myDiv1
            });
            Utils.make({// don't need reference to this span tag...
                htmlTag: "span",
                innerHTML: "The Swim Team ",
                parent: heading
            });
            var img = Utils.make({
                htmlTag: "img",
                parent: heading
            });
            
            img.src = CRUD_icons.insert;
            img.onclick = function () {
                // By changing the URL, you invoke the user insert. 
                window.location.hash = "#/userInsert";
            };
            
            var userList = userList.webUserList;
            var newUserList = [];
            
            for (var i = 0; i < userList.length; i++) 
            {
                newUserList[i] = {};

                newUserList[i].Image = TableUtils.makeImage(userList[i].image, "15rem");
                newUserList[i].WebUserId = TableUtils.makeNumber(userList[i].webUserId, false);
                newUserList[i].Email = TableUtils.makeText(userList[i].userEmail);
                newUserList[i].Birthdate = TableUtils.makeDate(userList[i].birthday);
                newUserList[i].Role = TableUtils.makeText(userList[i].userRoleId + " " + userList[i].userRoleType);
                
                newUserList[i]._Update = TableUtils.makeLink(
                    "<img src='" + CRUD_icons.update + "'  style='width:1rem' />", // innerHTML of link
                    '#/userUpdate/' + userList[i].webUserId             // href of link
                    );
            
                newUserList[i]._Delete = TableUtils.makeImage(CRUD_icons.delete, '1rem');
                
                const userId = userList[i].webUserId;
                newUserList[i]._Delete.onclick = function () {
                    deleteUser(userId,this);
                };
            }

            var swim = MakeClickSort(" ", newUserList, "WebUserId");
            
            myDiv1.appendChild(swim);
        }
    }
    ele.appendChild(myDiv1);
    return ele;
}