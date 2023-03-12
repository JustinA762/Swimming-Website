
function MakeStrokes(thename, thetype) // thetype either being 'stroke' or 'other'
{   
    // Main Container
    var container = document.createElement("div");
    
    // Making the Stroke and Other divs in order to have sections of strokes
    container.classList.add("background");
    var title = document.createElement("h1");
    title.name = thename;
    title.innerHTML = title.name;
    container.appendChild(title);
    
    // Move Back to the Top button
    var linkContainer = document.createElement("button");
    linkContainer.classList.add("button");
    var link = document.createElement("a");
    link.href = "#Freestyle";
    link.innerHTML = "Back to top";
    linkContainer.appendChild(link);
    container.appendChild(linkContainer);
    
    // Filter of Body Workout
    var myFilterContainer = document.createElement("div");
    
    // All
    var all = document.createElement("button");
    all.classList.add("button");
    all.innerHTML = "Show All";
    all.onclick = function() 
    {
        filterSelect("all");
    };
    myFilterContainer.appendChild(all);
    
    // arms
    var arms = document.createElement("button");
    arms.classList.add("button");
    arms.innerHTML = "Arms";
    arms.onclick = function() 
    {
        filterSelect("arms");
    };
    myFilterContainer.appendChild(arms);
    
    // Breathing
    var breathing = document.createElement("button");
    breathing.classList.add("button");
    breathing.innerHTML = "Breathing";
    breathing.onclick = function() 
    {
        filterSelect("breathing");
    };
    myFilterContainer.appendChild(breathing);
    
    // Core
    var core = document.createElement("button");
    core.classList.add("button");
    core.innerHTML = "Core";
    core.onclick = function() 
    {
        filterSelect("core");
    };
    myFilterContainer.appendChild(core);
    
    // Legs
    var legs = document.createElement("button");
    legs.classList.add("button");
    legs.innerHTML = "Legs";
    legs.onclick = function() 
    {
        filterSelect("legs");
    };
    myFilterContainer.appendChild(legs);
    container.appendChild(myFilterContainer);
    
    // Container for MakeDrill
    var stroke = document.createElement("div");
    stroke.classList.add(thetype);
    stroke.setAttribute('id', thename);
    container.appendChild(stroke);
    
    // For the filter 
    filterSelect("all");
    function filterSelect(c) {
      var x, i;
      x = document.querySelectorAll(".body-section");
      if (c === "all") c = "";

      for (i = 0; i < x.length; i++) {
        RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
      }
    }

    // Show filtered elements
    function AddClass(element, name) 
    {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) 
      {
        if (arr1.indexOf(arr2[i]) === -1) 
        {
          element.className += " " + arr2[i];
        }
      }
    }

    // Hide elements that are not selected
    function RemoveClass(element, name) 
    {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) 
      {
        while (arr1.indexOf(arr2[i]) > -1) 
        {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
      element.className = arr1.join(" ");
    }
    
    return container;
}
