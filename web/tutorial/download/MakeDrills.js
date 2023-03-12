
function MakeDrills(thename, theimage, theBodyFocus, theBenefit) // focus meaning where does it workout the body
{
    // Main Container
    var container = document.createElement("div");
    container.classList.add("body-section");
    // container.classList.add("filterDiv");
    container.classList.add(theBodyFocus);
    
    // Heading
    var title = document.createElement("h2");
    title.name = thename;
    title.innerHTML = title.name;
    container.appendChild(title);
    
    // Image
    var drillImg = document.createElement("img");
    drillImg.src = theimage;
    container.appendChild(drillImg);
    
    // The Body Workout Focus
    var bodySection = document.createElement("h3");
    bodySection.focus = theBodyFocus;
    bodySection.innerHTML = "Part: " + bodySection.focus;
    container.appendChild(bodySection);
    // console.log(bodySection.focus);
    
    // Descrciption
    var descriptionBenefit = document.createElement("p");
    descriptionBenefit.classList.add("contents");
    var benefit = theBenefit;
    descriptionBenefit.innerHTML = benefit;
    container.appendChild(descriptionBenefit);
    
    // Button
    var readButton = document.createElement("button");
    readButton.classList.add("button");
    readButton.setAttribute('id', "switch");
    readButton.innerHTML = "Read More";
    readButton.onclick = function()
    {
        readMore(readButton);
    };
    container.appendChild(readButton);
    
    // Modifies the class content located in descriptionBenefits 'p'
    let contents = document.querySelectorAll(".contents");
    contents.forEach(content => {

        if (content.textContent.length === true) 
        {
            content.nextElementSibling.style.display = "none";
        }
        else
        {
            let insideText = content.textContent;
            content.innerHTML = `<span class="hide more">${insideText}</span>`; // Adds a span element with a Template Literal of the description
        }
    });

    // The function for the Read More Read Less
    function readMore(btn) 
    {
        let post = btn.parentElement;

        post.querySelector(".more").classList.toggle("hide"); // toggles hide and more from span

        btn.textContent === "Read More" ? btn.textContent = "Read Less" : btn.textContent = "Read More";
    }
    
    return container;
}
