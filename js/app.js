/**************************************
 * Import Statements
 *************************************/

import toggleHamburgerAnimation from "./hamburger.js";
import createElement from "./createElement.js";

/**************************************
 * Initialize variables
 *************************************/

let navToggle = false;

const sectionList = [
  { id: "section1", content: "Section 1" },
  { id: "section2", content: "Section 2" },
  { id: "section3", content: "Section 3" },
];

let activeSection = "section1";

const colors = ["#DEBDA6", "#D0DEA6", "#DFCCBE", "#A6D9DE", "#D0B1DE"];
const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

/**************************************
 * Initialize styles
 *************************************/

const sectionStyle = [
  { width: "100%" },
  { minHeight: "100vh" },
  { display: "flex" },
  { justifyContent: "center" },
  { alignItems: "center" },
  { maxWidth: "100%" },
];

const liStyle = [
  { width: "100%" },
  { textAlign: "center" },
  { display: "flex" },
  { padding: "10px 0" },
];

const aStyle = [{ width: "100vw" }, { padding: "10px 0px" }, { flex: 1 }];

const buttonStyle = [
  { margin: "auto" },
  { border: "none" },
  { backgroundColor: "#54aaf0" },
  { color: "white" },
  { boxShadow: "0 0 4px rgba(0,0,0, .5)" },
  { padding: "10px" },
  { display: "block" },
];

const navStyle = [
  { backgroundColor: "#fbfbfb" },
  { width: "100vw" },
  { alignSelf: "flex-end" },
  { marginTop: "auto" },
  { padding: "10px 0" },
  { display: "none" },
];

const ulStyle = [
  { display: "flex" },
  { flexDirection: "column" },
  { width: "100%" },
  { justifyContent: "space-around" },
];

/**************************************
 * Toggle Navbar Visibility
 *************************************/

const toggleNav = () => {
  const navbar = document.getElementById("navbar");
  navToggle = !navToggle;
  navToggle ? (navbar.style.display = "flex") : (navbar.style.display = "none");
  toggleHamburgerAnimation(navToggle);
};

/**************************************
 * Show / Hide Header and Footer
 *************************************/
let timer;
const hideTimer = () =>
  (timer = setTimeout(() => {
    document.getElementsByTagName("header")[0].style.opacity = "0";
    document.getElementsByTagName("footer")[0].style.opacity = "0";
  }, 6000));

const showElements = (timeout) => {
  clearTimeout(timer);
  document.getElementsByTagName("header")[0].style.opacity = "1";
  document.getElementsByTagName("footer")[0].style.opacity = "1";
  hideTimer(timeout);
};

/**************************************
 * Wait for DOM to be loaded
 *************************************/

document.addEventListener("DOMContentLoaded", () => {
  /**************************************
   * Start scroll listeners
   *************************************/

  function updateSection(e) {
    startShowTimer();
    const sections = document.getElementsByTagName("section");
    const currentY = e.target && e.target.scrollingElement ? e.target.scrollingElement.scrollTop : 0;
    for (let i = 0; i < sections.length; ++i) {
      const start =
        (sections[i].scrollHeight * (i + 1) - sections[i].scrollHeight) * 0.825;
      const end = sections[i].scrollHeight * (i + 1) * 0.825;
      if (currentY > start && currentY < end) {
        document.getElementById("section-display").innerHTML =
          sectionList[i].content;
        setSectionActive(document.getElementById(`li-${sectionList[i].id}`).childNodes[0]);
      }
    }
  }
  function startShowTimer() {
    showElements(6000);
  }

  function startHideTimer() {
    hideTimer();
  }
  document.addEventListener("scroll", updateSection);
  document.addEventListener("scrollEnd", startHideTimer);
  document.addEventListener("click", startShowTimer);
  document.addEventListener("mousemove", (event) =>
    event.clientY < 200 ? startShowTimer() : null
  );

  /**************************************
   * Set active section
   *************************************/

  const setSectionActive = (element) => {
    const elements = document.getElementsByTagName("li");
    for (let li of elements) {
      li.childNodes[0].classList.remove("active");
    }
    element.classList.add("active");
  };

  const aTagClickHandler = (event) => {
    toggleNav();
    console.log(event);
    setSectionActive(event.target);
    document.getElementById("section-display").innerHTML = sectionList.find(
      (x) => `li-${x.id}` == event.target.parentNode.id
    ).content;
  };

  /**************************************
   * Hamburger for nav visibility toggle
   *************************************/

  document
    .getElementById("hamburger")
    .addEventListener("click", toggleHamburgerAnimation);

  /**************************************
   * Add Section helper class Nav list
   * item and create section in main
   * content
   *************************************/
  const addSection = () => {
    /**************************************
     * Get nav list item count
     *************************************/

    const sectionCount = document.getElementsByTagName("li").length;
    sectionStyle.push({
      backgroundColor:
        colors[sectionCount > 4 ? sectionCount - 4 : sectionCount],
    });

    sectionList.push({
      id: `section${sectionCount}`,
      content: `Section ${sectionCount}`,
    });

    /**************************************
     * Create DOM elements on initial load
     * using the createElement module
     *************************************/

    createElement(document, "ul", {
      tag: "li",
      id: `li-section${sectionCount}`,
      style: liStyle,
    });
    createElement(document, `#li-section${sectionCount}`, {
      tag: "a",
      content: `Section ${sectionCount}`,
      href: `#section${sectionCount}`,
      click: aTagClickHandler,
      style: aStyle,
    });
    createElement(document, "main", {
      tag: "section",
      id: `section${sectionCount}`,
      click: updateSection,
      style: sectionStyle,
    });

    createElement(document, `#section${sectionCount}`, {
      tag: "p",
      content: defaultContent,
    });
    toggleNav();
  };

  /**************************************
   * Create DOM elements on initial load
   * using the createElement module
   *************************************/

  createElement(document, "header", {
    tag: "nav",
    id: "navbar",
    style: navStyle,
  });

  createElement(document, "nav", {
    tag: "ul",
    style: ulStyle,
  });

  createElement(document, "ul", {
    tag: "li",
    id: "add-section",
    style: liStyle,
  });

  createElement(document, `#add-section`, {
    tag: "button",
    content: "Add Section",
    click: addSection,
    style: buttonStyle,
  });

  for (let index of sectionList) {
    const sectionCount = sectionList.indexOf(index);
    sectionStyle.push({ backgroundColor: colors[sectionCount] });

    createElement(document, "ul", {
      tag: "li",
      id: `li-${index.id}`,
      style: liStyle,
    });

    createElement(document, `#li-${index.id}`, {
      tag: "a",
      content: index.content,
      href: `#${index.id}`,
      click: aTagClickHandler,
      style: aStyle,
    });

    createElement(document, "main", {
      tag: "section",
      id: index.id,
      style: sectionStyle,
    });

    createElement(document, `#${index.id}`, {
      tag: "p",
      content: defaultContent,
    });
  }
  document.getElementById("hamburger").addEventListener("click", toggleNav);
});
