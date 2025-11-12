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

        $aiApiUrl = "http://45.76.161.30:3030/api/skin/analysisAI";
        $updateHistoryUrl = "https://api-ai.exomiyo.com/api/update_resultAI";

        $client = new Client([
            'timeout' => 30, // ⏱ Timeout cho mỗi request
        ]);

        try {
            // Gọi AI Server
            $res = $client->post($aiApiUrl, [
                'json' => ['question' => $question],
            ]);

            if ($res->getStatusCode() === 200) {
                $aiResult = $res->getBody()->getContents();

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
            Log::error("❌ Lỗi kết nối tới AI server: " . $e->getMessage());
            return response()->json([
                'error' => 'Không thể kết nối đến server AI (timeout hoặc lỗi mạng)',
            ], 504); // Gateway Timeout

        } catch (\Throwable $e) {
            Log::critical("💥 Lỗi hệ thống trong GetResult: " . $e->getMessage());
            return response()->json([
                'error' => 'Đã xảy ra lỗi hệ thống không xác định.',
            ], 500);
        }
    }
}
