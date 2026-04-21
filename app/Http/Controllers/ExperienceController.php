<?php

namespace App\Http\Controllers;

use App\DataTables\ExperienceDataTable;
use App\Http\Requests\Experience\StoreExperienceRequest;
use App\Http\Requests\Experience\UpdateExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('experiences/Index', (new ExperienceDataTable($request))->response());
    }

    public function create()
    {
        return Inertia::render('experiences/ExperienceForm');
    }

    public function store(StoreExperienceRequest $request)
    {
        $data = $request->validated();

        // Handle logo upload
        if ($request->hasFile('company_logo')) {
            $data['company_logo'] = $request->file('company_logo')->store('experiences', 'public');
        }

        Experience::create($data);

        return redirect()
            ->route('admin.experiences.index')
            ->with('success', 'Experience created successfully.');
    }

    public function show(Experience $experience)
    {
        return view('experiences.show', compact('experience'));
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('experiences/ExperienceForm',compact('experience'));
    }

    public function update(UpdateExperienceRequest $request, Experience $experience)
    {
        $data = $request->validated();

        // Handle logo upload
        if ($request->hasFile('company_logo')) {
            // delete old logo if exists
            if ($experience->company_logo && \Storage::disk('public')->exists($experience->company_logo)) {
                \Storage::disk('public')->delete($experience->company_logo);
            }

            $data['company_logo'] = $request->file('company_logo')->store('experiences', 'public');
        }

        $experience->update($data);

        return redirect()
            ->route('admin.experiences.index')
            ->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return redirect()
            ->route('admin.experiences.index')
            ->with('success', 'Experience deleted successfully.');
    }
}
