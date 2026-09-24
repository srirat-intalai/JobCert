// ไฟล์นี้เก็บเฉพาะฟังก์ชันเช็คฟอร์ม (validation) แยกออกมาจาก main.js ตามที่อาจารย์ให้แยกไฟล์

// ทำแบบ activity week4 ที่ทำไปแล้ว ผิดช่องไหนให้กรอบแดง แล้วมีข้อความบอกใต้ช่อง
// ข้อความ error อยู่ใน <p class="error_msg" id="ชื่อช่อง_error"> ใต้ input ทุกอัน

// โชว์ error ของช่องนั้น
function showError(el, msg) {
    var errorEl = document.getElementById(el.id + "_error");
    errorEl.innerHTML = msg;
    errorEl.style.display = "block";
    el.classList.add("input-error");   // ใช้ class เพราะ style.borderColor ตรงๆ โดน border-0 ของ bootstrap ทับ
}

// ถูกแล้วก็ซ่อน error ออก
function hideError(el) {
    var errorEl = document.getElementById(el.id + "_error");
    errorEl.style.display = "none";
    el.classList.remove("input-error");
}

function checkName(uname) {
    if (uname.value == "") {
        showError(uname, "กรุณากรอกชื่อ-นามสกุล");
        return false;
    }
    hideError(uname);
    return true;
}

function checkEmail(uemail) {
    // regex อีเมล ก๊อปจากสไลด์
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (uemail.value == "") {
        showError(uemail, "กรุณากรอกอีเมล");
        return false;
    }
    if (!uemail.value.match(mailformat)) {
        showError(uemail, "รูปแบบอีเมลไม่ถูกต้อง เช่น example@gmail.com");
        return false;
    }
    hideError(uemail);
    return true;
}

function checkPhone(uphone) {
  var numbers = /^[0-9]{10}$/;   // เลขล้วน 10 ตัว
  if (uphone.value == "") {
    showError(uphone, "กรุณากรอกเบอร์โทร");
    return false;
  }
  if (!uphone.value.match(numbers)) {
    showError(uphone, "เบอร์โทรต้องเป็นตัวเลข 10 หลัก ไม่ต้องใส่ขีด");
    return false;
  }
  hideError(uphone);
  return true;
}

function checkDate(udate) {
    if(udate.value == ""){
        showError(udate, "กรุณาเลือกวันที่ต้องการสอบ");
        return false;
    }
    hideError(udate);
    return true;
}


// ---- ฟอร์มสมัครงาน 3 ตำแหน่ง ----
// เช็คทุกช่องก่อน (ok1 ok2 ok3) แล้วค่อยดูรวม จะได้ขึ้นแดงทุกช่องที่ผิดพร้อมกันเลย ไม่ต้องกดส่งทีละรอบ
function checkJob_AIWebDev() {
    var ok1 = checkName(document.getElementById("AIWebDev_name"));
    var ok2 = checkEmail(document.getElementById("AIWebDev_email"));
    var ok3 = checkPhone(document.getElementById("AIWebDev_phone"));

    if (ok1 && ok2 && ok3) {
        alert("ส่งใบสมัครตำแหน่ง AI-Assisted Web Developer เรียบร้อย ทีมงานจะติดต่อกลับทางอีเมลหรือเบอร์โทรที่กรอกไว้");
    }
    return false; // กันไว้ก่อน เพราะยังไม่มี backend รับข้อมูลจริง
}

function checkJob_DigitalTransform() {
    var ok1 = checkName(document.getElementById("DigitalTransform_name"));
    var ok2 = checkEmail(document.getElementById("DigitalTransform_email"));
    var ok3 = checkPhone(document.getElementById("DigitalTransform_phone"));
    if (ok1 && ok2 && ok3) {
        alert("ส่งใบสมัครตำแหน่ง Digital & AI Transformation Associate เรียบร้อย ทีมงานจะติดต่อกลับทางอีเมลหรือเบอร์โทรที่กรอกไว้");
    }
    return false;
}

function checkJob_AIDataAnalyst() {
    var ok1 = checkName(document.getElementById("AIDataAnalyst_name"));
    var ok2 = checkEmail(document.getElementById("AIDataAnalyst_email"));
    var ok3 = checkPhone(document.getElementById("AIDataAnalyst_phone"));

    if (ok1 && ok2 && ok3) {
        alert("ส่งใบสมัครตำแหน่ง AI Data Analyst (Entry Level) เรียบร้อย ทีมงานจะติดต่อกลับทางอีเมลหรือเบอร์โทรที่กรอกไว้");
    }
    return false;
}

// ---- ฟอร์มอบรม ----
function checkCourse_GenAIFoundations() {
  var ok1 = checkName(document.getElementById("GenAIFoundations_name"));
  var ok2 = checkEmail(document.getElementById("GenAIFoundations_email"));
  var ok3 = checkPhone(document.getElementById("GenAIFoundations_phone"));
  if (ok1 && ok2 && ok3) {
    alert("ลงทะเบียนคอร์ส Generative AI Foundations & Prompt Engineering Masterclass เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
  }
  return false; 
}
function checkCourse_MultimodalGenAI() {
  var ok1 = checkName(document.getElementById("MultimodalGenAI_name"));
  var ok2 = checkEmail(document.getElementById("MultimodalGenAI_email"));
  var ok3 = checkPhone(document.getElementById("MultimodalGenAI_phone"));
  if (ok1 && ok2 && ok3) {
    alert("ลงทะเบียนคอร์ส Multimodal Generative AI for Business & Creative Content เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
  }
  return false; 
}

function checkCourse_DataAnalysisBasic() {
    var ok1 = checkName(document.getElementById("DataAnalysisBasic_name"));
    var ok2 = checkEmail(document.getElementById("DataAnalysisBasic_email"));
    var ok3 = checkPhone(document.getElementById("DataAnalysisBasic_phone"));

    if (ok1 && ok2 && ok3) {
        alert("ลงทะเบียนคอร์ส Data Analysis เบื้องต้น เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
    }
    return false; 
}

function checkCourse_CybersecurityBasic() {
    var ok1 = checkName(document.getElementById("CybersecurityBasic_name"));
    var ok2 = checkEmail(document.getElementById("CybersecurityBasic_email"));
    var ok3 = checkPhone(document.getElementById("CybersecurityBasic_phone"));

    if (ok1 && ok2 && ok3) {
        alert("ลงทะเบียนคอร์ส Cybersecurity พื้นฐาน เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
    }
    return false; 
}
function checkCourse_UXUIWorkshop() {
    var ok1 = checkName(document.getElementById("UXUIWorkshop_name"));
    var ok2 = checkEmail(document.getElementById("UXUIWorkshop_email"));
    var ok3 = checkPhone(document.getElementById("UXUIWorkshop_phone"));

    if (ok1 && ok2 && ok3) {
        alert("ลงทะเบียนคอร์ส UX/UI Design Workshop เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
    }
    return false; 
}

function checkCourse_PythonBasic() {
    var ok1 = checkName(document.getElementById("PythonBasic_name"));
    var ok2 = checkEmail(document.getElementById("PythonBasic_email"));
    var ok3 = checkPhone(document.getElementById("PythonBasic_phone"));
    if (ok1 && ok2 && ok3) {
        alert("ลงทะเบียนคอร์ส Python เขียนโปรแกรมเบื้องต้น เรียบร้อย ทีมงานจะส่งรายละเอียดเพิ่มเติมไปทางอีเมลที่กรอกไว้");
    }
    return false; 
}


// ---- ฟอร์มสอบ certify มีช่องวันสอบด้วย เลยมี ok4 ----
function checkExam_AIFundamentals() {
    var ok1 = checkName(document.getElementById("AIFundamentals_name"));
    var ok2 = checkEmail(document.getElementById("AIFundamentals_email"));
    var ok3 = checkPhone(document.getElementById("AIFundamentals_phone"));
    var ok4 = checkDate(document.getElementById("AIFundamentals_date"));
    if(ok1 && ok2 && ok3 && ok4){
        alert("สมัครสอบ AI Fundamentals Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    }
    return false; 
}

function checkExam_DataScienceCert() {
    var ok1 = checkName(document.getElementById("DataScienceCert_name"));
    var ok2 = checkEmail(document.getElementById("DataScienceCert_email"));
    var ok3 = checkPhone(document.getElementById("DataScienceCert_phone"));
    var ok4 = checkDate(document.getElementById("DataScienceCert_date"));

    if (ok1 && ok2 && ok3 && ok4) {
        alert("สมัครสอบ Data Science Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    }
    return false; 
}

function checkExam_DigitalMarketingCert() {
    var ok1 = checkName(document.getElementById("DigitalMarketingCert_name"));
    var ok2 = checkEmail(document.getElementById("DigitalMarketingCert_email"));
    var ok3 = checkPhone(document.getElementById("DigitalMarketingCert_phone"));
    var ok4 = checkDate(document.getElementById("DigitalMarketingCert_date"));

    if (ok1 && ok2 && ok3 && ok4) {
        alert("สมัครสอบ Digital Marketing Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    }
    return false; 
}

function checkExam_CybersecurityCert() {
    var ok1 = checkName(document.getElementById("CybersecurityCert_name"));
    var ok2 = checkEmail(document.getElementById("CybersecurityCert_email"));
    var ok3 = checkPhone(document.getElementById("CybersecurityCert_phone"));
    var ok4 = checkDate(document.getElementById("CybersecurityCert_date"));
    if (ok1 && ok2 && ok3 && ok4) {
        alert("สมัครสอบ Cybersecurity Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    }
    return false; 
}

function checkExam_PythonCert() {
    var ok1 = checkName(document.getElementById("PythonCert_name"));
    var ok2 = checkEmail(document.getElementById("PythonCert_email"));
    var ok3 = checkPhone(document.getElementById("PythonCert_phone"));
    var ok4 = checkDate(document.getElementById("PythonCert_date"));

    if (ok1 && ok2 && ok3 && ok4) {
        alert("สมัครสอบ Python Programming Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    }
    return false; 
}

function checkExam_UXUICert() {
    var ok1 = checkName(document.getElementById("UXUICert_name"));
    var ok2 = checkEmail(document.getElementById("UXUICert_email"));
    var ok3 = checkPhone(document.getElementById("UXUICert_phone"));
    var ok4 = checkDate(document.getElementById("UXUICert_date"));

    if (ok1 && ok2 && ok3 && ok4) {
        alert("สมัครสอบ UX/UI Design Certificate เรียบร้อย ทีมงานจะยืนยันรอบสอบทางอีเมลที่กรอกไว้");
    }
    return false; 
}


// ---- ฟอร์มลงทะเบียน (หน้าลงทะเบียน) ----
// dropdown ยังไม่ได้เลือก value จะเป็น "" (เหมือน countryselect ในสไลด์)
function checkSelect(sel, msg) {
    if (sel.value == "") {
        showError(sel, msg);
        return false;
    }
    hideError(sel);
    return true;
}

function checkAddress(uaddress) {
  if (uaddress.value == "") {
    showError(uaddress, "กรุณากรอกที่อยู่");
    return false;
  }
  hideError(uaddress);
  return true;
}

// radio ต้องวนเช็คทีละอันว่ามีอันไหนติ๊กไหม (แบบ checkGender ที่ทำใน activity)
function checkTier() {
    var radios = document.getElementsByName("reg_tier");
    var box = document.getElementById("reg_tier");
    var checked = false;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            checked = true;
        }
    }
    if (!checked) {
        showError(box, "กรุณาเลือกระดับทักษะ AI 1 ระดับ");
        return false;
    }
    hideError(box);
    return true;
}

// PDPA ไม่ติ๊ก = ห้ามส่ง
function checkPdpa() {
    var pdpa = document.getElementById("reg_pdpa");
    if (!pdpa.checked) {
        showError(pdpa, "ต้องกดยินยอมเรื่องข้อมูลส่วนบุคคล (PDPA) ก่อนนะ");
        return false;
    }
    hideError(pdpa);
    return true;
}

function checkRegister() {
    var ok1 = checkSelect(document.getElementById("reg_title"), "กรุณาเลือกคำนำหน้า");
    var ok2 = checkName(document.getElementById("reg_name"));
    var ok3 = checkPhone(document.getElementById("reg_phone"));
    var ok4 = checkEmail(document.getElementById("reg_email"));
    var ok5 = checkAddress(document.getElementById("reg_address"));
    var ok6 = checkSelect(document.getElementById("reg_edu"), "กรุณาเลือกระดับการศึกษา");
    var ok7 = checkTier();
    var ok8 = checkSelect(document.getElementById("reg_job"), "กรุณาเลือกตำแหน่งที่ต้องการสมัคร");
    var ok9 = checkPdpa();

    if (ok1 && ok2 && ok3 && ok4 && ok5 && ok6 && ok7 && ok8 && ok9) {
        var title = document.getElementById("reg_title").value;
        var name = document.getElementById("reg_name").value;
        var job = document.getElementById("reg_job").value;
        alert("ลงทะเบียนเรียบร้อย ขอบคุณ " + title + name + " ที่สนใจตำแหน่ง " + job + " ทีมงานจะติดต่อกลับทางอีเมลที่กรอกไว้");
    }
    return false; // ยังไม่มี backend เหมือนฟอร์มอื่น
}

