var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var EidProfile = "";


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Gift2023")==null) { location.href = "index.html"; }
  Connect_DB();
});


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbRewards = firebase.firestore().collection("Gift2023Rewards");
  CheckRefID();
  CheckRewards();
}


function CheckRefID() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidProfile = doc.id;
    });
  });
}


//var EidRewards = "";
function CheckRewards() {
  var str = "";
  var gCheck = 0;
  dbRewards.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //EidRewards = doc.id;
      gCheck = 1;
      str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" style="margin:-60px auto 20px auto;"></div>';
      str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
      str += '<div style="color:#f68b1f; font-size: 13px; font-weight: 600;"><center>'+ sessionStorage.getItem("EmpName_Gift2023")+'</div>';
      str += '<div class="btn-t33" style="background-color: #94a9b3;border: solid #94a9b3 1px;margin-top:20px;">ของขวัญปีใหม่ของคุณ</div>';
      str += '<div style="font-size:11px; font-weight:600;"><img src="img/'+ doc.data().giftcode +'.jpg" class="img-reward"><br><font color="#0056ff">'+ doc.data().giftname +'</font><br>'+ doc.data().DateRegister +'</div>';
      str += '<div class="btn-t33" style="background-color: #94a9b3;border: solid #94a9b3 1px;margin-top:20px;">ตรวจสอบที่จัดส่งของขวัญ</div>';
      str += '<div style="text-align:left;width:80%; margin:auto;">';
      str += '<div style="width:100%;margin-top:15px;">โทรศัพท์</div>';
      str += '<div><input type="text" id="txtEmpPhone" class="input" style="width:100%;background-color:#fff;" value="'+ sessionStorage.getItem("EmpPhone") +'"></div>';
      str += '<div style="width:100%;margin-top:15px;">ที่อยู่สาขาสำหรับจัดส่งของขวัญปีใหม่</div>';
      str += '<div style="width:100%;margin-top:2px;"><textarea class="textarea" id="txtEmpAddress" style="width:100%; height:90px;color:#0056ff;border:1px solid #e4e4e4;border-radius: 5px;padding:5px;">'+ sessionStorage.getItem("EmpAddress") +'</textarea></div>';
      str += '<center><div class="btn-t2" onclick="SaveAddress(\''+ doc.id +'\')">บันทึกรายการ</div></center>';
      str += '</div>';
      str += '<div class="clr" style="height:50px;"></div>';
    });
    if(gCheck==0) {
      str = "";
      str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" style="margin:-60px auto 20px auto;"></div>';
      str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
      str += '<div style="color:#f68b1f; font-size: 13px; font-weight: 600;"><center>'+ sessionStorage.getItem("EmpName_Gift2023")+'</div>';
      str += '<div class="btn-t33" style="background-color: #94a9b3;border: solid #94a9b3 1px;margin-top:20px;">ของขวัญปีใหม่ของคุณ</div>';
      str += '<div style="color:#ff0000; font-size:12px;font-weight:600;margin-top:30px;">คุณยังไม่ได้เข้าร่วมกิจกรรม</div>';
    }
    //$("#DisplayUserRanking").html(str);
    console.log(sessionStorage.getItem("EmpRefID"));
    $("#MyProfile").html(str);  
  });
}



function SaveAddress(gid) {
  //var Eid = sessionStorage.getItem("EmpRefID");
  console.log(EidProfile+"==="+document.getElementById("txtEmpPhone").value);
  dbProfile.doc(EidProfile).update({
    empPhone : document.getElementById("txtEmpPhone").value,
    empAddress : document.getElementById("txtEmpAddress").value
  });
  dbRewards.doc(gid).update({
    Phone : document.getElementById("txtEmpPhone").value,
    address : document.getElementById("txtEmpAddress").value
  });
  sessionStorage.setItem("EmpPhone", document.getElementById("txtEmpPhone").value);
  sessionStorage.setItem("EmpAddress", document.getElementById("txtEmpAddress").value);
  alert("ระบบได้บันทึกรายการของคุณเรียบร้อยแล้ว");
  //UpdateLink();
}


function UpdateLink() {
  location.href = "giftforyou.html"; 
}