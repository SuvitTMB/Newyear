var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });


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
  dbGift2023 = firebase.firestore().collection("Gift2023");
  dbGiftRewards = firebase.firestore().collection("Gift2023Rewards");
  LoadGift();
}


function LoadGift() {
  var str = "";
  str += '<div style="margin-left: 7px;">';
  dbGift2023
  //.where('giftstatus','==',1) 
  .orderBy('giftranking','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().giftstock==0) {
        str += '<div class="gift-box" onclick="DetailGift(\''+ doc.id +'\',\''+ doc.data().giftcode +'\')"><img src="img/'+ doc.data().giftcode+'.jpg" style="width:100%"><br>'+ doc.data().giftweb+'<br> <br><div class="box-ShowClose">ของหมดแล้ว</div></div>';       
      } else {
        //str += '<div class="gift-box" onclick="DetailGift(\''+ doc.id +'\',\''+ doc.data().giftcode +'\')"><img src="img/'+ doc.data().giftcode+'.jpg" style="width:100%"><br>'+ doc.data().giftweb+'<br><font color="#ff0000">'+ doc.data().giftstock+' รายการ</font></div><div class="box-ShowClose">ของหมดแล้ว</div>';       
        str += '<div class="gift-box" onclick="DetailGift(\''+ doc.id +'\',\''+ doc.data().giftcode +'\')"><img src="img/'+ doc.data().giftcode+'.jpg" style="width:100%"><br>'+ doc.data().giftweb+'<br><font color="#ff0000">'+ doc.data().giftstock+' รายการ</font></div>';       
      }
    });
    str += '</div>';
    $("#GiftBox2023").html(str);  
  });
}


var xValue = "";
function DetailGift(id,gift) {
  var str = "";
  document.getElementById('id01').style.display='block';
    GetAllRewards(gift);


  dbGift2023.where(firebase.firestore.FieldPath.documentId(), "==", id)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="txt-qq" style="color:#000000;font-size: 12px; margin-top:20px;">รายการของขวัญปีใหม่<br><u><font color="#0056ff">'+ doc.data().giftname +'</font></u></div>';
      str += '<div style="font-size:11px; font-weight:600;"><img src="img/'+ doc.data().giftcode +'.jpg" class="img-reward"></div>';
      str += '<div class="btn-t33" style="background-color: #94a9b3;border: solid #94a9b3 1px;margin-top:20px;">รายชื่อผู้ที่ได้รับของขวัญ</div>';
      str += '<div class="clr"></div>';
      str += '<div>'+ xValue +'</div>';
      str += '<div class="clr" style="height:30px;"></div>';
      str += '<div class="btn-t3" onclick="CloseAll()">ปิดหน้าต่างนี้</div>';
      str += '<div class="clr" style="height:50px;"></div>';
    });
    $("#DisplayGift").html(str);  
  });
}


function GetAllRewards(gift) {
  //alert(gift);
  str = "";
  str += '<div style="width:90%; margin:auto;">';
  var i = 1;
  dbGiftRewards
  .where('giftcode','==',gift) 
  .where('EmpID','!=','') 
  //.orderBy('DateRegister','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="txt-qq" style="width:15%;float: left;font-size:11px;padding-top:5px;">'+ i +'.</div>';
      str += '<div class="txt-qq" style="width:85%;float: left;text-align:left;font-size:11px;padding-top:5px;">'+ doc.data().EmpName +'</div>';
      str += '<div style="border-bottom:1px solid #f68b1f; margin:2px auto; min-height:28px;"></div>';
      i++;
      console.log(doc.data().EmpName);
    });
    str += '</div>';
    xValue = str;
    //$("#DisplayList").html(str);  
  });
}



function CloseAll() {
  document.getElementById('id01').style.display='none';
}

