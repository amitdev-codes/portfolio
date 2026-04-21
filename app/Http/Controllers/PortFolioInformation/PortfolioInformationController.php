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
        return Inertia::render('portfolio-informations/Index', (new PortfolioInformationDataTable($request))->response());
    }

    public function create()
    {
        return Inertia::render('portfolio-informations/PortFolioInformationForm');
    }

    public function store(StorePortfolioInformationRequest $request)
    {
        $data = $request->safe()->except(['profile_image', 'cover_image']);
        $portfolio = PortfolioInformation::create($data);
        // Handle Profile Image with Spatie Media Library
        if ($request->hasFile('profile_image')) {
            $portfolio->addMedia($request->file('profile_image'))
                ->toMediaCollection('profile_images');   // Recommended collection name
        }

        // Handle Cover Image
        if ($request->hasFile('cover_image')) {
            $portfolio->addMedia($request->file('cover_image'))
                ->toMediaCollection('cover_images');
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
        return Inertia::render('portfolio-informations/PortFolioInformationForm', compact('portfolioInformation'));
    }

    public function update(UpdatePortfolioInformationRequest $request, PortfolioInformation $portfolioInformation)
    {
        $portfolioInformation->update($request->validated());
        if ($request->hasFile('profile_image')) {
            $portfolioInformation->clearMediaCollection('profile_images');
            $portfolioInformation->addMedia($request->file('profile_image'))
                ->toMediaCollection('profile_images');
        }

        // Update Cover Image (if uploaded)
        if ($request->hasFile('cover_image')) {
            $portfolioInformation->clearMediaCollection('cover_images');
            $portfolioInformation->addMedia($request->file('cover_image'))
                ->toMediaCollection('cover_images');
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
