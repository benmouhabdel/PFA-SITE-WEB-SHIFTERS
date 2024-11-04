<?php

namespace App\Http\Helpers;

use Illuminate\Http\JsonResponse;

class Helper
{
    /**
     * Send error response.
     *
     * @param string $message
     * @param array $data
     * @return JsonResponse
     */
    public static function sendError($error, $errors = [])
{
    return response()->json([
        'success' => false,
        'message' => $error,
        'errors' => $errors
    ], 400);
}

}
