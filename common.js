const BIRTHDAY = new Date("2026-11-25T19:00:00Z"); // 26 Nov 00:00 Asia/Karachi
const NEXT_BIRTHDAY = new Date("2027-11-25T19:00:00Z");
const $ = id => document.getElementById(id);
const chapterData = [
 {title:"Our Beautiful Beginning",sub:"Every lovely story has a first page.",intro:"Some beginnings are quiet, and then they become your favourite part of life.",titles:["The Day Everything Changed","A Smile Worth a Million Stars","The First Little Spark","A Moment to Keep","The Start of Something Beautiful","A Chapter I Treasure","The Sweetest Surprise","Where It All Began","A Feeling Like Home","Our First Forever"]},
 {title:"A Thousand Reasons to Love You",sub:"The little things make you extraordinary.",intro:"There are more reasons than words could ever hold. Here are a few little reminders.",titles:["Your Kind Heart","The Way You Smile","Your Beautiful Mind","Little Things You Do","Your Magical Laugh","The Light in Your Eyes","Your Gentle Soul","Simply Being You","A Thousand Little Wonders","Everything I Adore"]},
 {title:"Your Beautiful Memories",sub:"Moments I wish I could frame forever.",intro:"A collection of moments, waiting for the photographs that make them yours.",titles:["Moments in Bloom","Golden Little Memories","A Day to Remember","The Happiest Frames","A Collection of Smiles","Beautifully Unforgettable","The Moments Between","Our Favourite Days","A Memory Garden","Forever in Pictures"]},
 {title:"Letters From My Heart",sub:"Some feelings deserve their own pages.",intro:"For the feelings that are too big to fit into an ordinary conversation.",titles:["A Note for You","Words I Keep Inside","If My Heart Could Speak","A Little Reminder","A Page Just for You","Things You Should Know","My Favourite Words","A Letter Across the Stars","With Every Beat","Always and All Ways"]},
 {title:"Our Dreams & Forever",sub:"A thousand tomorrows to look forward to.",intro:"The best chapters are still waiting to be written, one beautiful day at a time.",titles:["Places We'll Go","A Sky Full of Plans","Our Little Traditions","Someday, Somewhere","A Thousand Tomorrows","Dreams We Can Share","The Life We Imagine","Hand in Hand","More Memories Ahead","To Every New Beginning"]},
 {title:"The Queen of My Universe",sub:"The world feels softer with you in it.",intro:"For the one who makes ordinary days feel a little more extraordinary.",titles:["My Favourite Person","The Crown You Never Needed","Queen of My Heart","Your Own Kind of Magic","The Rarest Treasure","My Beautiful Constant","A Universe in You","The One and Only","A Love Without Measure","My Forever Favourite"]}
];
function fmt(n,len=2){return String(n).padStart(len,"0")}
function countdown(target, ids, daysLen=2){
 const t=Math.max(0,target-Date.now()),s=Math.floor(t/1000);
 $(ids[0]).textContent=fmt(Math.floor(s/86400),daysLen);
 $(ids[1]).textContent=fmt(Math.floor(s%86400/3600));
 $(ids[2]).textContent=fmt(Math.floor(s%3600/60));
 $(ids[3]).textContent=fmt(s%60);
}
function renderNav(){
 const nav=document.querySelector(".nav");
 if(nav) nav.innerHTML=`<a href="home.html">HOME</a>`+chapterData.map((c,i)=>`<a href="page${i+1}.html">${c.title}</a>`).join("")+`<a href="letter.html">SECRET LETTER</a>`;
 const toggle=document.querySelector(".nav-toggle");
 if(toggle&&nav)toggle.addEventListener("click",()=>nav.classList.toggle("open"));
}
function startEffects(){
 const cards=[...document.querySelectorAll(".memory-card")];
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});
 cards.forEach(c=>io.observe(c));
 document.querySelectorAll(".memory-card").forEach(c=>c.addEventListener("click",()=>c.classList.toggle("flipped")));
 const revealIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");revealIO.unobserve(e.target)}}),{threshold:.15});
 document.querySelectorAll(".reveal").forEach(el=>revealIO.observe(el));
}
function musicSetup(){
 const audio=document.getElementById("bgMusic"),btn=document.getElementById("musicButton");
 if(!audio||!btn)return;
 btn.addEventListener("click",async()=>{
  if(audio.paused){try{await audio.play();btn.innerHTML='<span class="dot"></span> MUSIC ON'}catch(e){btn.innerHTML='<span class="dot"></span> ADD YOUR MUSIC FILE'}}
  else{audio.pause();btn.innerHTML='<span class="dot"></span> PLAY MUSIC'}
 });
}
function sharedControls(){
 renderNav();startEffects();musicSetup();
 const surprise=document.getElementById("surpriseButton"),modal=document.getElementById("surpriseModal"),close=document.getElementById("modalClose");
 if(surprise&&modal)surprise.addEventListener("click",()=>modal.classList.remove("hidden"));
 if(close&&modal)close.addEventListener("click",()=>modal.classList.add("hidden"));
 if(modal)modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.add("hidden")});
 const petalRoot=document.querySelector(".petals");
 if(petalRoot && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  for(let i=0;i<17;i++){const p=document.createElement("i");p.className="petal";p.style.left=Math.random()*100+"%";p.style.animationDuration=(9+Math.random()*9)+"s";p.style.animationDelay=(Math.random()*-15)+"s";p.style.setProperty("--drift",(Math.random()*180-90)+"px");petalRoot.appendChild(p)}
 }
}
