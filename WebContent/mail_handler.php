<?php

$firstName = $_POST["firstName"];
$lastName = $_POST["lastName"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$tech = $_POST["tech"];
$service = $_POST["service"];
$date = $_POST["date"];
$time = $_POST["time"];

$headers = 'From: preciousnailspaleesburg@gmail.com' . "\r\n" .
    'Reply-To: preciousnailspaleesburg@gmail.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();


$businessName = "Precious Nail & Spa";
$subject = "{$businessName} Online Reservation";


$toManager      = 'preciousnailspaleesburg@gmail.com';	
$messageManager = "Store Manager". "\r\n" ."{$firstName} {$lastName} has request a {$service} from $tech at {$time} on {$date}. {$firstName} can be contacted at {$email} or {$phone}";
$messageTech = "Technician". "\r\n" ."{$firstName} {$lastName} has request a {$service} at {$time} on {$date}. {$firstName} can be contacted at {$email} or {$phone}";

#to email determine by technician and shop manager
mail($toManager, $subject, $messageManager, $headers); 


//copy me for debugging
mail('jason.huy.lam@gmail.com', $subject, $messageManager, $headers); 
/* to mail to tech
$toTech = $toManager;

if(strcmp($tech, "Kathy") == 0){
    $toTech = "preciousnailspaleesburg@gmail.com";
}else if(strcmp($tech, "Tiffany") == 0){
    $toTech = "jaosn.huy.lam@gmail.com";
}
    

mail($toTech, $subject, $messageTech, $headers); 
*/


//mail to cusotmer
$messageCustomer = "Your appointment request has been received. If there is any conflict, you will be contacted shortly. Otherwise, see you on {$date} at {$time}";

mail($email, $subject, $messageCustomer, $headers);
//$fromemail = "info@corvusanalytics.com";
//	$fromname = "Corvus Online Booking";

?>
