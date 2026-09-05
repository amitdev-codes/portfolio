<?php

namespace App\Http\Controllers;

use App\DataTables\AboutInformationDataTable;
use App\Http\Requests\AboutInformation\StoreAboutInformationRequest;
use App\Http\Requests\AboutInformation\UpdateAboutInformationRequest;
use App\Models\AboutInformation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutInformationController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('about-informations/Index', (new AboutInformationDataTable($request))->response());
    }

    public function create()
    {
        return Inertia::render('about-informations/AboutInformationForm', [
            'mode' => 'create',
        ]);
    }

    public function store(StoreAboutInformationRequest $request)
    {
        AboutInformation::create($request->validated());

        return redirect()
            ->route('admin.about-informations.index')
            ->with('success', 'About Information created successfully.');
    }

    public function show(AboutInformation $aboutInformation)
    {
        return Inertia::render('admin.about-informations.show', compact('aboutInformation'));
    }

    public function edit(AboutInformation $aboutInformation)
    {
        return Inertia::render('about-informations/AboutInformationForm', [
            'aboutInformation' => $aboutInformation,
            'mode' => 'edit',
        ]);
    }

    public function update(UpdateAboutInformationRequest $request, AboutInformation $aboutInformation)
    {
        $aboutInformation->update($request->validated());

        return redirect()
            ->route('admin.about-informations.index')
            ->with('success', 'About Information updated successfully.');
    }

    public function destroy(AboutInformation $aboutInformation)
    {
        $aboutInformation->delete();

        return redirect()
            ->route('admin.about-informations.index')
            ->with('success', 'About Information deleted successfully.');
    }
}
