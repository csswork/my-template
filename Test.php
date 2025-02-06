<?php
require_once(__DIR__ . '/vendor/autoload.php');
// use Volc\Service\Iam;
use Volc\Service\Visual;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$client = Visual::getInstance();
$client->setAccessKey($_ENV['API_KEY']);
$client->setSecretKey($_ENV['API_SECRET']);

$body= [
   "req_key"=> "high_aes_general_v21_L",
   "prompt"=> "千军万马",
   "model_version"=> "general_v2.1_L",
   "seed"=> -1,
   "scale"=> 3.0,
   "ddim_steps"=> 25,
   "width"=> 512,
   "height"=> 512,
   "use_rephraser"=> true,
   "return_url"=>true
];

// $client->setHost("https://visual.volcengineapi.com");
// $client->setRegion("cn-north-1");
// $client->setService("cv");
// $client->setContentType("application/json");
// $client->setApi("CVProcess", "2022-08-31");
// $response = $client->CallAPI("CVProcess", ['form_params' => $body]);

// $response = $client->HighAesSmartDrawing(['json' => $body]);
// $response = str_replace('\u0026', '&', $response);

$response = $client->CVProcess(['json' => $body]);
$response = str_replace('\u0026', '&', $response);
echo $response;
?>