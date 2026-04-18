// chang navbar style on scroll
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('window-scroll', window.scrollY>0)
})
// chang btn
const faqs = document.querySelectorAll('.faq');
faqs.forEach(faq => {
    faq.addEventListener('click', () => { 
        faq.classList.toggle('open');
        // change icon
      const icon= faq.querySelector('.faq_icon i');
      if(icon.className==='uil uil-multiply') {
        icon.className ="uil uil-list-ul"

      }
      else{
        icon.className="uil uil-multiply"
      }
         
    }) 
}
)
// show hide nav
const menu=document.querySelector(".nav_menu");
const menubtn=querySelector("#open-menu-btn");
const closebtn=document.querySelector("#close-menu-btn");  

menubtn.addEventListener('click', () => {
  menu.style.display = "flex";
  closebtn.style.display = "inline-block";
  menubtn.style.display = "none";
})
// close nav menu
const closenav = () => {
  menu.style.display="none";
  closebtn.style.display="none";
  menubtn.style.display="inline- block";
}
closebtn.addEventListener('click', closenav)
 
