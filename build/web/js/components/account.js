

var account = {};

(function() // IIFE eimmediately invoking function execution
{
    account.logon = function() // Logon information
    {
        var logonDiv = document.createElement("div");
        logonDiv.classList.add("find");
        logonDiv.classList.add("background");
        
        // Span declaration
        var emailSpan = document.createElement('span');
        var passwordSpan = document.createElement('span');
        
        // Span 
        emailSpan.innerHTML = "Email Address: ";
        var emailInput = document.createElement("input");
        passwordSpan.innerHTML = " Password: ";
        var passwordInput = document.createElement("input");
        
        // The Setup
        logonDiv.appendChild(emailSpan);
        logonDiv.appendChild(emailInput);
        logonDiv.appendChild(passwordSpan);
        passwordInput.setAttribute("type", "password");
        logonDiv.appendChild(passwordInput);
        
        // Button
        var logonButton = document.createElement("button");
        logonButton.innerHTML = "Submit";
        logonDiv.appendChild(logonButton);

        // The Stored Profile
        var msgDiv = document.createElement("div");
        logonDiv.appendChild(msgDiv);

        logonButton.onclick = function () // Logging in 
        {
            var url = "webAPIs/logonAPI.jsp?user_email=" + escape(emailInput.value) +
                  "&user_password=" + escape(passwordInput.value); 

            console.log("onclick function will make AJAX call with url: " + url);

            ajax(url, processLogon, msgDiv); // Ajax 

            function processLogon(obj) // To deliver the profile information from buildProfile
            {
                msgDiv.innerHTML = buildProfile(obj);
            }
        };  // onclick function

        return logonDiv; // Return whole div
    };
    
    function buildProfile(obj) // To deliver the profile logon information
    {
        var msg = "";
        console.log("Successfully called the find getProfile. Next line shows the returned object.");
        console.log(obj);
        if (obj.errorMsg.length > 0) {
            msg += "<strong>Error: " + obj.errorMsg + "</strong>";
        } else {
            msg += "<strong>Web User " + obj.webUserId + "</strong>";
            msg += "<br/> Birthday: " + obj.birthday;
            msg += "<br/> MembershipFee: ";
            if (obj.membershipFee === 0.00)
            {
                msg += "Free";
            }
            else 
            {
                msg += obj.membershipFee;
            }
            msg += "<br/> User Role: " + obj.userRoleId + " " + obj.userRoleType;
            msg += "<p> <img src ='" + obj.image + "'></p>";
        }
        
        return msg;
    };
    
    account.getProfile = function() // To get the Profile 
    {
        var getProfileDiv = document.createElement("div");
        getProfileDiv.classList.add("background");

        var msgDiv = document.createElement("div");
        getProfileDiv.appendChild(msgDiv);

        var url = "webAPIs/getProfileAPI.jsp";
        ajax(url, processProfile, msgDiv);

        function processProfile(obj) // To deliver the profile information from buildProfile
        {
            msgDiv.innerHTML = buildProfile(obj);
        }
        
        return getProfileDiv;
    };
    
    account.logoff = function() // Logging off
    {
        var logoffDiv = document.createElement("div");
        logoffDiv.classList.add("background");

        var msgDiv = document.createElement("div");
        logoffDiv.appendChild(msgDiv);

        var url = "webAPIs/logoffAPI.jsp";
        ajax(url, processLogoff, msgDiv);

        function processLogoff(obj) 
        {
            msgDiv.innerHTML = buildProfile(obj);
        }
        
        return logoffDiv;
    };
    
    account.getAllUser = function() // Displays the list
    {
        var allUserDiv = document.createElement("div");
        allUserDiv.classList.add("background");
        window.open("webAPIs/listUsersAPI.jsp", "User Profile", "height=400,width=400");
        
        return allUserDiv;
    }
    
}( )); // invoke the IIFE


