<?php

namespace App\Http\Controllers;

use App\DataTables\AboutDataTable;
use App\Http\Requests\About\StoreAboutRequest;
use App\Http\Requests\About\UpdateAboutRequest;
use App\Models\About;

class AboutController extends Controller
{
    public function index(AboutDataTable $dataTable)
    {
        return $dataTable->render('abouts.index');
    }

    public function create()
    {
        return view('abouts.create');
    }

    public function store(StoreAboutRequest $request)
    {
        About::create($request->validated());

        return redirect()
            ->route('abouts.index')
            ->with('success', 'About created successfully.');
    }

    public function show(About $about)
    {
        return view('abouts.show', compact('about'));
    }

    public function edit(About $about)
    {
        return view('abouts.edit', compact('about'));
    }

    public function update(UpdateAboutRequest $request, About $about)
    {
        $about->update($request->validated());

        return redirect()
            ->route('abouts.index')
            ->with('success', 'About updated successfully.');
    }

    public function destroy(About $about)
    {
        $about->delete();

        return redirect()
            ->route('abouts.index')
            ->with('success', 'About deleted successfully.');
    }
}