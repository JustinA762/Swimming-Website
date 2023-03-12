
function blog() {

    var content = ` 
      <div class="background">
        <h4>Database</h4>
        <p>
          The database table I propose is --> Users are swimmers, other table are the meets they went to 
          (Some swimmer can be qualifiers).
        </p>
        <h4>My Webdevelopment Experience</h4>
        <p>
          I was formally introduced to web design and web development when I was senior in high school.
          I took a web design course in Montgomery County Community College, but didn't take it serious until the pandemic happened.
          I would look and learn from youtube videos as well as explore different designs and functionality of websites.
          Though I'm not an expert, I do know a few things or two.
        </P>
        <h4>HomePage Homework</h4>
        <p>
          Overall this homework is fun and a big refresher to me. But if I had to pick a hard thing about this homework,
          it has to be picking the colors and figuring out the layout of the website. Once I got a rough idea of what I want,
          everything else was fine to easy.
        </p>
        <h4>JS UI Homework</h4>
        <p>
          This Though this homework was not hard, it also was not easy, proving to be a new challenge for me. There is a lot of new things about javascript that I didn't know about.
          What one of them being content-related. What I found easy to understand is the organization of the files and folders, it wasn't that hard to understand.
          I learned that learning more javascript can help save time and make a programmers life easier especially for the navbar.
        </p>
        <h4>JS Object Homework</h4>
        <p>
          Out of all of the homework so far, this is the hardest. I took a long time learning the private and public data members than it was for me to finally complete my homework.
          I found the naming very confusing and difficult. Even now, I still find myself slightly confused and will probably explore this again in my own time.
          I understand the value of this homework and if I master this, I can be more efficent with Javascript.
        </p>
        <h4>Database Homework</h4>
        <p>
          I found this homework pretty easy overall since I have learned SQL a few semesters back. I found the making of the tables and records easy.
          At first, I found the select from where difficult until I relearned it. From there, it was pretty easy.
          I found databases to be valuable since websites rely on them.  
          Click <a target="_blank" href='Ardamoy_DatabaseHW.pdf'>here</a> to see my database document.
        </p>
        <h4>ClickSort Homework</h4>
        <p>
          By far, I made this Homework harder than I needed it to be. I had confusion with my ajax since it kept giving me an issue but I eventually over came it.
          I also had trouble with the reverse sort, but just like the ajax, I figured it out.
          The easiest part of the Homework was the json since I literally had the information with me.
          I learned the idea of how to sort in javascript.
        </p>
        <h4>Tutorial Proposal</h4>
        <p>
          This assignment is overall pretty easy. If I had to pick a challenging part about this assignment, it would have to be picking the topic and how-to.
          I was confused on picking the topic until I reread the proposal and reselected my topic, making sure that it wasn't selected.
        </p>
        <h4>Web API Homework</h4>
        <p>
          One server side access ocde I have written was for my Other since my Users is already set up. Just like the Users, the Other now has access to a live server in mySQL.
          I learned how to create a website with live server data (Web API) format. This was something I wanted to learn for a long time so I was excite to learn this.
          I found identifying the files needed for this homework to be easy, but the modifying and setup of the code onto my website I found to be difficult and confusing, eventually I figured it out.
          Click <a target="_blank" href="WebAPIHW.pdf">here</a> to see my error document.
          Click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a> for my List Users Web API.
          Click <a target="_blank" href="webAPIs/listOtherAPI.jsp">here</a> for my List Swim Meets API.
        </p>
        <h4>Logon Homework</h4>
        <p>
          I learned how to create a logon and logoff profile using ajax and the APIs.
          I found implementing the APIs into account.js to be pretty difficult since it took a while for me to figure out how to get it working.
          I found the making of the APIs to be pretty easy. <br/>
          Click <a target="_blank" href="webAPIs/logonAPI.jsp?user_email=good@yahoo.net&user_password=123">here</a> for my Logon. <br/>
          Click <a target="_blank" href="webAPIs/logoffAPI.jsp">here</a> for my Logoff. <br/>
          Click <a target="_blank" href="webAPIs/getProfileAPI.jsp">here</a> for my GetProfile <br/>
          Click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a> for my List Users <br/>
        </p>
        <h4>Tutorial Homework</h4>
        <p>
          I learned more about how reuseable components worked along with other new features.
          The easy part of this assignment is that getting and planning the idea. 
          The hard part was executing that idea. I especially had trouble with making the Read More and Filter functions as they didn't execute properly. I got most of them working in the end, but not all.
          But overall, it was a good learning experience in order me to know more about making the reuseable components to make a programmer's life easier in the long run.
        </p>
        <h4>Update Homework</h4>
        <p>
          I learned how to update my web users and my swim meets table.
          The hardest part about the assignment was trying to implement a similar code for my "other" which being the swim meets since it was different from web users. 
          The easiest part was working and adding the files for each of them especially ones that were related to the web user.
          Overall, I guess this homework wasn't too bad and it was interesting learning more about IIFE and how easy it is to use other functions to make the user interface easier.
        </p>
        <h4>Delete Homework</h4>
        <p>
          I learned how to delete a listed data from both my users and other table.
          There wasn't anything hard about the assignment since I didn't need to change a lot of things.
          Most of the information was already setup because of the update and Insert homeworks.
        </p>
      </div>
    
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;    
}