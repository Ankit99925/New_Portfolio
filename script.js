function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function revealSpan(){
    let reveal=document.querySelectorAll('.reveal');
    reveal.forEach((e)=>{
        let spanParent=document.createElement('span');
        let spanChild=document.createElement('span');
        
        spanParent.classList.add('parent');
        spanChild.classList.add('child');
        
        spanChild.innerHTML=e.textContent;
        spanParent.appendChild(spanChild);
        
        e.innerHTML="";
        e.appendChild(spanParent);
    })
}


function valueSetter(){
    gsap.set("#nav",{y:"-100%", opacity: 0})
    gsap.set("#home span .child",{y:"100%"})
    gsap.set("#home .row2 #dev",{y:"100%", opacity:0})
    // gsap.set(".svg_web>path",{opacity:0})
    let webi=document.querySelectorAll(".svg_web>path");
    // for(let i=0; i<webi.length;i++){
    //     console.log(`letter ${i} is ${webi[i].getTotalLength()}`);
    // }
    webi.forEach((e)=>{
       e.style.strokeDasharray=e.getTotalLength()+"px";
        e.style.strokeDashoffset=e.getTotalLength()+"px";
    })
    // gsap.set(".featworksrow h1",{x:100, opacity:1})
    // gsap.set("#nav",{y:"-100%", opacity: 0})
}
function loaderAnimation(){
    let tl=gsap.timeline();
    
    tl.from('#loader .parent .child',{
        x:"100%",
        duration:1.5,
        delay:.5,
        ease:Circ.easeInOut
        
    })
    .to('#loader .reveal .parent .child',{
        y:"-100%",
        duration:2,
        delay:1,
        ease:Circ.easeInOut
        
    })
    .to('#loader',{
        ease: "Expo.easeInOut",
        height:0,
        duration:.5,
        delay:.5
        
    })
    .to('#green',{
        // y:100,
        ease: "Expo.easeInOut",
        height: "100%" ,
        duration:.5,
        delay:-1,
        top:0
        
    })
    .to('#green',{
        // y:100,
        ease: "Expo.easeInOut",
        height: "0" ,
        duration:.5,
        delay:-0.6,
        onComplete: function(){
            homePageAnimation();
        }
    })
    
}



function homePageAnimation(){
    let tl=gsap.timeline();
    
    tl.to("#nav",{
        y:0,
        opacity:1,
        duration:.5,
        ease: Expo.easeInOut
    })
    tl.to("#home span .child",{
        y:0,
        opacity:1,
        duration:.5,
        ease: Expo.easeInOut
    })
    tl.to("#home #dev",{
        y:0,
        opacity:1,
        delay:-.5,
        duration:.5,
        ease: Expo.easeInOut,
        onComplete: function(){
            webianimation();
        }
    })
}


function imagehovereffect(){
    let showingimage;
    document.querySelectorAll(".pro").forEach((e)=>{
      e.addEventListener("mousemove",(dets)=>{
          document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity= 1;
          showingimage=dets.target;
        document.querySelector("#cursor").children[dets.target.dataset.index].style.transform= `translate(${dets.clientX}px,${dets.clientY}px)`;
        showingimage.style.filter="grayscale(1)";
        document.querySelector(".work").style.backgroundColor = "#"+dets.target.dataset.color;
      }) 
      e.addEventListener("mouseleave",(dets)=>{
        document.querySelector("#cursor").children[showingimage.dataset.index].style.opacity= 0;
        showingimage.style.filter= "grayscale(0)";
        document.querySelector(".work").style.backgroundColor = "#dfdfdf";
      }) 
        
    })
}

function webianimation(){
   
    
    gsap.to(".svg_web>path",{
        strokeDashoffset:0,
        duration:2,
        ease:Expo.easeInOut
      
    })
    
}
function hamburger(){
    let hamburger = document.querySelector(".hamburger");
    let nav_links=document.querySelector(".nav_links")
    hamburger.addEventListener("click", ()=>{
        hamburger.classList.toggle("active");
        nav_links.classList.toggle("active");
    })
}
function textcolorchange(){
    let text=document.querySelectorAll(".textcard h1");
    text.forEach((e)=>{
        let clutter="";
       let h1text =e.textContent; 
       let splittext= h1text.split("");
       
    splittext.forEach((f)=>{
        clutter+=`<span>${f}</span>`
    })
    e.innerHTML=clutter;
    })
    gsap.to(".textcard h1 span",{
        color:"#111",
        stagger:0.1,
        scrollTrigger:{
            trigger:".textcard h1",
            scroller:"#main",
            start:"top 60%",
            end:"top 10%",
            scrub:2
        }
    })

}
function textcolorchange2(){
    let text=document.querySelectorAll(".texthelp h2");
    text.forEach((e)=>{
        let clutter="";
       let h2text =e.textContent; 
       let splittext= h2text.split("");
       
    splittext.forEach((f)=>{
        clutter+=`<span>${f}</span>`
    })
    e.innerHTML=clutter;
 
    })
    gsap.to(".texthelp h2 span",{
        color:"#111",
        opacity:1,
        stagger:0.1,
        scrollTrigger:{
            trigger:".texthelp h2",
            scroller:"#main",
            start:"top 60%",
            end:"top 20%",
            scrub:2
        }
    })

}
function projectin(){
    gsap.from(".featworksrow h1",{
        scale:0,
        duration:1,
        scrollTrigger:{
            trigger:".featworksrow h1",
            scroller:"#main",
            start:"top 80%",
            
        }
    })
}
locoScroll();
revealSpan();
valueSetter();
loaderAnimation();
imagehovereffect();
hamburger();
textcolorchange();
textcolorchange2();
projectin();


// const now = new Date();
//     const currentDateTime = now.toLocaleString();
//     document.querySelector("#time").textContent=currentDateTime;