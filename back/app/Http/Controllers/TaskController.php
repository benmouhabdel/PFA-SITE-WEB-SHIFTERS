<?php

// app/Http/Controllers/TaskController.php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    public function __construct()
    {
        // Assure que seules les routes index et show sont accessibles par tous les utilisateurs connectés
        $this->middleware('auth')->only(['index', 'show']);

        // Assure que seules les routes create, store, update, et destroy sont accessibles par les administrateurs
        $this->middleware('admin')->except(['index', 'show']);
    }

    public function index()
    {
        $tasks = Task::with('user')->get();
        return response()->json($tasks);
    }

    public function store(CreateTaskRequest $request)
    {
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'user_id' => $request->user_id
        ]);

        return response()->json($task, 201);
    }


    public function update(UpdateTaskRequest $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->validated());
        return response()->json($task, 200);
    }

    public function show($id)
    {
        return Task::findOrFail($id);
    }


    public function destroy($id)
    {
        Task::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
