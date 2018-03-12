<?php
  // 댓글 정보 변수 저장
  $comJson = $_POST['comment'];
  $comAry = json_decode($comJson,true);
  $comAry["채윤"] = "안녕하세요.";
  $comAry["수정"] = "하트하트";
  $comAry["john"] = "heee";

  $comjs = json_encode($comAry);
  echo $comjs;

 ?>
