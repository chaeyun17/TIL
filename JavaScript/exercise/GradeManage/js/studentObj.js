function Student(name){
   this.name = name;
   this.gradeObj = {}; // subject: scroe

  // 성적:점수 gradeObj에 입력
  // 매개변수: 과목명, 점수
  this.pushGrade = function(subject, score){
    this.gradeObj[subject] = score;
  };

  // 성적 합계 계산
  // 리턴: 점수합계(number)
  this.getTotal = function(){
    var resultTotal = 0;
    for(var key in this.gradeObj){
      resultTotal = resultTotal + this.gradeObj[key];
    }
    return resultTotal;
  };

  // 과목 수 계산
  // 리턴: 과목수(number)
  this.getSubjectNum = function(){
    var size = 0;
    var obj = this.gradeObj;
    for(var key in obj){
      if(obj.hasOwnProperty(key)) size = size + 1;
    }
    return size;
  };

  // 성적 평균 계산
  // 리턴: 평균점수(number 소수점)
  this.getAverage = function(){
    var resultAve = 0;
    var totalScore = this.getTotal();
    var subjectsNum = this.getSubjectNum();
    resultAve = totalScore / subjectsNum;
    return resultAve;
  };

}

// 학생부 객체:: 학생객체들을 배열에 넣어서 관리
function School(){
  this.studentsList = [];
  this.number = 0;

  // 학생 객체 추가
  // 매개변수: 학생 객체(object)
  // 학생 객체를 studentsList에 추가하고, 길이를 number에 갱신한다
  this.pushStudent = function(studentObj){
    this.number = this.studentsList.push(studentObj);
  };
}
