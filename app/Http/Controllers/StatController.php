<?php

namespace App\Http\Controllers;

use App\DataTables\StatDataTable;
use App\Http\Requests\Stat\StoreStatRequest;
use App\Http\Requests\Stat\UpdateStatRequest;
use App\Models\Stat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('stats/Index', (new StatDataTable($request))->response());
    }

    public function create()
    {
        return Inertia::render('stats/StatForm');
    }

    public function store(StoreStatRequest $request)
    {
        Stat::create($request->validated());

        return redirect()
            ->route('admin.stats.index')
            ->with('success', 'Stat created successfully.');
    }

    public function show(Stat $stat)
    {
        return view('admin.stats.show', compact('stat'));
    }

    public function edit(Stat $stat)
    {
        return Inertia::render('stats/StatForm', compact('stat'));
    }

    public function update(UpdateStatRequest $request, Stat $stat)
    {
        $stat->update($request->validated());

        return redirect()
            ->route('admin.stats.index')
            ->with('success', 'Stat updated successfully.');
    }

    public function destroy(Stat $stat)
    {
        $stat->delete();

        return redirect()
            ->route('admin.stats.index')
            ->with('success', 'Stat deleted successfully.');
    }
}
