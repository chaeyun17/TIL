var selSubjects = [];         // Q1 과목 종류 선택 => studnet.grade[value]
var mySchool = new School();  // 학생 객체 관리 스쿨 객체 생성

function q1_submit(){
  // 0. 이전 입력한 과목들 초기화
  selSubjects = [];
  // 1. 정보 저장;
  $.each($("#q1_subject .optionGrp LABEL INPUT:checked"),function(){
    selSubjects.push($(this).val());
  });
  // 2. 다음 꺼 보이기
  $("#q2_studentNum").removeClass("hidden");
}

function q2_submit(){
  //0. 이전 정보 초기화
  var selStudentsNum = 0;
  //1. 정보 저장
  selStudentsNum =  $("#q2_input").val();
  //2. 학생 이름 입력할 input 생성
  for(var stNum=0; stNum<selStudentsNum; stNum++){
    var inputHTML = $("<input/>").attr("type","text").attr("size","5");
    inputHTML.addClass("q3_inputs");
    // debugger;
    $("#q3_studentName .optionGrp").append(inputHTML);
  }
  //3. 다음 꺼 보이기
  $("#q3_studentName").removeClass("hidden");
}

function q3_submit(){
  // 초기화
  mySchool.studentsList = [];
  if($("#q4_subjectScore .optionGrp table")) $("#q4_subjectScore .optionGrp table").remove();
  // 학생 이름 불러와서, 학생 객체 저장
  $.each($(".q3_inputs"), function(index, inputEle){
    var student = new Student(inputEle.value);
    // 과목 저장
    $.each(selSubjects, function(index, subject){
      student.gradeObj[subject] = 0;
    });
    mySchool.pushStudent(student);
  });

  // q4 성적 입력 테이블 제작
  var q4Table = $("<table></table>");
  var thHtml = "<th>구분</th>";
  $.each(selSubjects, function(index, subjectName){
    thHtml += "<th>" + subjectName +"</th>";
  });
  var firstRow = $("<tr></tr>").html(thHtml);
  q4Table.append(firstRow);

  // 학생 행 제작
  $.each(mySchool.studentsList, function(studentIndex, studentObj){
    var tdHtml = "<th>" + studentObj.name +"</th>";
    $.each(selSubjects, function(subjectIndex, subjectName){
      var inputHtml = "<input type='text' size='3'/>";
      tdHtml += "<td>"+ inputHtml +"</td>";
    });
    var trEle = $("<tr></tr>").html(tdHtml);
    q4Table.append(trEle);
  });
  $("#q4_subjectScore .optionGrp").append(q4Table);
  $("#q4_subjectScore").removeClass("hidden");
}

function q4_submit(){
  // 초기화
  $.each(mySchool.studentsList, function(stindex, student){
    $.each(student.gradeObj, function(subject, score){
      student.gradeObj[subject] = 0;
    });
  });
  if($("#q5_grade .optionGrp table")) $("#q5_grade .optionGrp table").remove();

  // 학생 객체에 과목과 성적 저장
  // 학생수만큼 반복. 안에 과목 수 만큼 반복
  $.each(mySchool.studentsList,function(stIndex, student){
    var inputIndex = 0;
    $.each(student.gradeObj, function(subject, score){
      var tr =  $("#q4_subjectScore .optionGrp table tr").eq(stIndex+1);
      var inputScore = tr.find("input").eq(inputIndex).val();
      student.gradeObj[subject] = Number(inputScore);
      inputIndex = inputIndex + 1;
    });
  });
  // q5 결과 테이블 생성
  var q5Table = $("<table></table>");
  var thHtml = "<th>구분</th>";
  for(var sjIndex=0; sjIndex<selSubjects.length; sjIndex++){
    thHtml += "<th>"+ selSubjects[sjIndex] + "</th>";
  }
  thHtml += "<th>합계</th><th>평균</th><th>그래프</th>";
  q5Table.append($("<tr></tr>").html(thHtml));
  $.each(mySchool.studentsList, function(stIndex, student){
    var tdHtml = "<th>"+student.name+"</th>";
    $.each(student.gradeObj, function(subject, score){
      tdHtml += "<td>"+score+"</td>";
    });
    tdHtml += "<td>"+student.getTotal()+"</td><td>"+student.getAverage()+"</td>";
    tdHtml += "<td><div class='graph'>"+ student.getAverage() +"</div></td>";
    q5Table.append($("<tr></tr>").html(tdHtml));
    $("#q5_grade .optionGrp").append(q5Table);
    $("#q5_grade").removeClass("hidden");

    // 그래프 그리기
    $.each($(".graph"), function(index, graphEle){
      $(".graph").eq(index).animate({
        width: graphEle.innerText+"px"
      },"slow");
      graphEle.innerText = "";
    });

  });
}
