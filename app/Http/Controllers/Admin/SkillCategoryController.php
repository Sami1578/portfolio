<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SkillCategoryRequest;
use App\Models\SkillCategory;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SkillCategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/SkillCategories/Index', [
            'categories' => SkillCategory::withCount('skills')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/SkillCategories/Create');
    }

    public function store(SkillCategoryRequest $request): RedirectResponse
    {
        SkillCategory::create($request->validated());

        return redirect()->route('admin.skill-categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(SkillCategory $skillCategory): Response
    {
        return Inertia::render('Admin/SkillCategories/Edit', [
            'category' => $skillCategory,
        ]);
    }

    public function update(SkillCategoryRequest $request, SkillCategory $skillCategory): RedirectResponse
    {
        $skillCategory->update($request->validated());

        return redirect()->route('admin.skill-categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(SkillCategory $skillCategory): RedirectResponse
    {
        $skillCategory->delete();

        return back()->with('success', 'Category deleted successfully.');
    }
}
