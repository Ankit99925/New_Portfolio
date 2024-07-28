
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
    gsap.set("#home .row2 .web",{y:"100%", opacity:0})
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
        stagger:.5,
        duration:.5,
        ease: Expo.easeInOut
    })
    tl.to("#home span .child",{
        y:0,
        opacity:1,
        stagger:.5,
        duration:.5,
        ease: Expo.easeInOut
    })
    tl.to("#home .web",{
        y:"100%",
        opacity:1,
        // stagger:.5,
        duration:1,
        ease: Expo.easeInOut
    })
    tl.to("#home #dev",{
        y:"100%",
        opacity:1,
        stagger:.5,
        duration:.5,
        delay:-1.5,
        ease: Expo.easeInOut
    })
}

function locomotiveint(){
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
}
revealSpan();
valueSetter();
loaderAnimation();
locomotiveint();



// const now = new Date();
//     const currentDateTime = now.toLocaleString();
//     document.querySelector("#time").textContent=currentDateTime;