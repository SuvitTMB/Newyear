var _0x317b60=_0x2b46;(function(_0x454fcd,_0x455dd8){var _0x3b79b4=_0x2b46,_0x1af20a=_0x454fcd();while(!![]){try{var _0x39b4e2=-parseInt(_0x3b79b4(0x1c0))/0x1+-parseInt(_0x3b79b4(0x19e))/0x2+parseInt(_0x3b79b4(0x19d))/0x3*(-parseInt(_0x3b79b4(0x18d))/0x4)+parseInt(_0x3b79b4(0x1c5))/0x5*(parseInt(_0x3b79b4(0x1a3))/0x6)+-parseInt(_0x3b79b4(0x18e))/0x7+-parseInt(_0x3b79b4(0x196))/0x8+parseInt(_0x3b79b4(0x192))/0x9*(parseInt(_0x3b79b4(0x1bd))/0xa);if(_0x39b4e2===_0x455dd8)break;else _0x1af20a['push'](_0x1af20a['shift']());}catch(_0x418f0e){_0x1af20a['push'](_0x1af20a['shift']());}}}(_0x11cb,0x4945a));var dateString=new Date()[_0x317b60(0x1ba)](_0x317b60(0x193),{'timeZone':_0x317b60(0x1ad)}),today=new Date(),dd=String(today['getDate']())[_0x317b60(0x1a1)](0x2,'0'),mm=String(today[_0x317b60(0x1bf)]()+0x1)[_0x317b60(0x1a1)](0x2,'0'),yyyy=today[_0x317b60(0x1b6)]()+0x21f;today=dd+'/'+mm+'/'+yyyy;function _0x11cb(){var _0x3df9bf=['</b>\x20รายการ</div>','href','1:653667385625:web:a5aed08500de80839f0588','QuizFalse','ShowGift','News','getFullYear','EndStock','display','AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE','toLocaleString','retailproject-6f4fc.firebaseapp.com','firestore','6501610LoGizC','id02','getMonth','354639bVqmYv','653667385625','LineID','setItem','Gift2023Rewards','185DUmDzJ','332ayMxDu','2067758ETZoiB','where','block','DisplayStock','18SnZbnv','en-US','<div\x20class=\x22stock\x22>ของขวัญคงเหลือ\x20:\x20<b>','ResultQuiz','2341288KIwcOv','initializeApp','none','ready','style','loading','getItem','537Gmbvfd','447972BhLYYB','G-9SKTRHHSW9','getElementById','padStart','id01','29406gTghCi','#DisplayStock','True','retailproject-6f4fc','then','forEach','QuizDate','CheckNews','index.html','Gift2023log','Asia/Jakarta','collection','EmpID_Gift2023'];_0x11cb=function(){return _0x3df9bf;};return _0x11cb();}var xCheck=0x0,xStock=0x0;$(document)[_0x317b60(0x199)](function(){var _0x36bdb0=_0x317b60;sessionStorage[_0x36bdb0(0x19c)](_0x36bdb0(0x1af))==null&&(location[_0x36bdb0(0x1b1)]=_0x36bdb0(0x1ab)),sessionStorage[_0x36bdb0(0x19c)](_0x36bdb0(0x1aa))==null&&(document['getElementById'](_0x36bdb0(0x1be))[_0x36bdb0(0x19a)][_0x36bdb0(0x1b8)]=_0x36bdb0(0x190),sessionStorage[_0x36bdb0(0x1c3)](_0x36bdb0(0x1aa),_0x36bdb0(0x1b5))),Connect_DB();});function _0x2b46(_0x83f435,_0x111971){var _0x11cbda=_0x11cb();return _0x2b46=function(_0x2b46e2,_0x6f69bd){_0x2b46e2=_0x2b46e2-0x18d;var _0x1de509=_0x11cbda[_0x2b46e2];return _0x1de509;},_0x2b46(_0x83f435,_0x111971);}function Connect_DB(){var _0x536787=_0x317b60,_0x630e0e={'apiKey':_0x536787(0x1b9),'authDomain':_0x536787(0x1bb),'projectId':_0x536787(0x1a6),'storageBucket':'retailproject-6f4fc.appspot.com','messagingSenderId':_0x536787(0x1c1),'appId':_0x536787(0x1b2),'measurementId':_0x536787(0x19f)};firebase[_0x536787(0x197)](_0x630e0e),dbGift2023Rewards=firebase[_0x536787(0x1bc)]()[_0x536787(0x1ae)](_0x536787(0x1c4)),dbGift2023log=firebase[_0x536787(0x1bc)]()['collection'](_0x536787(0x1ac)),CheckStock(),CheckQuiz();}function CheckStock(){var _0x1660f0=_0x317b60,_0x2e58de='';dbGift2023Rewards[_0x1660f0(0x18f)](_0x1660f0(0x1c2),'==','')['get']()[_0x1660f0(0x1a7)](_0x13e04d=>{var _0x1542ba=_0x1660f0;_0x13e04d[_0x1542ba(0x1a8)](_0x4dd820=>{xStock=xStock+0x1;}),document['getElementById'](_0x1542ba(0x191))[_0x1542ba(0x19a)]['display']=_0x1542ba(0x190),_0x2e58de=_0x1542ba(0x194)+xStock+_0x1542ba(0x1b0),$(_0x1542ba(0x1a4))['html'](_0x2e58de);});}function CheckQuiz(){var _0xe64dfa=_0x317b60;dbGift2023log['where'](_0xe64dfa(0x1c2),'==',sessionStorage[_0xe64dfa(0x19c)](_0xe64dfa(0x1c2)))[_0xe64dfa(0x18f)](_0xe64dfa(0x195),'==',_0xe64dfa(0x1a5))['get']()['then'](_0x2a2904=>{var _0x142235=_0xe64dfa;_0x2a2904[_0x142235(0x1a8)](_0x16cd66=>{var _0x7a915e=_0x142235;xCheck=0x1,document[_0x7a915e(0x1a0)](_0x7a915e(0x19b))['style']['display']=_0x7a915e(0x198),document['getElementById'](_0x7a915e(0x191))[_0x7a915e(0x19a)][_0x7a915e(0x1b8)]=_0x7a915e(0x190),xStock!=0x0?document[_0x7a915e(0x1a0)](_0x7a915e(0x1b4))[_0x7a915e(0x19a)][_0x7a915e(0x1b8)]=_0x7a915e(0x190):document[_0x7a915e(0x1a0)](_0x7a915e(0x1b7))[_0x7a915e(0x19a)]['display']=_0x7a915e(0x190);}),xCheck==0x0&&CheckQuizDate();});}function CheckQuizDate(){var _0x54782e=_0x317b60,_0x6b73ce=0x0;dbGift2023log[_0x54782e(0x18f)](_0x54782e(0x1c2),'==',sessionStorage[_0x54782e(0x19c)](_0x54782e(0x1c2)))[_0x54782e(0x18f)](_0x54782e(0x1a9),'==',today)['get']()[_0x54782e(0x1a7)](_0xbcd2af=>{var _0x382975=_0x54782e;_0xbcd2af[_0x382975(0x1a8)](_0x18947e=>{var _0x175023=_0x382975;_0x6b73ce=0x1,document[_0x175023(0x1a0)]('loading')[_0x175023(0x19a)][_0x175023(0x1b8)]=_0x175023(0x198),xStock!=0x0?document['getElementById'](_0x175023(0x1b3))['style'][_0x175023(0x1b8)]=_0x175023(0x190):document[_0x175023(0x1a0)](_0x175023(0x1b7))[_0x175023(0x19a)][_0x175023(0x1b8)]=_0x175023(0x190);}),_0x6b73ce==0x0&&(CheckQuizDate(),document['getElementById'](_0x382975(0x19b))['style'][_0x382975(0x1b8)]='none',xStock!=0x0?document[_0x382975(0x1a0)]('Question')[_0x382975(0x19a)][_0x382975(0x1b8)]=_0x382975(0x190):document['getElementById'](_0x382975(0x1b7))['style'][_0x382975(0x1b8)]=_0x382975(0x190));});}function CloseAll(){var _0x43762a=_0x317b60;document[_0x43762a(0x1a0)](_0x43762a(0x1a2))[_0x43762a(0x19a)][_0x43762a(0x1b8)]=_0x43762a(0x198),document['getElementById'](_0x43762a(0x1be))[_0x43762a(0x19a)][_0x43762a(0x1b8)]=_0x43762a(0x198);}
