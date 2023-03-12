

function clickSortUserContent() {
    
    var ele = document.createElement("div");
    var myDiv1 = document.createElement("div");

    ajax("json/users.json", processUserData, myDiv1);
    
    function processUserData (userList) { // callback function

        var newUserList = [];
        for (var i = 0; i < userList.length; i++) 
        {
            newUserList[i] = {};
            
            newUserList[i].Image = TableUtils.makeImage(userList[i].image, "15rem");
            newUserList[i].WebUserId = TableUtils.makeNumber(userList[i].webUserId, false);
            newUserList[i].Email = TableUtils.makeText(userList[i].userEmail);
            newUserList[i].Birthdate = TableUtils.makeDate(userList[i].birthday);
            newUserList[i].UserRoleID = TableUtils.makeNumber(userList[i].userRoleId, false);
            newUserList[i].UserRoleType = TableUtils.makeText(userList[i].userRoleType);
            
        }

        var swim = MakeClickSort("The Swim Team", newUserList, "WebUserId");
        swim.classList.add("clickSort");
        swim.classList.add("background");
        myDiv1.appendChild(swim);

    }
    ele.appendChild(myDiv1);
    return ele;
}