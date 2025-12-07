<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class GegemiController extends Controller
{
    public function GetResult(Request $request)
    {
        set_time_limit(0); // Cho phép chạy lâu hơn, nhưng không nên để vô hạn thực tế

        $historyIdUpdate = $request->input("historyId");
        $question = $request->input("question");

        // Cho phép cấu hình host AI qua env, mặc định dùng tên service trong Docker
        $aiApiBaseUrl = env('AI_API_URL', 'http://gegemi-app:3030');
        $updateAiApiUrl = env('UPDATE_AI_API_URL', 'http://api:9012');
        $aiApiUrl = $aiApiBaseUrl."/api/skin/analysisAI";
        $updateHistoryUrl = $updateAiApiUrl."/api/update_resultAI";

        $aiTimeout = (int) env('AI_API_TIMEOUT', 60);
        $aiConnectTimeout = (int) env('AI_API_CONNECT_TIMEOUT', 5);

        $client = new Client([
            // Cho phép cấu hình timeout qua env để dễ tinh chỉnh
            'timeout' => $aiTimeout,
            'connect_timeout' => $aiConnectTimeout,
        ]);

        try {
            $start = microtime(true);
            // Gọi AI Server
            $res = $client->post($aiApiUrl, [
                'json' => ['question' => $question],
            ]);
            $elapsed = round((microtime(true) - $start) * 1000);

            if ($res->getStatusCode() === 200) {
                $aiResult = $res->getBody()->getContents();
                Log::info("[AI] analysis done in {$elapsed}ms, len=" . strlen($aiResult));

                // Gửi kết quả AI sang server lưu lịch sử
                try {
                    $client->post($updateHistoryUrl, [
                        'json' => [
                            'historyId' => $historyIdUpdate,
                            'resultAI' => $aiResult,
                        ],
                    ]);
                } catch (RequestException $e) {
                    Log::warning("⚠️ Không thể cập nhật kết quả AI: " . $e->getMessage());
                   
                }

                return response($aiResult, 200);
            }

            return response()->json(['error' => 'AI server trả kết quả không hợp lệ'], 502);

        } catch (RequestException $e) {
            $body = $e->hasResponse() ? $e->getResponse()->getBody()->getContents() : '';
            Log::error("❌ Lỗi kết nối tới AI server: " . $e->getMessage() . " body=" . $body);
            return response()->json([
                'error' => 'Không thể kết nối đến server AI (timeout hoặc lỗi mạng) '.$e->getMessage(),
            ], 504); // Gateway Timeout

        } catch (\Throwable $e) {
            Log::critical("💥 Lỗi hệ thống trong GetResult: " . $e->getMessage());
            return response()->json([
                'error' => 'Đã xảy ra lỗi hệ thống không xác định.',
            ], 500);
        }
    }
}
