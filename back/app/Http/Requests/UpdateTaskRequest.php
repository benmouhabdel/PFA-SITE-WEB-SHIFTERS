<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    public function authorize()
    {
        return true; // ou utilisez une logique d'autorisation appropriée
    }

    public function rules()
{
    return [
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'required|in:urgent,a faire prochainement,au fil du temps',    ];
}
}
