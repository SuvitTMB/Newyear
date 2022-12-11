var i = 0;
var EidProfile = "";
var dateString = "";


$(document).ready(function () {
/*
  sessionStorage.clear(); 
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
*/  
  main();
});



async function main() {
  await liff.init({ liffId: "1657509542-koZVxvjW" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


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
  dbGiftRewards = firebase.firestore().collection("Gift2023Rewards");
  CheckData();
}


var CheckFoundData = 0;
function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = 1;
      if(doc.data().statusconfirm==1) {
        EidProfile = doc.id;
        sessionStorage.setItem("EmpID_Gift2023", doc.data().empID);
        sessionStorage.setItem("EmpName_Gift2023", doc.data().empName);
        sessionStorage.setItem("EmpRefID", doc.id);
        sessionStorage.setItem("EmpPhone", doc.data().empPhone);
        sessionStorage.setItem("EmpAddress", doc.data().empAddress);
        //document.getElementById('loading').style.display='none';
        //document.getElementById('OldSurvey').style.display='block';
        dbProfile.doc(sessionStorage.getItem("EmpRefID")).update({
            linename : sessionStorage.getItem("LineName"),
            empPicture : sessionStorage.getItem("LinePicture")
        });
      } else {
        location.href = "https://liff.line.me/1655966947-KxrAqdyp";
      }
      CheckRewards();
    });
    if(CheckFoundData==0) {
      location.href = "https://liff.line.me/1655966947-KxrAqdyp"; 
    }
  });
}


var gcheck = 0;
function CheckRewards() {
  dbGiftRewards.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gcheck = 1;
      document.getElementById('loading').style.display='none';
      document.getElementById('OldSurvey').style.display='none';
      document.getElementById('ShowRewards').style.display='block';
    });
    //alert(gcheck);
    if(gcheck==0) {
      CheckMember();
    }
  });
}


var EidUpdateLogin = "";
var CountLogin = 0;
var CheckFound = 0;
function CheckMember() {
  dbGiftRewards.where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFound = 1;
      //sessionStorage.setItem("UserPoint_WorldCup", doc.data().UserPoint);
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowRewards').style.display='none';
      if(gcheck==0) {
        document.getElementById('OldSurvey').style.display='block';
      }
    });
    if(CheckFound==0) {
      //AddNewMember();
      document.getElementById('loading').style.display='none';
      document.getElementById('OldSurvey').style.display='block';
      document.getElementById('ShowRewards').style.display='none';
    }
  });
}

function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}
