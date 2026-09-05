<?php

namespace App\Http\Controllers\PortFolioInformation;

use App\DataTables\PortfolioInformationDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\PortfolioInformation\StorePortfolioInformationRequest;
use App\Http\Requests\PortfolioInformation\UpdatePortfolioInformationRequest;
use App\Models\PortfolioInformation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioInformationController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('portfolio-informations/Index', new PortfolioInformationDataTable($request)->response());
    }

    public function create()
    {
        return Inertia::render('portfolio-informations/PortFolioInformationForm', [
            'mode' => 'create',
        ]);
    }

    public function store(StorePortfolioInformationRequest $request)
    {
        $data = $request->safe()->except(['profile_image', 'cover_image', 'cv_file']);

        $portfolio = PortfolioInformation::create($data);

        if ($request->hasFile('profile_image')) {
            $portfolio->addMedia($request->file('profile_image'))
                ->toMediaCollection('profile_images');
        }

        if ($request->hasFile('cover_image')) {
            $portfolio->addMedia($request->file('cover_image'))
                ->toMediaCollection('cover_images');
        }

        if ($request->hasFile('cv_file')) {
            $portfolio->addMedia($request->file('cv_file'))
                ->toMediaCollection('cv_documents');
        }

        return redirect()
            ->route('admin.portfolio-informations.index')
            ->with('success', 'Portfolio Information created successfully.');
    }

    public function show(PortfolioInformation $portfolioInformation)
    {
        return Inertia::render('admin.portfolio-informations.show', compact('portfolioInformation'));
    }

    public function edit(PortfolioInformation $portfolioInformation)
    {
        $portfolioInformation->load('media');

        return Inertia::render('portfolio-informations/PortFolioInformationForm', [
            'portfolioInformation' => $portfolioInformation,
            'mode' => 'edit',
        ]);
    }

    public function update(UpdatePortfolioInformationRequest $request, PortfolioInformation $portfolioInformation)
    {
        $data = $request->safe()->except(['profile_image', 'cover_image', 'cv_file']);

        $portfolioInformation->update($data);

        if ($request->hasFile('profile_image')) {
            $portfolioInformation->addMedia($request->file('profile_image'))
                ->toMediaCollection('profile_images'); // singleFile() auto-replaces the old one
        }

        if ($request->hasFile('cover_image')) {
            $portfolioInformation->addMedia($request->file('cover_image'))
                ->toMediaCollection('cover_images');
        }

        if ($request->hasFile('cv_file')) {
            $portfolioInformation->addMedia($request->file('cv_file'))
                ->toMediaCollection('cv_documents');
        }

        return redirect()
            ->route('admin.portfolio-informations.index')
            ->with('success', 'Portfolio Information updated successfully.');
    }

    public function destroy(PortfolioInformation $portfolioInformation)
    {
        $portfolioInformation->delete();

        return redirect()
            ->route('admin.portfolio-informations.index')
            ->with('success', 'Portfolio Information deleted successfully.');
    }
}
