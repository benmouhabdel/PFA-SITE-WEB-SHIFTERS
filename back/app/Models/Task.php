<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title', 'description', 'status', 'user_id'];

    // Constants for statuses
    const STATUS_URGENT = 'urgent';
    const STATUS_IMPORTANT = 'a faire prochainement';
    const STATUS_NECESSAIRE = 'au fil du temps';

    // Define relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
