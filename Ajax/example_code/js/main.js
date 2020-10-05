/*
1. submit 버튼을 누르면, 이벤트 발생
2. 댓글 입력 데이터들을 JSON 포맷으로 저장
3. JQuery Ajax 통신 설정 후, AJAX 통신
4. 통신 에러 시, ajaxError 함수 실행
5. 통신 성공 시, input 태그 입력 값들을 초기화 한다. 그리고 전송받은 데이터들을 html로 출력한다.
*/


$("#comment_submit").on("click", commentAjax );

function commentAjax(){
  var data = commentToJson();
  // AJAX 통신
  $.ajax({
    method: "POST",
    url: "./serve.php",
    dataType: "json",
    data: {
      "comment": data
    },
    success: AjaxSuccess,
    error: AjaxError,
  });
}
function commentToJson(){
  var jsonAjax = {}; // Ajax로 보낼 데이터
  // 댓글 데이터 객체 생성
  var commentObj = {};
  commentObj[$("#comment_name").val()] = $("#comment_txt").val();
  // JSON 형태로 변경
  jsonAjax = JSON.stringify(commentObj);
  return jsonAjax;
}


function AjaxError(jqXHR, textStatus, errorThrown) {
  alert(errorThrown + " : " + textStatus);
}
function AjaxSuccess(msg, textstatus, jqXHR){
  console.log(textstatus + ' : ' + msg);
  console.log(msg);

  // 입력창 초기화
  $("#comment_name").val("");
  $("#comment_txt").val("");
  $(".tr").remove(); // 기존 데이터 삭제

  // 출력
  var list = '<tbody class="result">';
  for (var key in msg) {
    list += "<tr class=\"tr\">";
    list += "<td>" + key + "</td><td>" + msg[key] + "</td>";
    list += "</tr>";
  }
  list += "</tbody>";
  $("table").append(list);
}
