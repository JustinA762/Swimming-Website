function SeasonalMember() {

var content = `
        <style>
            p {
                margin-left: 1.5rem;
            }
            .flexContainer {
                display:flex; 
                flex-direction: row;
            }
            .flexContainer .memberStyle {
                width: 25%; /* to fit three columns inside the flexContainer */
                box-sizing: border-box; /* makes padding and border counted in the width */
            }
        </style>
    `;
        "use strict";
        
        var ele = document.createElement("div");
        ele.innerHTML = content; // the HTML code specified just above...
        var memObjects = document.createElement("div");
        memObjects.classList.add('flexContainer'); // see styling in this file, above...
        ele.appendChild(memObjects);
        memObjects.appendChild(MakeMember("Fall", "pics/swim_fall.jpg", "$295", "$345"));
        memObjects.appendChild(MakeMember("Winter", "pics/swim_winter.jpg", "$395", "$445"));
        memObjects.appendChild(MakeMember("Spring", "pics/swim_spring.jpg", "$295", "$345"));
        memObjects.appendChild(MakeMember("Summer", "pics/swim_summer.jpg", "$355", "$395"));
        return ele;
}