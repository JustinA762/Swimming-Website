
function home() {

var content = `
        
        <div class="background">
            <h2>Home</h2>
            <div id="home-pic"><img src="pics/swim.jpg"></div>
            <p>
            Are you interested in swimming, but aren't a strong swimmer or want to stay fit? The welcome to the Temple Swim Club! 
            Whether you are an experienced swimmer or someone who is a beginner, anyone is welcome! 
            We will teach and train you great techniques of survival and even competitive swimming!
            <br>
            <br>
            If you are looking for some tips for swimming, check out the link below. 
            <br>
            <br>
            <a href="https://www.youtube.com/watch?v=XS3_lChWJC4" target="_blank">Click me!</a>
            <p>
        </div>
    
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
        }