var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var xCheck = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Gift2023")==null) { location.href = "index.html"; }
  if(sessionStorage.getItem("CheckNews")==null) {
    document.getElementById('id02').style.display='block';
    sessionStorage.setItem("CheckNews", "News");
  }
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
  dbGift2023log = firebase.firestore().collection("Gift2023log");
  CheckQuiz();
}


function CheckQuiz() {
  //var str = "";
  //str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" style="margin:-60px auto 20px auto;"></div>';
  //var str = "";
  //str += '<div style="margin-left: 7px;">';
  dbGift2023log
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .where('ResultQuiz','==','True')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheck = 1;
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowGift').style.display='block';
    });
    if(xCheck==0) {
      CheckQuizDate();
    }
  });
}


function CheckQuizDate() {
  var aCheck = 0;
  dbGift2023log
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .where('QuizDate','==',today)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      aCheck = 1;
      document.getElementById('loading').style.display='none';
      document.getElementById('QuizFalse').style.display='block';
    });
    if(aCheck==0) {
      CheckQuizDate();
      document.getElementById('loading').style.display='none';
      document.getElementById('Question').style.display='block';
    }
    //$("#GiftBox2023").html(str);  
  });

}

function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}



