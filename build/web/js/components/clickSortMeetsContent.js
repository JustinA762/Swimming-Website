

function clickSortMeetsContent() {
    
    var ele = document.createElement("div");
    var myDiv1 = document.createElement("div");

    ajax("json/qualifers.json", processMeetsData, myDiv1);
    
    function processMeetsData (meetsList) { // callback function

        var newMeetsList = [];
        for (var i = 0; i < meetsList.length; i++) 
        {
            newMeetsList[i] = {};

            newMeetsList[i].Image = TableUtils.makeImage(meetsList[i].meetsImg, "2rem");
            newMeetsList[i].swimMeetsId = TableUtils.makeNumber(meetsList[i].swimMeetsId, false);
            newMeetsList[i].Name = TableUtils.makeText(meetsList[i].meetsName);
            newMeetsList[i].Date = TableUtils.makeDate(meetsList[i].meetsDate);
            newMeetsList[i].Place = TableUtils.makeText(meetsList[i].meetsPlace);
            newMeetsList[i].webUserId = TableUtils.makeNumber(meetsList[i].webUserId, false);
            newMeetsList[i].userEmail = TableUtils.makeText(meetsList[i].userEmail);
            
        }

        var swim = MakeClickSort("Meets", newMeetsList, "swimMeetsId");
        swim.classList.add("clickSort");
        swim.classList.add("background");
        myDiv1.appendChild(swim);

    }
    ele.appendChild(myDiv1);
    return ele;
}