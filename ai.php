<?php
require_once(__DIR__ . '/vendor/autoload.php');

use Volc\Service\Visual;

class ImageGenerator {
    private $client;
    private $defaultBody;

    public function __construct() {
        // Load environment variables
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        // Initialize client
        $this->client = Visual::getInstance();
        $this->client->setAccessKey($_ENV['API_KEY']);
        $this->client->setSecretKey($_ENV['API_SECRET']);

        // Set default parameters
        $this->defaultBody = [
            // "req_key" => "high_aes_general_v21_L",
            // "model_version" => "general_v2.1_L",
            // "seed" => -1,
            // "scale" => 3.0,
            // "ddim_steps" => 25,
            // "width" => 512,
            // "height" => 512,
            // "use_rephraser" => true,
            // "return_url" => true
        ];
    }

    public function generateImage($requestData = []) {
        try {
            // Merge request data with default body
            $body = array_merge($this->defaultBody, $requestData);

            // print_r($body);
            // exit;
            
            // Process image
            $response = $this->client->CVProcess(['json' => $body]);
            $response = str_replace('\u0026', '&', $response);
            
            return json_decode($response, true);
        } catch (Exception $e) {
            return [
                'error' => true,
                'message' => $e->getMessage()
            ];
        }
    }
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $requestData = json_decode(file_get_contents('php://input'), true);
    
    $generator = new ImageGenerator();
    $result = $generator->generateImage($requestData);
    
    echo json_encode($result);
}