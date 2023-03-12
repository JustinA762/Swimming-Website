function MakeMember (theseason, theimage, theBegPrice, theExpPrice) {
   
    
    var memberObj = document.createElement("div");
    memberObj.classList.add("memberStyle"); // adds styling to div - see obj.css rules for ".obj"
    memberObj.classList.add("background");

    memberObj.season = theseason; // public
    var begPrice = theBegPrice;   // private
    var expPrice = theExpPrice;   // private


    var hdrImage = document.createElement("div");
    hdrImage.classList.add("imageContainer"); // see obj.css rules for ".obj .imageContainer"
    memberObj.appendChild(hdrImage);

    var myImage = document.createElement("img");
    myImage.src = theimage; // public
    memberObj.appendChild(myImage);

    var memberInfo = document.createElement("div");
    memberObj.appendChild(memberInfo);
    
        // USD Format
    function formatCurrency(num) {
        return num.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
    }

    function display ( ) {           // create custom method “display”

        memberInfo.innerHTML = "<br/><b>Season:</b> " + memberObj.season + "<br/><b> Beginner Price:</b> " +
                               formatCurrency(begPrice) + "<br/><b>Experienced Price:</b> " + formatCurrency(expPrice)
    };
    
    memberObj.setSeason = function (newseason) {
        memberObj.season = newseason;
        display(); // show updated property on the page
    };
    
    // Changing the Beginner Price
    memberObj.setBegPrice = function (newprice) {
        begPrice = newprice;
        display(); // show updated property on the page
    };
    
    // Changing the Experienced Price
    memberObj.setExpPrice = function (newprice) {
        expPrice = newprice;
        display(); // show updated property on the page
    };
    
    display();

    memberObj.appendChild(document.createElement("br"));

    var seasonButton = document.createElement("button");
    seasonButton.innerHTML = "Change Season name to: ";
    memberObj.appendChild(seasonButton);

    var newSeasonInput = document.createElement("input");
    memberObj.appendChild(newSeasonInput);

    seasonButton.onclick = function ()
    {
        memberObj.setSeason(newSeasonInput.value);
    };

    memberObj.appendChild(document.createElement("br"));

    var begPriceButton = document.createElement("button");
    begPriceButton.innerHTML = "Change Beginner price to: ";
    memberObj.appendChild(begPriceButton);

    var newBegPriceInput = document.createElement("input");
    memberObj.appendChild(newBegPriceInput);

    begPriceButton.onclick = function () {
        memberObj.setBegPrice(newBegPriceInput.value);
    };

    memberObj.appendChild(document.createElement("br"));

    var expPriceButton = document.createElement("button");
    expPriceButton.innerHTML = "Change Experienced price to: ";
    memberObj.appendChild(expPriceButton);

    var newExpPriceInput = document.createElement("input");
    memberObj.appendChild(newExpPriceInput);

    expPriceButton.onclick = function () {
        memberObj.setExpPrice(newExpPriceInput.value);
    };
         
    return memberObj;
}