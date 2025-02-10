<?php
require_once(__DIR__ . '/vendor/autoload.php');

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class VolcEngine {
    private $ak;
    private $sk;
    private $service = 'cv';
    private $version = '2022-08-31';
    private $region = 'cn-north-1';
    private $host = 'visual.volcengineapi.com';
    private $contentType = 'application/json';
    private $defaultBody = [
      //   'req_key' => 'high_aes_general_v21_L',
      //   'return_url' => true
    ];

    public function __construct() {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        
        $this->ak = $_ENV['API_KEY'];
        $this->sk = $_ENV['API_SECRET'];
    }

    private function request($method, $query, $header, $action, $body) {
        $credential = [
            'accessKeyId' => $this->ak,
            'secretKeyId' => $this->sk,
            'service' => $this->service,
            'region' => $this->region,
        ];

        $query = array_merge($query, [
            'Action' => $action,
            'Version' => $this->version
        ]);
        ksort($query);
        
        $requestParam = [
            'body' => $body,
            'host' => $this->host,
            'path' => '/',
            'method' => $method,
            'contentType' => $this->contentType,
            'date' => gmdate('Ymd\THis\Z'),
            'query' => $query
        ];

        // Calculate signature
        $signResult = $this->calculateSignature($requestParam, $credential);
        $header = array_merge($header, $signResult);

        return $this->sendRequest($requestParam, $header);
    }

    private function calculateSignature($requestParam, $credential) {
        $xDate = $requestParam['date'];
        $shortXDate = substr($xDate, 0, 8);
        $xContentSha256 = hash('sha256', $requestParam['body']);
        
        $signResult = [
            'Host' => $requestParam['host'],
            'X-Content-Sha256' => $xContentSha256,
            'X-Date' => $xDate,
            'Content-Type' => $requestParam['contentType']
        ];

        $signedHeaderStr = join(';', ['content-type', 'host', 'x-content-sha256', 'x-date']);
        $canonicalRequestStr = $this->buildCanonicalRequest($requestParam, $xContentSha256, $xDate);
        
        $hashedCanonicalRequest = hash('sha256', $canonicalRequestStr);
        $credentialScope = join('/', [$shortXDate, $credential['region'], $credential['service'], 'request']);
        $stringToSign = join("\n", ['HMAC-SHA256', $xDate, $credentialScope, $hashedCanonicalRequest]);
        
        // Generate signature
        $kDate = hash_hmac('sha256', $shortXDate, $credential['secretKeyId'], true);
        $kRegion = hash_hmac('sha256', $credential['region'], $kDate, true);
        $kService = hash_hmac('sha256', $credential['service'], $kRegion, true);
        $kSigning = hash_hmac('sha256', 'request', $kService, true);
        $signature = hash_hmac('sha256', $stringToSign, $kSigning);
        
        $signResult['Authorization'] = sprintf('HMAC-SHA256 Credential=%s, SignedHeaders=%s, Signature=%s', 
            $credential['accessKeyId']. '/'. $credentialScope, 
            $signedHeaderStr, 
            $signature
        );
        
        return $signResult;
    }

    private function buildCanonicalRequest($requestParam, $xContentSha256, $xDate) {
        return join("\n", [
            $requestParam['method'],
            $requestParam['path'],
            http_build_query($requestParam['query']),
            join("\n", [
                'content-type:'. $requestParam['contentType'],
                'host:'. $requestParam['host'],
                'x-content-sha256:'. $xContentSha256,
                'x-date:'. $xDate
            ]),
            '',
            'content-type;host;x-content-sha256;x-date',
            $xContentSha256
        ]);
    }

    private function sendRequest($requestParam, $header) {
        $client = new Client([
            'base_uri' => 'https://'. $requestParam['host'],
            'timeout' => 120.0,
        ]);

        $response = $client->request($requestParam['method'], 
            'https://'. $requestParam['host']. $requestParam['path'], 
            [
                'headers' => $header,
                'query' => $requestParam['query'],
                'body' => $requestParam['body']
            ]
        );

        $responseContent = $response->getBody()->getContents();
        return str_replace('\u0026', '&', $responseContent);
    }

    public function processImage($requestData = []) {
        try {
            // Merge default body with request data
            $requestBody = array_merge($this->defaultBody, $requestData);
            $body = json_encode($requestBody);

            
            return $this->request('POST', [], [], 'CVProcess', $body);
        } catch (GuzzleException $e) {
            return json_encode([
                'error' => true,
                'message' => $e->getMessage()
            ]);
        }
    }
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   header('Content-Type: application/json');

   // Get POST data
   $postData = json_decode(file_get_contents('php://input'), true);

   // debug data
   // die(json_encode($postData));

   // Initialize API and process request
   $api = new VolcEngine();
   echo $api->processImage($postData);
   exit;
}