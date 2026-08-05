<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                ['label' => 'Projects', 'value' => Project::count(), 'href' => route('admin.projects.index')],
                ['label' => 'Services', 'value' => Service::count(), 'href' => route('admin.services.index')],
                ['label' => 'Skills', 'value' => Skill::count(), 'href' => route('admin.skills.index')],
                ['label' => 'Messages', 'value' => ContactMessage::count(), 'href' => route('admin.messages.index')],
            ],
            'recentMessages' => ContactMessage::latest()->take(5)->get(),
        ]);
    }
}
