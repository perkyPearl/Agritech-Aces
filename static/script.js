document.addEventListener('DOMContentLoaded', () => {
   let sideBar = document.querySelector('.side-bar');
   let body = document.body;
   let profile = document.querySelector('.profile'); // Assuming profile is defined elsewhere
   let search = document.querySelector('.search'); // Assuming search is defined elsewhere

   // Check if a flag is set in local storage to hide the sidebar
   let isSidebarHidden = localStorage.getItem('isSidebarHidden');
   if (isSidebarHidden === 'true') {
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }

   document.querySelector('#menu-btn').onclick = () => {
      sideBar.classList.toggle('active');
      body.classList.toggle('active');

      // Update local storage flag based on the current state
      localStorage.setItem('isSidebarHidden', sideBar.classList.contains('active') ? 'true' : '');
   }

   document.querySelector('#close-btn').onclick = () => {
      sideBar.classList.remove('active');
      body.classList.remove('active');

      // Update local storage flag when closing the sidebar
      localStorage.setItem('isSidebarHidden', 'true');
   }

   window.onscroll = () => {
      // Assuming profile and search are defined elsewhere in your code
      profile.classList.remove('active');
      search.classList.remove('active');

      if (window.innerWidth < 1200 && sideBar.classList.contains('active')) {
         sideBar.classList.remove('active');
         body.classList.remove('active');

         // Update local storage flag when closing the sidebar due to window resize
         localStorage.setItem('isSidebarHidden', 'true');
      }
   }
});
