<?php 
    header("Content-Type: application/json; charset:UTF-8");
    $_DATA = json_decode(file_get_contents("php://input"), true);

    $METHOD = $_SERVER["REQUEST_METHOD"];
    $result=[];
    foreach ($_DATA as $key => $value) {
        if(!is_numeric($value)){
            $result= ["resultado" =>"El dato debe ser numerico"];
            break;
        }else{
            $result= ["resultado" =>validar($value)];
        }
    }

    function validar($num){
        if($num>=0){
            if($num%2==0){
                return 'par';
            }else{
                return 'impar';
            }
        }else{
            return 'El dato a evaluar no puede ser negativo';
        }
    }
    echo  json_encode($result, JSON_PRETTY_PRINT);
?>