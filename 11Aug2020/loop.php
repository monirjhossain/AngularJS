<?php
   function func($arg)  {
  $result = 0;
  for($i=0; $i<$arg; $i++) {
    $result = $result + $i;
    //echo "No-".$i." time loop: result value=".$result.",and i=".$i."<br>";
    }
  return $result;
}
echo func(5); 
?>