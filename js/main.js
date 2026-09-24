// ของ template เดิมใช้ jquery กับ library หลายตัว เอาออกหมดแล้ว เขียนเองแบบง่ายๆ แทน

// แบนเนอร์หน้าแรก สลับรูปเองทุก 5 วิ
var slideNow = 0;
function nextSlide() {
    var slides = document.getElementsByClassName("header-carousel-item");
    slides[slideNow].style.display = "none";
    slideNow = slideNow + 1;
    if (slideNow >= slides.length) {
        slideNow = 0;   // ครบแล้ววนกลับไปรูปแรก
    }
    slides[slideNow].style.display = "block";
}
setInterval(nextSlide, 5000);


// เลื่อนลงมาแล้วให้เมนูติดข้างบน + โชว์ปุ่มกลับขึ้นบน
window.onscroll = function () {
  var nav = document.getElementsByClassName("nav-bar")[0];
  if (window.scrollY > 45) {
    nav.classList.add("sticky-top");
    nav.classList.add("shadow-sm");
  } else {
    nav.classList.remove("sticky-top");
    nav.classList.remove("shadow-sm");
  }

  if (window.scrollY > 300) {
      document.getElementById("backToTop").style.display = "flex";   // ปุ่มนี้ใช้ flex ไอคอนถึงจะอยู่ตรงกลาง
  }
  else {
      document.getElementById("backToTop").style.display = "none";
  }
}



// สลับหน้า + กรองงาน + เช็คฟอร์ม ย้ายมาจากท้าย index.html รวมไว้ไฟล์เดียว

// สลับหน้า ซ่อนหมดก่อนแล้วค่อยโชว์หน้าที่กด
function showPage(pageName) {
  var allPages = document.getElementsByClassName("page-section");
  for (var i = 0; i < allPages.length; i++) {
    allPages[i].style.display = "none";
  }
  var targetPage = document.getElementById("page-" + pageName);
  if (targetPage != null) {
    targetPage.style.display = "block";
  }

    // เปลี่ยนเมนูที่ active
    var navLinks = document.getElementsByClassName("nav-link");
    for (var j = 0; j < navLinks.length; j++) {
        navLinks[j].classList.remove("active");
    }
    var clickedLink = document.getElementById("navlink-" + pageName);
    if (clickedLink != null) {
        clickedLink.classList.add("active");
    }

    // ถ้าเปิดเมนูในมือถือค้างไว้ ให้ปิดด้วย ไม่งั้นมันบังหน้า
    var mobileMenu = document.getElementById("navbarCollapse");
    if (mobileMenu != null) {
        mobileMenu.classList.remove("show");   // เมนูมือถือจะเปิดอยู่ถ้ามี class show เอาออกก็ปิดละ
    }

    if (pageName == "home") {
        document.title = "JobCert - สมัครงาน AI ดิจิทัล อบรม และสอบ Certify";
    } else if (pageName == "job") {
        document.title = "JobCert - สมัครงาน AI/ดิจิทัล";
    } else if (pageName == "training") {
        document.title = "JobCert - อบรม/สัมมนา";
    }
    else if (pageName == "certify") {
        document.title = "JobCert - สอบ Certify";
    } else if (pageName == "about") {
        document.title = "JobCert - เกี่ยวกับเรา";
    }

    window.location.hash = pageName;
    window.scrollTo(0, 0);
}

// เปิดเว็บมาแล้วมี # ติดมา (เช่น index.html#job) ให้ไปหน้านั้นเลย
// ไม่ใช้ onload แล้ว เพราะมันรอไอคอนจากเน็ตโหลดเสร็จก่อน เน็ตช้าจะค้างหน้าแรก (script อยู่ท้าย body อยู่แล้ว เรียกได้เลย)
var startPage = "home";
var hashNow = window.location.hash.replace("#", "");
var pageList = ["home", "job", "training", "certify", "about"];
if (pageList.indexOf(hashNow) != -1) {
    startPage = hashNow;
}
showPage(startPage);


// ค้นหา/กรองงาน (ยังไม่มีฐานข้อมูล กรองจาก data- ในการ์ดเอา)
function filterJobs() {
  var jobs = document.getElementsByClassName("job-list-item");
  var keyword = document.getElementById("jobSearchInput").value.toLowerCase();
  var location = document.getElementById("jobLocationInput").value.toLowerCase();
  var minSalary = Number(document.getElementById("salaryRange").value);

  var typeList = [];
  if(document.getElementById("type_fulltime").checked){ typeList.push("เต็มเวลา"); }
  if(document.getElementById("type_parttime").checked){ typeList.push("พาร์ทไทม์"); }
  if(document.getElementById("type_internship").checked){ typeList.push("ฝึกงาน"); }

  var levelList = [];
  if (document.getElementById("level_entry").checked) { levelList.push("เริ่มต้น"); }
  if (document.getElementById("level_mid").checked) { levelList.push("ปานกลาง"); }
  if (document.getElementById("level_expert").checked) { levelList.push("เชี่ยวชาญ"); }
  var count = 0;
  for (var i = 0; i < jobs.length; i++) {
    var job = jobs[i];
    var title = job.getAttribute("data-title").toLowerCase();
    var company = job.getAttribute("data-company").toLowerCase();
    var place = job.getAttribute("data-location").toLowerCase();
    var type = job.getAttribute("data-type");
    var level = job.getAttribute("data-level");
    var salary = Number(job.getAttribute("data-salary"));

    // ไม่ได้กรอก = ผ่านไปเลย
    var ok1 = true;
    if (keyword != "") {
      ok1 = (title.indexOf(keyword) != -1) || (company.indexOf(keyword) != -1);
    }
    var ok2 = true;
    if (location != "") {
      ok2 = place.indexOf(location) != -1;
    }
    var ok3 = true;
    if (typeList.length > 0) {
        ok3 = typeList.indexOf(type) != -1;
    }
    var ok4 = true;
    if (levelList.length > 0) {
        ok4 = levelList.indexOf(level) != -1;
    }
    var ok5 = salary >= minSalary;

    if (ok1 && ok2 && ok3 && ok4 && ok5) {
      job.style.display = "block";
      count = count + 1;
    } else {
      job.style.display = "none";
    }
  }

  // ไม่เจอสักงาน โชว์ข้อความบอก
  if (count == 0) {
    document.getElementById("noJobFound").style.display = "block";
  } else {
    document.getElementById("noJobFound").style.display = "none";
  }
}

function clearFilters() {
    document.getElementById("jobSearchInput").value = "";
    document.getElementById("jobLocationInput").value = "";
    document.getElementById("type_fulltime").checked = false;
    document.getElementById("type_parttime").checked = false;
    document.getElementById("type_internship").checked = false;
    document.getElementById("level_entry").checked = false;
    document.getElementById("level_mid").checked = false;
    document.getElementById("level_expert").checked = false;
    document.getElementById("salaryRange").value = 0;
    showSalary();
    filterJobs();
}
function showSalary() {
    var x = document.getElementById("salaryRange").value;
    document.getElementById("salaryRangeText").innerHTML = "ตั้งแต่ ฿" + x + " ขึ้นไป";
}


function likeJob(btn) {
    // กดหัวใจ แค่เปลี่ยนบนจอ รีเฟรชแล้วหาย
    if (btn.classList.contains("liked")) {
        btn.classList.remove("liked");
        btn.innerHTML = "&#9825;";
    }
    else {
        btn.classList.add("liked");
        btn.innerHTML = "&#9829;";
    }
}

function sortJobs() {
// ก๊อปการ์ดงานใส่ array ก่อน แล้วเรียงแบบ bubble sort ที่เรียนมา
var sortBy = document.getElementById("jobSort").value;
var box = document.getElementById("jobListArea");
var data = box.getElementsByClassName("job-list-item");

    var arr = [];
    for (var k = 0; k < data.length; k++) {
        arr.push(data[k]);
    }

    var n = arr.length;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            var swap = false;
            if (sortBy == "salary") {
                if (Number(arr[j].getAttribute("data-salary")) < Number(arr[j+1].getAttribute("data-salary"))) {
                    swap = true;
                }
            } else if (sortBy == "name") {
                if (arr[j].getAttribute("data-title") > arr[j+1].getAttribute("data-title")) {
                    swap = true;
                }
            }
            else {
                // ล่าสุดขึ้นก่อน
                if (arr[j].getAttribute("data-posted") < arr[j+1].getAttribute("data-posted")) {
                    swap = true;
                }
            }

            if (swap) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    // appendChild ตัวเดิมซ้ำ มันจะย้ายไปต่อท้าย เลยได้ลำดับใหม่
    for (var m = 0; m < arr.length; m++) {
        box.appendChild(arr[m]);
    }
}


// ---------- ฟอร์มสมัครงาน ----------
function showJobForm(formId) {
    // ซ่อนฟอร์มอื่นก่อน จะได้ไม่งงว่ากำลังสมัครตำแหน่งไหน
    var allForms = document.getElementsByClassName("jobform");
    for (var i = 0; i < allForms.length; i++) {
        allForms[i].style.display = "none";
    }
    document.getElementById(formId).style.display = "block";
    document.getElementById(formId).scrollIntoView();
}

function hideJobForms() {
    var allForms = document.getElementsByClassName("jobform");
    for (var i = 0; i < allForms.length; i++) {
        allForms[i].style.display = "none";
    }
    document.getElementById("jobListArea").scrollIntoView();
}

// ---------- ฟอร์มอบรม ----------
function showCourseForm(formId) {
    var allForms = document.getElementsByClassName("courseform");
    for (var i = 0; i < allForms.length; i++) {
        allForms[i].style.display = "none";
    }
    document.getElementById(formId).style.display = "block";
    document.getElementById(formId).scrollIntoView();
}

function hideCourseForms() {
    var allForms = document.getElementsByClassName("courseform");
    for (var i = 0; i < allForms.length; i++) {
        allForms[i].style.display = "none";
    }
    document.getElementById("courseAccordion").scrollIntoView();
}


// ---------- ฟอร์มสอบ certify (มีวันสอบเพิ่มมาอีกช่อง) ----------
function showExamForm(formId) {
    var allForms = document.getElementsByClassName("examform");
    for (var i = 0; i < allForms.length; i++) {
        allForms[i].style.display = "none";
    }
    document.getElementById(formId).style.display = "block";
    document.getElementById(formId).scrollIntoView();
}

function hideExamForms() {
    var allForms = document.getElementsByClassName("examform");
    for (var i = 0; i < allForms.length; i++) {
        allForms[i].style.display = "none";
    }
    document.getElementById("certify-list").scrollIntoView();
}
