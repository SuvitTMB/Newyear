var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var db = "";
var dbUser = "";
var dbCheck = "";

var OpenQuiz = "1";
var Eid = "";
var EQuizDate = "";
var EQuizForm = "";
var cleararray = "";
//var today = moment().format('DD MMM, YYYY');
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var EQuizQuizTimer = 0;
var now = new Date();
var timeup = "";
var counter = "";
var CheckPass = 0;
var dateString = "";
var CheckQuizQuestion = "";
var YourScore = 0;
var sTypeSelect = "หมวดคำถามคลายเครียด";
var sGroupQuiz = "WOW";
//var sGroupQuiz = "QuizRelax";
var sBadgeEng = "Badge-QuizRelax"; //ชื่อ badge
var EidScorePoint = "";
var sRewardsXP = 0;
var sRewardsRP = 0;
var sJoinTime = 0;
var sUserLevel = 0;
var sUserSumTrue = 0;
var sUserSumFalse = 0;
var sUserSumQuiz = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Gift2023")==null) { location.href = "index.html"; }
  Connect_DB();
  RandomRewards();
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
  db = firebase.firestore().collection("QuizoftheDay");
  dbCheck = firebase.firestore().collection("Gift2023log");
  dbRewards = firebase.firestore().collection("Gift2023Rewards");
  dbStock = firebase.firestore().collection("Gift2023");
  //dbGift2023log = firebase.firestore().collection("Gift2023log");
  CheckUserQuiz();
}


var CheckPass = 0;
var LastScore = 0;
var CheckAddEdit = 0;
var CheckSaveRecord = 0;
function CheckUserQuiz() {
  dbCheck.where('GroupQuiz','==',sGroupQuiz)
  .where('QuizDate','==',today)
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckPass = 1;
      Eid = doc.id;
    });
    if(CheckPass==0) {
      CheckAddEdit = 2;
      document.getElementById("id01").style.display = "block";
      AddNewUser();
      RandomQuestion();
    }
    //alert(today+"==="+CheckPass);
  });
}



var i = 0;
var ArrQuestion = [];
var NewQuestion = "";
function RandomQuestion() { 
  db.where('GroupQuiz','==',sGroupQuiz)
  .where('QuizStatus','==',1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
      ArrQuestion.push([doc.id]);
    });
    NewQuestion = random_item(ArrQuestion);
    EidQuestion = NewQuestion[0];
    GetQuestion();
  });  
}



var ArrRewards = [];
var NewRewards = "";
function RandomRewards() { 
  dbRewards.where('LineID','==','')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      ArrRewards.push([doc.id]);
      //ArrRewards.push([doc.data().giftcode]);
    });
    NewRewards = random_item(ArrRewards);
    //EidRewards = NewRewards[0];
    //GetQuestion();
    console.log("Rewards = "+NewRewards[0]);
  });  
}


function GetQuestion() {
  //console.log(NewQuestion);
  var sSummary = "";
  //document.getElementById('ShowScoreGame').style.display='none';
  document.getElementById('ShowQuizGame').style.display='block';
  //alert("ID คำถาม = "+EidQuestion);
  $("#DisplaySummary").val(cleararray);
  $("#DisplayDay").val(cleararray);
  $("#DisplayQuestion").val(cleararray);
  $("#DisplayChoice").val(cleararray);
  $("#DisplayTimer").val(cleararray);
  //alert(EidQuestion);
  db.where(firebase.firestore.FieldPath.documentId(), "==", EidQuestion)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EQuizDate = doc.data().QuizDate;
      EQuizQuizTimer = Number(doc.data().QuizTimer);
      now = new Date();
      timeup = now.setSeconds(now.getSeconds() + Number(doc.data().QuizTimer));
      counter = setInterval(timer, 1000);
      timer();
      //console.log(doc.data().QuizDate+"==="+doc.data().QuizQuestion);
      CheckType = doc.data().QuizTypeQuestion;
      CheckQuizQuestion = doc.data().QuizQuestion;
      CheckQuizAnswer = doc.data().QuizAnswer;
      CheckQuizAnswerText = doc.data().QuizAnswerText;
      CheckPoint = doc.data().QuizPoint;
      SumQuiz = doc.data().SumQuiz;
      SumChoice1 = doc.data().SumChoice1;
      SumChoice2 = doc.data().SumChoice2;
      SumChoice3 = doc.data().SumChoice3;
      SumChoice4 = doc.data().SumChoice4;
      SumQuizTrue = doc.data().SumQuizTrue;
      SumQuizFalse = doc.data().SumQuizFalse;

      if(doc.data().QuizTypeQuestion==1) {
        //alert("Quiz : "+doc.data().QuizTypeQuestion);
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        //$("#DisplayDay").html("<div class='txt-q'>คำถามประจำวันที่ : "+ today +"</div>");
        $("#DisplayQuestion").html("<div class='txt-qq'>"+ doc.data().QuizQuestion +"</div>");
        EQuizForm += "<div style='margin-top:20px;'></div><center>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(1,\""+ doc.data().QuizChoice1 +"\")' id='answer1'><input type='radio' name='a1'>"+ doc.data().QuizChoice1 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(2,\""+ doc.data().QuizChoice2 +"\")' id='answer2'><input type='radio' name='a1'>"+ doc.data().QuizChoice2 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(3,\""+ doc.data().QuizChoice3 +"\")' id='answer3'><input type='radio' name='a1'>"+ doc.data().QuizChoice3 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(4,\""+ doc.data().QuizChoice4 +"\")' id='answer4'><input type='radio' name='a1'>"+ doc.data().QuizChoice4 +"</div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ</div>";
        EQuizForm += "<br><br></center>";


      } else if(doc.data().QuizTypeQuestion=="2") {
        $("#DisplayDay").html("<div class='txt-q'>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</div>");
        if(doc.data().QuizQuestion!=null) {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'><div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'></div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType2' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:25px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ </div>";
        EQuizForm += "<div style='color:#ff0000;padding:10px;'>กรุณาตรวจสอบข้อความให้ถูกต้องก่อนส่งคำตอบ</div><div id='chars' style='color:#f4f7fb;'><div><br><br>";
      } else if(doc.data().QuizTypeQuestion=="3") {
        $("#DisplayDay").html("<div class='txt-q'>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</div>");
        if(doc.data().QuizVDO!=null) {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"<div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"</div>");
        }
        EQuizForm += "<div style='margin-top:20px;'></div><center>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(1,\""+ doc.data().QuizChoice1 +"\")' id='answer1'><input type='radio'>"+ doc.data().QuizChoice1 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(2,\""+ doc.data().QuizChoice2 +"\")' id='answer2'><input type='radio'>"+ doc.data().QuizChoice2 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(3,\""+ doc.data().QuizChoice3 +"\")' id='answer3'><input type='radio'>"+ doc.data().QuizChoice3 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(4,\""+ doc.data().QuizChoice4 +"\")' id='answer4'><input type='radio'>"+ doc.data().QuizChoice4 +"</div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ</div>";
        EQuizForm += "<br><br></center>";
      } else if(doc.data().QuizTypeQuestion=="4") {
        $("#DisplayDay").html("<div class='txt-q'>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</div>");
        if(doc.data().QuizVDO!=null) {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"<div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"</div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType4' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:25px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText4()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswer()'>ส่งคำตอบ</div>";
        EQuizForm += "<div style='color:#ff0000;padding:10px;'>กรุณาตรวจสอบข้อความให้ถูกต้องก่อนส่งคำตอบ</div><div id='chars4' style='color:#f4f7fb;'><div><br><br>";
      }
      
      $("#DisplayTimer").html("<center><div id='timer' class='timer'></div></center>");
    });
    $("#DisplayChoice").html(EQuizForm);
    //$("#DisplaySummary").html(EQuizForm);
    //if(Eid=="") {
    //  alert("Quiz not Open55555");
    //  CloseQuiz();
    //}
  });
}




var ChoiceSelect = "";
var TextSelectChoice = "";
function ClickChoice(x,y) {
  ChoiceSelect = x;
  TextSelectChoice = y;
  if(x==1) {
    document.getElementById("answer1").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  } else if(x==2) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  } else if(x==3) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  } else if(x==4) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice SelectQ'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  }
}


function AddNewUser() {
  if(CheckAddEdit==2) {
    dbCheck.add({
      GroupQuiz : sGroupQuiz,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Gift2023"),
      EmpName : sessionStorage.getItem("EmpName_Gift2023"),
      TypeSelect : sTypeSelect,
      LastScore : 0,
      PointIN : 0,
      QuizDate : today
    });
    CheckUserQuiz();
  }
}


function SendAnswer() {
  if(CheckPoint!=0) {
    LastScore = CheckPoint;
  }
  if(CheckType==1) {
      if(ChoiceSelect==CheckQuizAnswer) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  } else if(CheckType==2) {
      ChoiceSelect = 0;
      TextSelectChoice = document.getElementById('SendCheckType2').value;
      if(TextSelectChoice==CheckQuizAnswerText) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  } else if(CheckType==3) {
      if(ChoiceSelect==CheckQuizAnswer) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  } else if(CheckType==4) {
      ChoiceSelect = 0;
      TextSelectChoice = document.getElementById('SendCheckType4').value;
      //alert(TextSelectChoice+" --- "+CheckQuizAnswerText)
      if(TextSelectChoice==CheckQuizAnswerText) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  }
  SaveData();
}


function SaveData() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var typeResult = "";
  if(YourScore==0) {
    typeResult = "False";
  } else {
    typeResult = "True";
  }
  if(CheckAddEdit==2) { 
    var ChangePoint = 0;
    dbCheck.doc(Eid).update({
      GroupQuiz : sGroupQuiz,
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Gift2023"),
      EmpName : sessionStorage.getItem("EmpName_Gift2023"),
      QuizDate : today,
      RefID : EidQuestion, //add
      QuizType : CheckType,
      Quetion :  CheckQuizQuestion,
      Answer : ChoiceSelect,
      AnswerTxt : TextSelectChoice, //add
      ResultQuiz : typeResult,
      PointIN : parseFloat(YourScore),
      ChangePoint : ChangePoint,
      PointOUT : parseFloat(ChangePoint),
      LastScore : YourScore,
      DateRegister : dateString,
      TimeStamp : TimeStampDate
    });
  }
  SaveQuestion();
  ClearQuiz();
}

function SaveQuestion() {
  SumQuiz = SumQuiz + 1; 
  if(YourScore==0) {
    SumQuizFalse = SumQuizFalse + 1;
  } else if(YourScore!=0) {
    SumQuizTrue = SumQuizTrue + 1;
  }
  if(ChoiceSelect==1) { SumChoice1 = SumChoice1+1; } else
  if(ChoiceSelect==2) { SumChoice2 = SumChoice2+1; } else
  if(ChoiceSelect==3) { SumChoice3 = SumChoice3+1; } else
  if(ChoiceSelect==4) { SumChoice4 = SumChoice4+1; } 
  db.doc(EidQuestion).update({
    SumQuiz : SumQuiz,
    SumQuizTrue : SumQuizTrue,
    SumQuizFalse : SumQuizFalse,
    SumChoice1 : SumChoice1,
    SumChoice2 : SumChoice2,
    SumChoice3 : SumChoice3,
    SumChoice4 : SumChoice4
  });
}


function ClearQuiz() {
  var a = "";
  clearInterval(counter);
  document.getElementById("timer").innerHTML = ""; 
  document.getElementById("DisplayTimer").innerHTML = ""; 
  document.getElementById("DisplayChoice").innerHTML = ""; 
  document.getElementById("DisplayDay").innerHTML = ""; 
  document.getElementById("DisplayQuestion").innerHTML = ""; 
  document.getElementById("DisplayChoice").innerHTML = ""; 
  //alert(YourScore);
  if(YourScore!=0) {
    LastScore = YourScore;
    $("#DisplayDay").html("<div class='txt-q'><b>LINE Retail Society</b><br>ร่วมส่งความสุขปีใหม่ 2565<br>ระหว่างวันที่ 20-31 ธันวาคม 2565</div>");
    $("#DisplaySummary").html("<div class='txt-q'>กิจกรรมวันที่ : "+ today +"</div><div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้</div>");
    var str1 = "";
    var str2 = "";
    str1 += '<div style="margin:30px;"><img src="./img/true.png" width="100px;"></div>';
    str1 += '<div class="txt-qq" style="color:#f68b1f;height:80px;margin-top:30px;"><b>ยินดีด้วยคุณตอบคำถามได้ถูกต้อง<br>คูณได้สิทธิ์ในการลุ้นรับของขวัญปีใหม่</b><div>';
    str2 += '<div style="padding-top:20px;"><img src="./img/true.png" width="70px;"></div>';
    str2 += '<div class="txt-qq" style="margin-top:15px;">ยินดีด้วยคุณตอบคำถามได้ถูกต้อง<br>เรามีข้อเสนอให้คุณ<div>';
    //str2 += '<div style="padding:20px 0;color:#0056ff">คุณสามารถเปลี่ยนคะแนนที่ได้รับได้ใหม่<br>โดยคุณอาจจะได้รับคะแนนที่ <b>เพิ่มขึ้น</b> หรือ <b>ลดลง</b> ก็ได้</div>';
    str2 += '<div class="btn-t1" onclick="CheckGift()" style="margin-top;25px;">คลิกเพื่อสุ่มรับของขวัญปีใหม่</div>';
    str2 += '<div style="padding:15px 10px;color:#000;font-weight:600;margin-top;25px;">กรุณากดรับของขวัญปีใหม่ก่อนที่จะออกจากหน้านี้ไปน้า</div>';
    $("#DisplayChoice").html(str2);
    $("#SelectWay").html(str1);
    //document.getElementById("id02").style.display = "block";
  } else {
    LastScore = 0;
    $("#DisplayDay").html("<div class='txt-q'><b>LINE Retail Society</b><br>ร่วมส่งความสุขปีใหม่ 2565<br>ระหว่างวันที่ 20-31 ธันวาคม 2565</div>");
    $("#DisplaySummary").html("<div class='txt-q'>กิจกรรมวันที่ : "+ today +"</div><div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div class='btn-t2' onclick='gotoweb()' style='margin-top;25px;'>ขอขอบคุณสำหรับการเข้าร่วมกิจกรรมจาก LINE Retail Society</div></div>");
    //$("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ : <span class='txt-qqq'>"+ LastScore +"</span> คะแนน</div><div class='btn-t2' onclick='gotoweb()' style='margin-top;25px;'>พรุ่งนี้กลับมาเล่นกันใหม่น้า</div></div>");
    var str2 = "";
    str2 += '<div style="padding-top:20px;"><img src="./img/false.png" width="100px;"></div>';
    str2 += '<div class="txt-qq" style="margin-top:15px;">เสียใจด้วยน้า<div>';
    str2 += '<div style="padding:20px 0;color:#ff0000;">วันนี้คุณตอบคำถามไม่ถูกต้อง</div>';
    str2 += '<div class="btn-t1" onclick="gotoweb()" style="margin-top;25px;">พรุ่งนี้กลับมาเล่นกันใหม่น้า</div>';
    $("#DisplayChoice").html(str2);
  }  
}


function CheckGift() {
  var hCheck = 0;
  dbRewards.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      hCheck = 1;
      alert("คุณได้รับของขวัญปีใหม่ไปแล้ว ไม่สามารถรับซ้ำได้อีก");
      window.location.href = 'giftforyou.html';
    });
    if(hCheck==0) {
      RedeemGift();
    }
  });
}


function RedeemGift() {
  NewDate();
  var xGiftCode = "";
  var xGiftName = "";
  var xCheck = 0;
  var xID = "";
  var str = "";
  $("#DisplayDay").val(cleararray);
  $("#DisplayQuestion").val(cleararray);
  $("#DisplayChoice").val(cleararray);
  NewRewards = random_item(ArrRewards);
  dbRewards.where(firebase.firestore.FieldPath.documentId(), "==", NewRewards[0])
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().LineID=="") {
        xCheck = 1;
        xID = doc.id;
        xGiftCode = doc.data().giftcode;
        xGiftName = doc.data().giftname;
      } else {
        RedeemGift();
      }
    });
    if(xCheck==1) {
      dbRewards.doc(xID).update({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        EmpID : sessionStorage.getItem("EmpID_Gift2023"),
        EmpName : sessionStorage.getItem("EmpName_Gift2023"),
        DateRegister : dateString,
        RefID : xID,
        ResultQuiz : 'True'
      });
      CheckStock(xGiftCode);
      str += '<div class="txt-q" style="margin:30px auto 10px auto;">ระบบได้ทำการบันทึกรายการ<br>การสุ่มของรางวัลของคุณเรียบร้อยแล้ว<br>ของรางวัลที่คุณได้รับคือ</div>';
      str += '<div class="txt-qq"><img src="img/'+ xGiftCode +'.jpg" style="width:200px;""><br>'+ xGiftName +'</div>';
      str += '<div class="btn-t1" onclick="gotogift()" style="margin-top;25px;">คลิกเพื่อตรวจสอบสถานที่<br>สำหรับการจัดส่งของขวัญปีใหม่</div>';
      $("#DisplayChoice").html(str);
    }
  });
}


var EidStock = "";
var ygiftstock = 0;
var ygiftredeem = 0
var ygiftstatus = 1;
function CheckStock(gift) {
  dbStock.where('giftcode','==',gift)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidStock = doc.id;
      ygiftstock = parseFloat(doc.data().giftstock) - 1;
      ygiftredeem = parseFloat(doc.data().giftredeem) + 1;
      if(ygiftstock <= 0) {
        ygiftstatus = 0;
      }
    });
    dbStock.doc(EidStock).update({
      giftstock : ygiftstock,
      giftredeem : ygiftredeem,
      giftstatus : ygiftstatus
    });
  });
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function timer() {
  now = new Date();
  count = Math.round((timeup - now)/1000);
  if (now > timeup) {
      window.location = "#"; //or somethin'
      $("#timer").html("<font color='#ffff00'>หมดเวลาตอบคำถาม</font>");
      document.getElementById("SubmitAns").style.display = "none";
      //alert("หมดเวลา");
      clearInterval(counter);
      SaveData();
      return;
  }
  var seconds = Math.floor((count%60));
  var minutes = Math.floor((count/60) % 60);
  if(seconds<10) { seconds="0"+seconds } 
  $("#timer").html("เหลือเวลาอีก <font color='#ffff00'>" + minutes + " นาที " + seconds  + " วินาที</font>");
}


function gotoweb() {
  window.location.href = 'home.html';
}


function gotogift() {
  window.location.href = 'giftforyou.html';
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
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


