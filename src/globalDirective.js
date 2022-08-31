
export function globalDirective (AppInstance) {
    AppInstance.directive('collapsibleSubsidebarItem', {   
        mounted: function (el) { 
            const ul = el.querySelector('ul')
            el.onclick = (event) => {
              event.stopPropagation();
              const isActive = ul.classList.contains('mm-show')
              if(isActive){
                ul.classList.remove("mm-show")
              } else {
                ul.classList.add("mm-show")
              }
            }
          }   
      })
      
      AppInstance.directive('responsiveMenu', {     
        mounted: function (el) { 
             
            const parentElement = el.closest('.wrapper'); 
            
            const sidebarWrapper = document.querySelector(".sidebar-wrapper");
      
            const toggleMenu = (event) => {
              event.stopPropagation();
              const isActive = parentElement.classList.contains('toggled')
              if(isActive){
                parentElement.classList.remove("toggled");
              } else {
                parentElement.classList.add("toggled");
              }
            }
      
            const toggleMenuHover = (event) =>{
              event.stopPropagation();
              const isActive = parentElement.classList.contains('sidebar-hovered')
              if(isActive){
                parentElement.classList.remove("sidebar-hovered");
              } else {
                parentElement.classList.add("sidebar-hovered");
              }
            }
            try {
              el.onclick = (event) => { 
                toggleMenu(event); 
              }
        
              sidebarWrapper.onmouseover = (event) => {
                toggleMenuHover(event);
              }
        
              sidebarWrapper.onmouseout = (event) => {
                toggleMenuHover(event);
              }
            } catch (error) {
              
            }
      
          
      
          }   
      })
      
      AppInstance.directive('userboxDropdown', {   
        mounted: function (el) { 
            const aTag = el.querySelector(".dropdown-toggle");
            const ulTag = el.querySelector(".dropdown-menu"); 
            el.onclick = () => {
              // const isATagActive = aTag.classList.contains('show')
              const isUlTagActive = ulTag.classList.contains('show')
              // if(isATagActive && isUlTagActive){
                if(isUlTagActive){
                // aTag.classList.remove("show")
                ulTag.classList.remove("show")
              } else {
                // aTag.classList.add("show")
                ulTag.classList.add("show")
              }
            }
          }   
      })

      AppInstance.directive('Dropdown', {   
        mounted: function (el) {   
            const aTag = el.querySelector(".dropdown-toggle-custom");
            const ulTag = el.querySelector(".dropdown-menu"); 

            ulTag.onclick = (event) => {
              event.stopPropagation();
            }
            
            el.onclick = () => {  
              const isATagActive = aTag.classList.contains('show')
              const isUlTagActive = ulTag.classList.contains('show')
              if(isATagActive && isUlTagActive){
                aTag.classList.remove("show") 
                ulTag.classList.remove("show")
              } else { 
                aTag.classList.add("show")
                ulTag.classList.add("show")
              }
            }

            document.addEventListener('click', function(event) {
              var isClickInside = el.contains(event.target);
              if (!isClickInside) {
                aTag.classList.remove("show") 
                ulTag.classList.remove("show")
              }
            });
          }   
      })
}