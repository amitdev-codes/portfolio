<?php

namespace App\Http\Controllers;

use App\DataTables\TechTalkDataTable;
use App\Http\Requests\TechTalk\StoreTechTalkRequest;
use App\Http\Requests\TechTalk\UpdateTechTalkRequest;
use App\Models\TechTalk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechTalkController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('tech_talks/Index', (new TechTalkDataTable($request))->response());
    }

    public function create()
    {
        return Inertia::render('tech_talks/TechTalkForm');
    }

    public function store(StoreTechTalkRequest $request)
    {
        $data = $request->validated();

        $techTalk = TechTalk::create($data);

        // Spatie media upload
        if ($request->hasFile('cover_image')) {
            $techTalk
                ->addMediaFromRequest('cover_image')
                ->toMediaCollection('cover_image');
        }

        return redirect()
            ->route('admin.tech-talks.index')
            ->with('success', 'Tech Talk created successfully.');
    }

    public function show(TechTalk $techTalk)
    {
        $techTalk->load('media');

        return view('tech_talks.show', compact('techTalk'));
    }

    public function edit(TechTalk $techTalk)
    {
        $techTalk->load('media');

        return Inertia::render('tech_talks/TechTalkForm', [
            'techTalk' => [
                ...$techTalk->toArray(),
                'cover_image' => optional($techTalk->getFirstMedia('cover_image'))->getUrl(),
            ],
        ]);
    }

    public function update(UpdateTechTalkRequest $request, TechTalk $techTalk)
    {
        $data = $request->validated();

        $techTalk->update($data);

        // Replace cover image
        if ($request->hasFile('cover_image')) {
            $techTalk
                ->clearMediaCollection('cover_image');

            $techTalk
                ->addMediaFromRequest('cover_image')
                ->toMediaCollection('cover_image');
        }

        return redirect()
            ->route('admin.tech-talks.index')
            ->with('success', 'Tech Talk updated successfully.');
    }

    public function destroy(TechTalk $techTalk)
    {
        $techTalk->delete();

        return redirect()
            ->route('admin.tech-talks.index')
            ->with('success', 'Tech Talk deleted successfully.');
    }
}
