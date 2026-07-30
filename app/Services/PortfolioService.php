<?php
namespace App\Services;

use App\Models\Profile;
use App\Models\About;
use App\Models\Service;
use App\Models\SkillCategory;
use App\Models\Project;
use App\Models\Contact;

class PortfolioService
{
    public function getPortfolioData(): array
    {
        $profile = Profile::first();
        $about = About::first();
        $services = Service::all(['icon', 'title', 'description']);
        $skills = SkillCategory::with('skills:skill_category_id,name,icon,color,level')->get();
        $projects = Project::all();
        $contact = Contact::first();

        return [
            'profile' => [
                'name' => $profile?->name ?? 'John Doe',
                'initials' => $profile?->initials ?? 'JD',
                'title' => $profile?->title ?? 'Full-Stack Developer',
                'tagline' => $profile?->tagline ?? '',
                'status' => [
                    'available' => $profile?->available ?? true,
                    'label' => $profile?->availability_label ?? '',
                ],
                'location' => $profile?->location ?? '',
                'stack' => $profile?->stack ?? [],
                'stats' => $profile?->stats ?? [],
            ],
            'about' => [
                'eyebrow' => $about?->eyebrow ?? 'About',
                'heading' => $about?->heading ?? 'What I do',
                'paragraphs' => $about?->paragraphs ?? [],
                'fields' => $about?->fields ?? [],
                'services' => $services->toArray(),
            ],
            'skillCategories' => $skills->map(fn($category) => [
                'title' => $category->title,
                'skills' => $category->skills,
            ]),
            'projects' => $projects->map(fn($project) => [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'emoji' => $project->emoji,
                'tags' => $project->tags,
                'category' => $project->category,
                'demoUrl' => $project->demo_url,
                'codeUrl' => $project->code_url,
            ]),
            'contactInfo' => $contact?->contact_info ?? [],
            'socialLinks' => $contact?->social_links ?? [],
            'whatsapp' => [
                'phoneNumber' => $contact?->whatsapp_number ?? '',
                'defaultMessage' => $contact?->whatsapp_default_message ?? '',
            ]
        ];
    }
}