let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");

if(localStorage.getItem("isSidebarHidden") == "true"){
   sidebar.classList.add("active")
}

btn.onclick = function () {
  sidebar.classList.toggle("active");

  if (sidebar.classList[1] == "active") {
    localStorage.setItem("isSidebarHidden", "true");
  } else {
    localStorage.setItem("isSidebarHidden", "false");
  }
};
