var swimMeetsMods = {};

(function () {  // This is an IIFE, an immediately executing function.
    // It is an anonymous function that runs once (and only once) at page load time.
    // It is a way to create private functions that can be shared. 

    var validateObjList = [];

    // in addition to the "normal fields" (that each need an input box and error message0, 
    // we have these items (in the HTML table) that are a little different: 

    //var selectTag;   // a select tag (dom element) that holds web user

    //var webUserInputTd;  // the Td that holds the selectTag.

    var saveButton;  // the save button that will actually try to insert a record

    var recordError; // the record level error message for messages like "Duplicate email"


    // Create and return the three column HTML table (col 1 is prompt, col 2 is input box, col 3 is 
    // field level error message). Side effect is saving references to the input boxes and 
    // field level error messages into the validateObjList (defined just above). Also, creating 
    // the saveButton and recordError (also defined just above). 
    function createValidationArea() {

        var validateTable = document.createElement("table");

        // call makeInputRow for each field. This will add a new row into the validateTable 
        // (a HTML table DOM element) and it will add two references per field in the 
        // associative array validateObjList (one will be inputBox and the other will be errorTd).

        /* public String swimMeetsId = "";
            public String meetsName = "";
            public String meetsDate = "";
            public String meetsPlace = "";
            public String image = "";
            public String qualification = "";
            public String committed = "";  
            public String committed2 = "";
            public String meetsFee = "";
            public String webuserID = ""; // Foreign Key
            public String userEmail = ""; // getting it from joined user_role table.   */

        makeInputRow("swimMeetsId", "Meet ID: ", validateTable);
        validateObjList["swimMeetsId"].inputBox.setAttribute("disabled", true);

        makeInputRow("meetsName", "Meet's Name: ", validateTable);
        makeInputRow("meetsDate", "Meet's Date: ", validateTable);
        makeInputRow("meetsPlace", "Meet's Place: ", validateTable);
        makeInputRow("image", "Image URL: ", validateTable);
        makeInputRow("qualification", "Qualification: ", validateTable);
        makeInputRow("committed", "Committed: ", validateTable);
        makeInputRow("committed2", "Are you sure? ", validateTable);
        makeInputRow("meetsFee", "Meets Fee: ", validateTable);
        
        makeInputRow("webuserID", "User: ", validateTable);
        validateObjList["webuserID"].inputBox.setAttribute("disabled", true);
        //makeInputRow("webuserID", "Web User ID: ", validateTable);
        //makeInputRow("userEmail", "Email: ", validateTable);

        // Add non-standard last row to validatTable. The first cell will hold a Save button. 
        // The 2nd cell will hold the record error. The 3rd cell will be just a filler.
        var row = Utils.make({
            htmlTag: "tr",
            parent: validateTable
        });
        var saveCell = Utils.make({
            htmlTag: "td",
            parent: row
        });

        // saveButton declared before this function
        saveButton = Utils.make({
            htmlTag: "button",
            innerHTML: "Save",
            parent: saveCell
        });

        // recordError declared before this function
        recordError = Utils.make({
            htmlTag: "td",
            parent: row,
            class: "error"
        });
        Utils.make({// third empty cell (filler) -- dont need a reference to this.
            htmlTag: "td",
            parent: row
        });
        
        //webUserInputTd = validateObjList["webuserID"].inputBox.parentElement;

        return validateTable;

    } // createValidationArea



    // ***** makeInputRow *****
    // This function creates then adds a tr (table row) into validationTable (a HTML table tag, input param). 
    // Into this tr, this function (makeInputRow):
    //   *  adds a 1st td filling that innerHTML with promptText. 
    //   *  adds a 2nd td, placing a textbox inside, and stores a reference to the textbox. 
    //   *  adds a 3rd td (classed "error") to hold validation error message (and stores a reference to it).
    //   
    // Finally, it creates an object that references the two things we need to access programatically: 
    // the input textbox (where user's input will be found) and the error td (where we will write any 
    // possible error messages). This object is stored into validationObjList using associative array 
    // notation (using fieldName as the key.)
    function makeInputRow(fieldName, promptText, validationTable) {

        var obj = {}; // this will hold references to the input box and the error td for the 
        // given field name.

        var row = Utils.make({// Inject a row into the table 
            htmlTag: "tr",
            parent: validationTable
        });
        Utils.make({// first td of row will hold promptText
            htmlTag: "td",
            innerHTML: promptText, // use fieldName as prompt for now, later promptText,
            parent: row
        });
        var inputTd = Utils.make({// second td of row will hold user input
            htmlTag: "td",
            parent: row
        });
        // store reference to this input box. we need to access it programatically 
        // (to find user's input).
        obj.inputBox = Utils.make({// place textbox in second td
            htmlTag: "input",
            parent: inputTd
        });
        // store reference to the 3rd td that is for holding error messages, 
        // so we can access it programmatically.
        obj.errorTd = Utils.make({
            htmlTag: "td",
            parent: row,
            class: "error"
        });
        // obj has a reference to the inputBox and the errorTd (the two things 
        // we need to access programatically to do validation). Store this 
        // object into an associative array (using fieldName as key). 
        validateObjList[fieldName] = obj;
    } // makeInputRow


    // create an object from the values typed into the page, URL encode it and return it.
    function getDataFromUI() {     // a private function within the IIFE 

        /*         public String swimMeetsId = "";
            public String meetsName = "";
            public String meetsDate = "";
            public String meetsPlace = "";
            public String image = "";
            public String qualification = "";
            public String committed = "";  
            public String committed2 = "";
            public String meetsFee = "";
            public String webuserID = ""; // Foreign Key
            public String userEmail = ""; // getting it from joined user_role table.     */

        var meetsInputObj = {

            "swimMeetsId": validateObjList["swimMeetsId"].inputBox.value,
            "meetsName": validateObjList["meetsName"].inputBox.value,
            "meetsDate": validateObjList["meetsDate"].inputBox.value,
            "meetsPlace": validateObjList["meetsPlace"].inputBox.value,
            "image": validateObjList["image"].inputBox.value,
            "qualification": validateObjList["qualification"].inputBox.value,
            "committed": validateObjList["committed"].inputBox.value,
            "committed2": validateObjList["committed2"].inputBox.value,
            "meetsFee": validateObjList["meetsFee"].inputBox.value,
            //"webuserID": selectTag.options[selectTag.selectedIndex].value,
            "webuserID": validateObjList["webuserID"].inputBox.value,
            //"userEmail": validateObjList["userEmail"].inputBox.value,

            "errorMsg": ""
        };
        console.log("getDataFromUI - meetsInputObj on next line");
        console.log(meetsInputObj);

        // JSON.stringify converts the javaScript object into JSON format 
        // (the reverse operation of what gson does on the server side).
        // Then, you have to encode the user's data (encodes special characters 
        // like space to %20 so the server will accept it with no security error). 
        return encodeURIComponent(JSON.stringify(meetsInputObj));
    }

    // write the jsonObj (full of error message) to the Validation UI. 
    function writeErrorObjToUI(jsonObj) {

        /*         public String swimMeetsId = "";
            public String meetsName = "";
            public String meetsDate = "";
            public String meetsPlace = "";
            public String image = "";
            public String qualification = "";
            public String committed = "";  
            public String committed2 = "";
            public String meetsFee = "";
            public String webuserID = ""; // Foreign Key
            public String userEmail = ""; // getting it from joined user_role table.     */

        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);
        validateObjList["swimMeetsId"].errorTd.innerHTML = jsonObj.swimMeetsId;
        validateObjList["meetsName"].errorTd.innerHTML = jsonObj.meetsName;
        validateObjList["meetsDate"].errorTd.innerHTML = jsonObj.meetsDate;
        validateObjList["meetsPlace"].errorTd.innerHTML = jsonObj.meetsPlace;
        validateObjList["image"].errorTd.innerHTML = jsonObj.image;
        validateObjList["qualification"].errorTd.innerHTML = jsonObj.qualification;
        validateObjList["committed"].errorTd.innerHTML = jsonObj.committed;
        validateObjList["committed2"].errorTd.innerHTML = jsonObj.committed2;
        validateObjList["meetsFee"].errorTd.innerHTML = jsonObj.meetsFee;
        validateObjList["webuserID"].errorTd.innerHTML = jsonObj.webuserID;
        //validateObjList["userEmail"].errorTd.innerHTML = jsonObj.userEmail;
        recordError.innerHTML = jsonObj.errorMsg;

    } // writeErrorObjToUI



    // webUserMods.insert gets called when the user clicks on Register or Plus 
    // sign from Web User List -- this method just builds the insert UI. 
    swimMeetsMods.insert = function () {

        var insertDiv = document.createElement("div");
        insertDiv.classList.add("background");

        Utils.make({// don't need a reference to this created DOM element, 
            // so not capturing the return value.
            htmlTag: "h2",
            innerHTML: "New Swim Meet",
            parent: insertDiv
        });

        // validateTable is declared outside this function. 
        // createValidationArea creates validateTable as an HTML table with three columns: 
        //   1.) prompt, 2.) input box, 3.) error message area
        // and one row per field in the web_user table (into which we are trying to insert). 

        insertDiv.appendChild(createValidationArea());

        // createValidationArea also creates a saveButton (button) and a recordError (td)
        // (both declared outside of createValidationArea).

        saveButton.onclick = function () {

            // like an "in progress" message while waiting for AJAX call.
            recordError.innerHTML = " &nbsp; &nbsp; ...";
            insertSave();
        };

        return insertDiv;

    }; // end of webUsers.insert


    function insertSave() {

        // create a user object from the values that the user has typed into the page.
        var myData = getDataFromUI();

        //console.log("webUserMods.insert: JSON data to send to insert API: "+myData); 

        ajax("webAPIs/insertMeetsAPI.jsp?jsonData=" + myData, processInsert, recordError);
        function processInsert(obj) {

            console.log("swimMeetsMods.insert/insertSave/processInsert error msg obj (see next line)");
            console.log(obj);

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (obj.errorMsg.length === 0) { // success
                obj.errorMsg = "Record successfully inserted.";
            }

            writeErrorObjToUI(obj);
        }
    } //insertSave
    
    
    swimMeetsMods.update = function (swimMeetsId) {

        console.log("swimMeets.update called with swimMeetsId " + swimMeetsId);

        var updateDiv = document.createElement("div");
        updateDiv.classList.add("background");

        Utils.make({// don't need a reference to this created DOM element, 
            // so not capturing the return value.
            htmlTag: "h2",
            innerHTML: "Update Swim Meet",
            parent: updateDiv
        });

        validateObjList = [];
        updateDiv.appendChild(createValidationArea());

        // createValidationArea also creates a saveButton (button) and a recordError (td)
        // (both declared outside of createValidationArea).

        saveButton.onclick = function () {

            // like an "in progress" message while waiting for AJAX call.
            recordError.innerHTML = " &nbsp; &nbsp; ...";
            updateSave();
        };

        ajax("webAPIs/getMeetByIdAPI.jsp?meetsId=" + swimMeetsId, gotRecordById, updateDiv);

        function gotRecordById(swimMeetsObj) { // obj is what got JSON.parsed from Web API's output

            console.log("gotRecordById, swimMeetsObj is next");
            console.log(swimMeetsObj);
            console.log(validateObjList);

            validateObjList["swimMeetsId"].inputBox.value = swimMeetsObj.swimMeetsId;
            validateObjList["meetsName"].inputBox.value = swimMeetsObj.meetsName;
            validateObjList["meetsDate"].inputBox.value = swimMeetsObj.meetsDate;
            validateObjList["meetsPlace"].inputBox.value = swimMeetsObj.meetsPlace;
            validateObjList["image"].inputBox.value = swimMeetsObj.image;
            validateObjList["qualification"].inputBox.value = swimMeetsObj.qualification;
            validateObjList["committed"].inputBox.value = swimMeetsObj.committed;
            validateObjList["committed2"].inputBox.value = swimMeetsObj.committed;
            validateObjList["meetsFee"].inputBox.value = swimMeetsObj.meetsFee;
            validateObjList["webuserID"].inputBox.value = swimMeetsObj.webuserID;
            //validateObjList["userEmail"].inputBox.value = swimMeetsObj.userEmail;
            
            
            //ajax("webAPIs/getWebUserAPI.jsp", processWebUser, updateDiv);

         /*   function processWebUser(obj) {

                if (obj.dbError.length > 0) {
                    validateObjList["webuserID"].errorTd.innerHTML += "Programmer Error: Cannot Create Web User List";
                } else {

                    console.log("WebUserId is " + swimMeetsObj.webuserID);
                    selectTag = Utils.makePickList({
                        list: obj.webUserList,

                        // property names for newer version of makePickList
                        idProp: "webuserID",
                        displayProp: "userEmail",

                        selectedKey: swimMeetsObj.webuserID  // key that is to be pre-selected (optional)
                    });
                    
                    webUserInputTd.innerHTML = "";
                    webUserInputTd.appendChild(selectTag);
                }
            } // processWebUser*/

        } // gotRecordById

        return updateDiv;

    }; // end of webUsers.update

    function updateSave() {

        var myData = getDataFromUI();
        ajax("webAPIs/updateMeetsAPI.jsp?jsonData=" + myData, reportUpdate, recordError);
        function reportUpdate(jsErrorObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsErrorObj.errorMsg.length === 0) { // success
                jsErrorObj.errorMsg = "Record successfully updated. ";
            }

            writeErrorObjToUI(jsErrorObj);
        }
    } //updateSave

}());  // end of the IIFE