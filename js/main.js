(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top shadow-sm').css('top', '0px');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow-sm').css('top', '-100px');
        }
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 500,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });



    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-arrow-right"></i>',
            '<i class="fa fa-arrow-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);



// ====================================================================
// routing สลับหน้าแบบ SPA + เช็คฟอร์มต่างๆ เดิมฝังเป็น <script> ท้าย index.html
// ย้ายมารวมไว้ที่เดียวทั้งหมด จะได้มี js ไฟล์เดียว
// ====================================================================

// สคริปต์สลับหน้าแบบ SPA
function แสดงหน้า(ชื่อหน้า) {
  // ซ่อนทุกหน้าก่อน แล้วค่อยโชว์หน้าที่กด จะได้ไม่งงว่ากำลังอยู่หน้าไหน
  var หน้าทั้งหมด = document.getElementsByClassName("page-section");
  for (var i = 0; i < หน้าทั้งหมด.length; i++) {
    หน้าทั้งหมด[i].style.display = "none";
  }
  var หน้าที่จะโชว์ = document.getElementById("page-" + ชื่อหน้า);
  if (หน้าที่จะโชว์ != null) {
    หน้าที่จะโชว์.style.display = "block";
  }

    // สลับ active ของเมนู
    var ลิงก์nav = document.getElementsByClassName("nav-link");
    for (var j = 0; j < ลิงก์nav.length; j++) {
        ลิงก์nav[j].classList.remove("active");
    }
    var ลิงก์ที่กด = document.getElementById("navlink-" + ชื่อหน้า);
    if (ลิงก์ที่กด != null) {
        ลิงก์ที่กด.classList.add("active");
    }

    // ปิดเมนูมือถือถ้าเปิดค้างอยู่
    var เมนูมือถือ = document.getElementById("navbarCollapse");
    if (เมนูมือถือ != null && เมนูมือถือ.classList.contains("show")) {
        var ตัวจัดการcollapse = bootstrap.Collapse.getInstance(เมนูมือถือ);
        if (ตัวจัดการcollapse != null) {
            ตัวจัดการcollapse.hide();
        }
    }

    if (ชื่อหน้า == "home") {
        document.title = "JobCert - สมัครงาน AI ดิจิทัล อบรม และสอบ Certify";
    } else if (ชื่อหน้า == "job") {
        document.title = "JobCert - สมัครงาน AI/ดิจิทัล";
    } else if (ชื่อหน้า == "training") {
        document.title = "JobCert - อบรม/สัมมนา";
    } else if (ชื่อหน้า == "certify") {
        document.title = "JobCert - สอบ Certify";
    } else if (ชื่อหน้า == "about") {
        document.title = "JobCert - เกี่ยวกับเรา";
    } else if (ชื่อหน้า == "contact") {
        document.title = "JobCert - ติดต่อเรา";
    }

    window.location.hash = ชื่อหน้า;
    window.scrollTo(0, 0);
}

// พอเปิดเว็บมา เช็คว่ามี hash ติดมาไหม (เช่น เปิดลิงก์ index.html#job มาตรงๆ)
window.addEventListener("load", function () {
    var หน้าเริ่มต้น = "home";
    var hashตอนนี้ = window.location.hash.replace("#", "");
    var หน้าที่รู้จัก = ["home", "job", "training", "certify", "about", "contact"];
    if (หน้าที่รู้จัก.indexOf(hashตอนนี้) != -1) {
        หน้าเริ่มต้น = hashตอนนี้;
    }
    แสดงหน้า(หน้าเริ่มต้น);
});

// สคริปต์ค้นหา/กรอง/เรียง/สมัครงาน ยังไม่ได้เชื่อมกับฐานข้อมูลจริง
function กรองงาน() {
  // เอาค่าจากช่องค้นหาและตัวกรองทั้งหมดมาเช็คทีละงาน
  var งานทั้งหมด = document.getElementsByClassName("job-list-item");
  var คำค้น = document.getElementById("jobSearchInput").value.toLowerCase();
  var สถานที่ = document.getElementById("jobLocationInput").value.toLowerCase();
  var เงินเดือนขั้นต่ำ = Number(document.getElementById("salaryRange").value);

  var ประเภทที่เลือก = [];
  if(document.getElementById("type_fulltime").checked){ ประเภทที่เลือก.push("เต็มเวลา"); }
  if(document.getElementById("type_parttime").checked){ ประเภทที่เลือก.push("พาร์ทไทม์"); }
  if(document.getElementById("type_internship").checked){ ประเภทที่เลือก.push("ฝึกงาน"); }

  var ระดับที่เลือก = [];
  if (document.getElementById("level_entry").checked) { ระดับที่เลือก.push("เริ่มต้น"); }
  if (document.getElementById("level_mid").checked) { ระดับที่เลือก.push("ปานกลาง"); }
  if (document.getElementById("level_expert").checked) { ระดับที่เลือก.push("เชี่ยวชาญ"); }
  var เจองานกี่อัน = 0;
  for (var i = 0; i < งานทั้งหมด.length; i++) {
    var งาน = งานทั้งหมด[i];
    var ชื่องาน = งาน.getAttribute("data-title").toLowerCase();
    var บริษัท = งาน.getAttribute("data-company").toLowerCase();
    var ที่ตั้ง = งาน.getAttribute("data-location").toLowerCase();
    var ประเภท = งาน.getAttribute("data-type");
    var ระดับ = งาน.getAttribute("data-level");
    var เงินเดือน = Number(งาน.getAttribute("data-salary"));

    var ผ่านคำค้น = true;
    if (คำค้น != "") {
      ผ่านคำค้น = (ชื่องาน.indexOf(คำค้น) != -1) || (บริษัท.indexOf(คำค้น) != -1);
    }
    var ผ่านสถานที่ = true;
    if (สถานที่ != "") {
      ผ่านสถานที่ = ที่ตั้ง.indexOf(สถานที่) != -1;
    }
    var ผ่านประเภท = true;
    if (ประเภทที่เลือก.length > 0) {
        ผ่านประเภท = ประเภทที่เลือก.indexOf(ประเภท) != -1;
    }
    var ผ่านระดับ = true;
    if (ระดับที่เลือก.length > 0) {
        ผ่านระดับ = ระดับที่เลือก.indexOf(ระดับ) != -1;
    }
    var ผ่านเงินเดือน = เงินเดือน >= เงินเดือนขั้นต่ำ;

    if (ผ่านคำค้น && ผ่านสถานที่ && ผ่านประเภท && ผ่านระดับ && ผ่านเงินเดือน) {
      งาน.style.display = "block";
      เจองานกี่อัน = เจองานกี่อัน + 1;
    } else {
      งาน.style.display = "none";
    }
  }

  if (เจองานกี่อัน == 0) {
    document.getElementById("noJobFound").style.display = "block";
  } else {
    document.getElementById("noJobFound").style.display = "none";
  }
}

function ล้างตัวกรอง() {
    document.getElementById("jobSearchInput").value = "";
    document.getElementById("jobLocationInput").value = "";
    document.getElementById("type_fulltime").checked = false;
    document.getElementById("type_parttime").checked = false;
    document.getElementById("type_internship").checked = false;
    document.getElementById("level_entry").checked = false;
    document.getElementById("level_mid").checked = false;
    document.getElementById("level_expert").checked = false;
    document.getElementById("salaryRange").value = 0;
    แสดงค่าเงินเดือน();
    กรองงาน();
}
function แสดงค่าเงินเดือน() {
    var ค่า = document.getElementById("salaryRange").value;
    document.getElementById("salaryRangeText").innerHTML = "ตั้งแต่ ฿" + ค่า + " ขึ้นไป";
}


function กดหัวใจ(ปุ่ม) {
    // สลับสถานะถูกใจ เก็บไว้แค่บนหน้าจอ
    if (ปุ่ม.classList.contains("liked")) {
        ปุ่ม.classList.remove("liked");
        ปุ่ม.innerHTML = "&#9825;";
    }
    else {
        ปุ่ม.classList.add("liked");
        ปุ่ม.innerHTML = "&#9829;";
    }
}

function เรียงงาน() {
// ก๊อปรายการงานมาใส่ array ก่อน แล้วเรียงแบบ bubble sort 
var วิธีเรียง = document.getElementById("jobSort").value;
var กล่อง = document.getElementById("jobListArea");
var รายการสด = กล่อง.getElementsByClassName("job-list-item");

    var งาน = [];
    for (var k = 0; k < รายการสด.length; k++) {
        งาน.push(รายการสด[k]);
    }

    var n = งาน.length;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            var ต้องสลับ = false;
            if (วิธีเรียง == "salary") {
                if (Number(งาน[j].getAttribute("data-salary")) < Number(งาน[j+1].getAttribute("data-salary"))) {
                    ต้องสลับ = true;
                }
            } else if (วิธีเรียง == "name") {
                if (งาน[j].getAttribute("data-title") > งาน[j+1].getAttribute("data-title")) {
                    ต้องสลับ = true;
                }
            }
            else {
                if (งาน[j].getAttribute("data-posted") < งาน[j+1].getAttribute("data-posted")) {
                    ต้องสลับ = true;
                }
            }

            if (ต้องสลับ) {
                var ตัวเก็บ = งาน[j];
                งาน[j] = งาน[j + 1];
                งาน[j + 1] = ตัวเก็บ;
            }
        }
    }

    for (var m = 0; m < งาน.length; m++) {
        กล่อง.appendChild(งาน[m]);
    }
}

function แสดงฟอร์ม(idที่จะโชว์) {
    // ซ่อนฟอร์มทุกอันก่อน แล้วค่อยโชว์อันที่กด จะได้ไม่งงว่ากำลังสมัครตำแหน่งไหนอยู่
    var ฟอร์มทั้งหมด = document.getElementsByClassName("jobform");
    for (var i = 0; i < ฟอร์มทั้งหมด.length; i++) {
        ฟอร์มทั้งหมด[i].style.display = "none";
    }
    document.getElementById(idที่จะโชว์).style.display = "block";
    document.getElementById(idที่จะโชว์).scrollIntoView({behavior: "smooth"});
}

function ซ่อนฟอร์มงานทั้งหมด() {
    var ฟอร์มทั้งหมด = document.getElementsByClassName("jobform");
    for (var i = 0; i < ฟอร์มทั้งหมด.length; i++) {
        ฟอร์มทั้งหมด[i].style.display = "none";
    }
    document.getElementById("jobListArea").scrollIntoView({behavior: "smooth"});
}

function เช็คฟอร์ม_AIWebDev() {
    var ชื่อ = document.getElementById("AIWebDev_name").value;
    var อีเมล = document.getElementById("AIWebDev_email").value;
    var เบอร์ = document.getElementById("AIWebDev_phone").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }

    alert("ส่งใบสมัครตำแหน่ง AI-Assisted Web Developer เรียบร้อย ทีมงานจะติดต่อกลับทางอีเมลหรือเบอร์โทรที่กรอกไว้");
    return false; // กันไว้ก่อน เพราะยังไม่มี backend รับข้อมูลจริง
}

function เช็คฟอร์ม_DigitalTransform() {
    var ชื่อ = document.getElementById("DigitalTransform_name").value;
    var อีเมล = document.getElementById("DigitalTransform_email").value;
    var เบอร์ = document.getElementById("DigitalTransform_phone").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }

    alert("ส่งใบสมัครตำแหน่ง Digital & AI Transformation Associate เรียบร้อย ทีมงานจะติดต่อกลับทางอีเมลหรือเบอร์โทรที่กรอกไว้");
    return false; 
}

function เช็คฟอร์ม_AIDataAnalyst() {
    var ชื่อ = document.getElementById("AIDataAnalyst_name").value;
    var อีเมล = document.getElementById("AIDataAnalyst_email").value;
    var เบอร์ = document.getElementById("AIDataAnalyst_phone").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }

    alert("ส่งใบสมัครตำแหน่ง AI Data Analyst (Entry Level) เรียบร้อย ทีมงานจะติดต่อกลับทางอีเมลหรือเบอร์โทรที่กรอกไว้");
    return false;
}

// สคริปต์เช็คฟอร์มอบรม
function แสดงคอร์ส(idที่จะโชว์) {
    var ฟอร์มทั้งหมด = document.getElementsByClassName("courseform");
    for (var i = 0; i < ฟอร์มทั้งหมด.length; i++) {
        ฟอร์มทั้งหมด[i].style.display = "none";
    }
    document.getElementById(idที่จะโชว์).style.display = "block";
    document.getElementById(idที่จะโชว์).scrollIntoView({behavior: "smooth"});
}

function ซ่อนคอร์สทั้งหมด() {
    var ฟอร์มทั้งหมด = document.getElementsByClassName("courseform");
    for (var i = 0; i < ฟอร์มทั้งหมด.length; i++) {
        ฟอร์มทั้งหมด[i].style.display = "none";
    }
    document.getElementById("courseAccordion").scrollIntoView({behavior: "smooth"});
}

function เช็คคอร์ส_GenAIFoundations() {
  var ชื่อ = document.getElementById("GenAIFoundations_name").value;
  var อีเมล = document.getElementById("GenAIFoundations_email").value;
  var เบอร์ = document.getElementById("GenAIFoundations_phone").value;
  if (ชื่อ == "") {
    alert("กรอกชื่อ-นามสกุลก่อนนะ");
    return false;
  }
  if (อีเมล == "") {
    alert("กรอกอีเมลก่อนนะ");
    return false;
  }
  if (เบอร์ == "") {
    alert("กรอกเบอร์โทรก่อนนะ");
    return false;
  }
  alert("ลงทะเบียนคอร์ส Generative AI Foundations & Prompt Engineering Masterclass เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
  return false; 
}
function เช็คคอร์ส_MultimodalGenAI() {
  var ชื่อ = document.getElementById("MultimodalGenAI_name").value;
  var อีเมล = document.getElementById("MultimodalGenAI_email").value;
  var เบอร์ = document.getElementById("MultimodalGenAI_phone").value;
  if (ชื่อ == "") {
    alert("กรอกชื่อ-นามสกุลก่อนนะ");
    return false;
  }
  if (อีเมล == "") {
    alert("กรอกอีเมลก่อนนะ");
    return false;
  }
  if (เบอร์ == "") {
    alert("กรอกเบอร์โทรก่อนนะ");
    return false;
  }
  alert("ลงทะเบียนคอร์ส Multimodal Generative AI for Business & Creative Content เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
  return false; 
}

function เช็คคอร์ส_DataAnalysisBasic() {
    var ชื่อ = document.getElementById("DataAnalysisBasic_name").value;
    var อีเมล = document.getElementById("DataAnalysisBasic_email").value;
    var เบอร์ = document.getElementById("DataAnalysisBasic_phone").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }

    alert("ลงทะเบียนคอร์ส Data Analysis เบื้องต้น เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
    return false; 
}

function เช็คคอร์ส_CybersecurityBasic() {
    var ชื่อ = document.getElementById("CybersecurityBasic_name").value;
    var อีเมล = document.getElementById("CybersecurityBasic_email").value;
    var เบอร์ = document.getElementById("CybersecurityBasic_phone").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }

    alert("ลงทะเบียนคอร์ส Cybersecurity พื้นฐาน เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
    return false; 
}

function เช็คคอร์ส_UXUIWorkshop() {
    var ชื่อ = document.getElementById("UXUIWorkshop_name").value;
    var อีเมล = document.getElementById("UXUIWorkshop_email").value;
    var เบอร์ = document.getElementById("UXUIWorkshop_phone").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }

    alert("ลงทะเบียนคอร์ส UX/UI Design Workshop เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
    return false; 
}

function เช็คคอร์ส_PythonBasic() {
    var ชื่อ = document.getElementById("PythonBasic_name").value;
    var อีเมล = document.getElementById("PythonBasic_email").value;
    var เบอร์ = document.getElementById("PythonBasic_phone").value;
    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }

    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }

    alert("ลงทะเบียนคอร์ส Python เขียนโปรแกรมเบื้องต้น เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
    return false; 
}

// สคริปต์เช็คฟอร์มสอบ certify 
function แสดงวิชาสอบ(idที่จะโชว์) {
    var ฟอร์มทั้งหมด = document.getElementsByClassName("examform");
    for (var i = 0; i < ฟอร์มทั้งหมด.length; i++) {
        ฟอร์มทั้งหมด[i].style.display = "none";
    }
    document.getElementById(idที่จะโชว์).style.display = "block";
    document.getElementById(idที่จะโชว์).scrollIntoView({behavior: "smooth"});
}

function ซ่อนวิชาสอบทั้งหมด() {
    var ฟอร์มทั้งหมด = document.getElementsByClassName("examform");
    for (var i = 0; i < ฟอร์มทั้งหมด.length; i++) {
        ฟอร์มทั้งหมด[i].style.display = "none";
    }
    document.getElementById("certify-list").scrollIntoView({behavior: "smooth"});
}

function เช็ควิชา_AIFundamentals() {
    var ชื่อ = document.getElementById("AIFundamentals_name").value;
    var อีเมล = document.getElementById("AIFundamentals_email").value;
    var เบอร์ = document.getElementById("AIFundamentals_phone").value;
    var วันสอบ = document.getElementById("AIFundamentals_date").value;
    if(ชื่อ == ""){
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if(อีเมล == ""){
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if(เบอร์ == ""){
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }
    if(วันสอบ == ""){
        alert("เลือกวันที่ต้องการสอบด้วย");
        return false;
    }
    alert("สมัครสอบ AI Fundamentals Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    return false; 
}

function เช็ควิชา_DataScienceCert() {
    var ชื่อ = document.getElementById("DataScienceCert_name").value;
    var อีเมล = document.getElementById("DataScienceCert_email").value;
    var เบอร์ = document.getElementById("DataScienceCert_phone").value;
    var วันสอบ = document.getElementById("DataScienceCert_date").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }
    if (วันสอบ == "") {
        alert("เลือกวันที่ต้องการสอบด้วย");
        return false;
    }

    alert("สมัครสอบ Data Science Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    return false; 
}

function เช็ควิชา_DigitalMarketingCert() {
    var ชื่อ = document.getElementById("DigitalMarketingCert_name").value;
    var อีเมล = document.getElementById("DigitalMarketingCert_email").value;
    var เบอร์ = document.getElementById("DigitalMarketingCert_phone").value;
    var วันสอบ = document.getElementById("DigitalMarketingCert_date").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }
    if (วันสอบ == "") {
        alert("เลือกวันที่ต้องการสอบด้วย");
        return false;
    }

    alert("สมัครสอบ Digital Marketing Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    return false; 
}

function เช็ควิชา_CybersecurityCert() {
    var ชื่อ = document.getElementById("CybersecurityCert_name").value;
    var อีเมล = document.getElementById("CybersecurityCert_email").value;
    var เบอร์ = document.getElementById("CybersecurityCert_phone").value;
    var วันสอบ = document.getElementById("CybersecurityCert_date").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }
    if (วันสอบ == "") {
        alert("เลือกวันที่ต้องการสอบด้วย");
        return false;
    }

    alert("สมัครสอบ Cybersecurity Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    return false; 
}

function เช็ควิชา_PythonCert() {
    var ชื่อ = document.getElementById("PythonCert_name").value;
    var อีเมล = document.getElementById("PythonCert_email").value;
    var เบอร์ = document.getElementById("PythonCert_phone").value;
    var วันสอบ = document.getElementById("PythonCert_date").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }
    if (วันสอบ == "") {
        alert("เลือกวันที่ต้องการสอบด้วย");
        return false;
    }

    alert("สมัครสอบ Python Programming Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    return false; 
}

function เช็ควิชา_UXUICert() {
    var ชื่อ = document.getElementById("UXUICert_name").value;
    var อีเมล = document.getElementById("UXUICert_email").value;
    var เบอร์ = document.getElementById("UXUICert_phone").value;
    var วันสอบ = document.getElementById("UXUICert_date").value;

    if (ชื่อ == "") {
        alert("กรอกชื่อ-นามสกุลก่อนนะ");
        return false;
    }
    if (อีเมล == "") {
        alert("กรอกอีเมลก่อนนะ");
        return false;
    }
    if (เบอร์ == "") {
        alert("กรอกเบอร์โทรก่อนนะ");
        return false;
    }
    if (วันสอบ == "") {
        alert("เลือกวันที่ต้องการสอบด้วย");
        return false;
    }

    alert("สมัครสอบ UX/UI Design Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    return false; 
}

// สคริปต์เช็คฟอร์มติดต่อ
function เช็คฟอร์มติดต่อ() {
   var ชื่อ = document.getElementById("contactName").value;
   var อีเมล = document.getElementById("contactEmail").value;
   var หัวข้อ = document.getElementById("contactSubject").value;
   if (ชื่อ == "") {
      alert("กรอกชื่อ-นามสกุลก่อนนะ");
      return false;
   }
   if (อีเมล == "") {
      alert("กรอกอีเมลก่อนนะ");
      return false;
   }
   if (หัวข้อ == "") {
      alert("กรอกหัวข้อก่อนนะ");
      return false;
   }
   alert("ส่งข้อความเรียบร้อย ทีมงานจะติดต่อกลับทางอีเมลที่กรอกไว้");
   return false; 
}
