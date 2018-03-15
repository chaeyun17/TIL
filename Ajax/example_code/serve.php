<?php
/*
1. Ajax 통신을 통해 얻은 JSON 데이터를 $comJson에 저장한다.
2. JSON을 연관배열 형태로 변환한다.
3. Dummy data을 배열에 추가한다.
4. 배열을 JSON 포맷으로 변환한다.
5. 전송한다
*/
  $comJson = $_POST['comment'];
  $comAry = json_decode($comJson,true); // JSON을 연관배열로 전환

  // dummy data 추가
  $comAry["채윤"] = "안녕하세요.";
  $comAry["수정"] = "하트하트";
  $comAry["john"] = "heee";

  // 배열을 JSON으로 전환
  $comjs = json_encode($comAry);

  // 전송
  echo $comjs;

 ?>
