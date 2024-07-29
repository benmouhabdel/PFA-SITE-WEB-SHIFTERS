<?php
namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:500',
        ]);

        Comment::create([
            'user_id' => Auth::id(),
            'content' => $request->input('content'),
        ]);

        return response()->json(['message' => 'Comment added successfully'], 201);
    }

    public function index()
    {
        $comments = Comment::with('user')->get();
        return response()->json($comments);
    }
    public function destroy($id)
{
    $comment = Comment::find($id);

    if (!$comment) {
        return response()->json(['message' => 'Comment not found'], 404);
    }

    $comment->delete();

    return response()->json(['message' => 'Comment deleted successfully']);
}

}
