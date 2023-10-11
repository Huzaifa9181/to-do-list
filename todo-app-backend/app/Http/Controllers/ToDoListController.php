<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\To_do_list;

class ToDoListController extends Controller
{
    //

    public function index(){
        $data = To_do_list::all();
        return $data;
        // return response()->json(['data' => $data], 200);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 200);
        }


        $data = new To_do_list();
        $data->title = $request->title;
        $data->description = $request->description;
        $data->save();
        return response()->json(['message' => 'Task created successfully'], 200);
    }

    public function edit($id = null){
        $data = To_do_list::find($id);
        return response()->json(['data' => $data], 200);
    }


    public function update(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 200);
        }

        $data = To_do_list::find($request->id);
        $data->title = $request->title;
        $data->description = $request->description;
        $data->update();
        return response()->json(['message' => 'Task updated successfully'], 200);
    }

    public function delete($id = null){
        $data = To_do_list::find($id);
        $data->delete();
        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}
