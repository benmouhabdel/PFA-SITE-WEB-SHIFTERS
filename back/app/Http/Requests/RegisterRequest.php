<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Helpers\Helper;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:12',
        ];

        // Check if the current route is not for admin registration
        if ($this->route()->getName() !== 'register.admin') {
            $rules['registration_key'] = 'required|string|exists:registration_keys,key';
        }

        return $rules;
    }

    protected function failedValidation(Validator $validator)
    {
        $response = Helper::sendError('Validation error', $validator->errors()->toArray());
        throw new HttpResponseException($response);
    }
}
