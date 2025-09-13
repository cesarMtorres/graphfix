<?php

namespace App\Http\Controllers;

use App\Actions\RunCode;
use App\Http\Requests\RunCodeRequest;

class CodeRunnerController extends Controller
{
    public function index(RunCodeRequest $request, RunCode $action)
    {
        return response()->json($action->handle($request->string('code')));
    }
}
