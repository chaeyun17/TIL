var selSubjects = [];         // Q1 과목 종류 선택 => studnet.grade[value]
var selStudentsNum = 0;       // Q2 학생 수
var selStudentNames = [];     // Q3 학생 이름 리스트 => student.name
var mySchool = new School();  // 학생 객체 관리 스쿨 객체 생성

function q1_submit(){
  // 0. 이전 입력한 과목들 초기화
  selSubjects = [];
  // 1. 정보 저장
  var checkInputs = document.querySelectorAll("#q1_subject .optionGrp LABEL INPUT");
  for(var i=0; i<checkInputs.length; i++){
    if(checkInputs[i].checked){
      selSubjects.push(checkInputs[i].value);
    }
  }
  console.log("q1,selSubjects::", selSubjects);

  // 2. 다음 큐 나타내기
  var q2 = document.querySelector("#q2_studentNum");
  q2.classList.remove("hidden");
}


function q2_submit(){
  // 0. 이전 정보들 초기화
  selStudentsNum = 0;

  // 1. 정보 저장
  var q2Input = document.querySelector("#q2_input");
  selStudentsNum = q2Input.value;
  console.log("q2,selStudentsNum::", selStudentsNum);

  // 2. 큐3 생성 후, 나타내기
  // 학생 이름 입력 폼, 학생 수에 따라 input 생성
  var q3 = document.querySelector("#q3_studentName");
  var q3optionGrp = q3.querySelector(".optionGrp");
  var inputHTML = "";
  for(var i=0; i<selStudentsNum; i++){
    inputHTML = inputHTML + "<input class='q3_inputs' type='text' size='5' placeholder='이름"+(i+1)+"'/>";
  }
  q3optionGrp.innerHTML = inputHTML;

  q3.classList.remove("hidden");
}

function q3_submit(){
  // 0. 이전 정보 초기화
  selStudentNames = [];
  mySchool.studentsList = [];
  mySchool.number = 0;
  var q4_table = document.querySelector("#q4_table");
  if(q4_table) q4_table.parentNode.removeChild(q4_table);

  // 1. 정보 저장
  // 학생 이름을 배열에 저장
  var q3Inputs = document.querySelectorAll(".q3_inputs");
  for(var i=0; i<q3Inputs.length; i++){
    selStudentNames.push(q3Inputs[i].value);
  }
  console.log("q3, selStudentNames ::", selStudentNames);

  // 2. 학생 객체에 저장
  // 2-1. 학생 객체 생성
  for(var j=0; j<selStudentNames.length; j++){
    var myStudent = new Student(selStudentNames[j]);
    mySchool.pushStudent(myStudent);  // 밑으로 옮겨야할지도?

    // 2-2. 학생 객체에 과목 추가
    for(var subNum=0; subNum<selSubjects.length; subNum++){
      myStudent.gradeObj[selSubjects[subNum]] = 0;
    }
  }
  console.log("mySchool ::", mySchool);

  // 3. q4. 점수 입력 html 테이블 만들기
  var q4_table = document.createElement("TABLE");
  q4_table.id="q4_table";
  // 3-1. 첫번째 행 만들기
  var headRow = document.createElement("TR");
  var headRowTh = "<th>구분</th>";
  for(var k=0; k<selSubjects.length; k++){
    headRowTh += "<th>" + selSubjects[k] +"</th>";
  }
  headRow.innerHTML = headRowTh;
  q4_table.appendChild(headRow); // 첫번째 행 넣기
  // 3-2. 학생 행들 만들기
  for(var stNum=0; stNum<mySchool.number; stNum++){
    var studentTemp = mySchool.studentsList[stNum];   // 한 학생
    var subjectLen = studentTemp.getSubjectNum();     // 과목 수
    var stRow = document.createElement("TR");         // 한 학생 tr
    var stTD = "<th>" + studentTemp.name + "</th>";   // 첫번째 td: 학생이름
    // td 만들기
    for(var sjNum=0; sjNum<subjectLen; sjNum++){
        stTD += '<td><input class="q4_input" type="text" size="3"></td>';
    }
    stRow.innerHTML = stTD;       // 학생 row 에 td들 넣기
    q4_table.appendChild(stRow);  // 학생 row를 q4_table에 넣기
  }
  var q4_optionGrp = document.querySelector("#q4_subjectScore .optionGrp");
  q4_optionGrp.appendChild(q4_table); // DOM에 테이블 삽입

  // 4. Q4 보이기
  document.querySelector("#q4_subjectScore").classList.remove("hidden");
}

function q4_submit(){
  // 0. 초기화
  var q5_table = document.querySelector("#q5_table");
  if(q5_table) q5_table.parentNode.removeChild(q5_table);

  // 1. 입력한 성적을 학생 객체에 저장
  var q3_table = document.querySelector("#q4_table");
  var q3_trs = q3_table.querySelectorAll("tr");
  // 1-1. 한 행씩, 학생 객체에 점수 저장
  for(var trNum=1; trNum<q3_trs.length; trNum++){
    var studentOne = mySchool.studentsList[trNum-1];
    var q3_td_inputs = q3_trs[trNum].querySelectorAll("td input");
    // 1-2. 한 td value 씩, 한 과목 score로 넣기
    var tdNum=0;
    for(var subject in studentOne.gradeObj){
      studentOne.gradeObj[subject] = Number(q3_td_inputs[tdNum].value);
      tdNum ++;
    }
  }
  console.log("성적을 학생 객체에 저장 :: ", mySchool);

  // 2. 결과 테이블 생성
  var q5_table = document.createElement("table");
  q5_table.id="q5_table";
  // 2-1. 첫번째 행 만들기
  var headRow = document.createElement("TR");
  var headRowTh = "<th>구분</th>";
  for(var subjNum=0; subjNum<selSubjects.length; subjNum++){
    headRowTh += "<th>" + selSubjects[subjNum] +"</th>";
  }
  headRowTh += "<th>합계</th>";
  headRowTh += "<th>평균</th>";
  headRowTh += "<th>그래프</th>";
  headRow.innerHTML = headRowTh;
  q5_table.appendChild(headRow); // 첫번째 행 넣기
  // 2-2. 학생 행들 만들기
  for(var stNum=0; stNum<mySchool.number; stNum++){
    var studentTemp = mySchool.studentsList[stNum];   // 한 학생
    var subjectLen = studentTemp.getSubjectNum();     // 과목 수
    var stRow = document.createElement("TR");         // 한 학생 tr
    var stTD = "<th>" + studentTemp.name + "</th>";   // 첫번째 td: 학생이름
    // td 만들기
    for(var subject in studentTemp.gradeObj){
      stTD += "<td>"+ studentTemp.gradeObj[subject] +"</td>";
    }
    // 합계, 평균 td 추가
    stTD += "<td>" + studentTemp.getTotal() +"</td>";
    stTD += "<td>" + studentTemp.getAverage() +"</td>";
    //그래프 Div 넣기
    stTD += "<td><div class='graph'>"+studentTemp.getAverage()+"</div></td>";
    stRow.innerHTML = stTD;       // 학생 row 에 td들 넣기
    q5_table.appendChild(stRow);  // 학생 row를 q5_table에 넣기
  }
  var q5_optionGrp = document.querySelector("#q5_grade .optionGrp");
  // 3. 테이블을 DOM 넣기
  q5_optionGrp.appendChild(q5_table); // DOM에 테이블 삽입
  // 4. Q5 보이기
  document.querySelector("#q5_grade").classList.remove("hidden");

  // 5. 에니메이션 속성 넣기
  // var graphNodes = document.querySelectorAll(".graph");
  for(var grNum=0; grNum<$(".graph").length; grNum++){
    var stAvg = $(".graph").eq(grNum).html();
    $(".graph").eq(grNum).html("");

    $(".graph").eq(grNum).animate({
      width: stAvg
    },"slow");

  }

}
