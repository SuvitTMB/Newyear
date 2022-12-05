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
  dbRewards = firebase.firestore().collection("Gift2023Rewards");
  MemberRanking()
}


function MemberRanking(){
  var i = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];
  dbRewards.where('LineID','!=', '')
  //.orderBy('giftname','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      var ShowPicture = '<img src="'+doc.data().LinePicture+'" style="width:30px;">';
      dataSet = [ doc.data().giftname, ShowPicture, doc.data().EmpName, i];
      dataSrc.push(dataSet);
      count++;
    }); 
    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        { title: "Rewards", className: "txt-center" },
        { title: "User", className: "txt-center"  },
        { title: "Name" },
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, -1], [50, 100, "All"]],

        columnDefs: [ { type: 'num-fmt', 'targets': [1] } ],
        order: [[ 0, 'asc']]
      });   
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}


/*
function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}



function UserRanking() {
  var str = "";
  dbWorldMember.where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1).get().then((snapshot)=> {
    snapshot.forEach(doc=> {
        str += '<div class="btn-leaderboard1" style="background:#002d63; color:#fff;">';
        str += '<div style="width:70%;float: left;line-height: 1.2;"><b>'+doc.data().EmpName+'</b></div>';
        str += '<div class="leader-rank"><div class="Rainking-number" style="color:#f68b1f;"></div><div style="font-size:10px;color:#fff;">อันดับ</div></div>';
        str += '<div class="leader-rank"><div class="Rainking-number" style="color:#f68b1f;">'+addCommas(doc.data().UserPoint)+'</div><div style="font-size:10px;color:#fff;">คะแนน</div></div>';
        str += '</div>';        
    });
    $("#DisplayUserRanking").html(str);
  });
}





function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
*/