<?php

namespace Database\Seeders;

use App\Models\About;
use App\Models\Contact;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\SkillCategory;
use Illuminate\Database\Seeder;

class PortfolioContentSeeder extends Seeder
{
    /**
     * Seed initial portfolio content so the dashboard and frontend
     * have data to render before the admin edits anything.
     */
    public function run(): void
    {
        Profile::updateOrCreate(['id' => 1], [
            'name' => 'Your Name',
            'initials' => 'YN',
            'title' => 'Full-Stack Developer',
            'tagline' => 'I build reliable, well-architected web applications from database to interface.',
            'available' => true,
            'availability_label' => 'Available for work',
            'location' => 'Remote',
            'stack' => ['Laravel', 'React', 'MySQL'],
            'stats' => [
                ['value' => '10+', 'label' => 'Projects shipped'],
                ['value' => '5+', 'label' => 'Years experience'],
                ['value' => '100%', 'label' => 'Client satisfaction'],
            ],
        ]);

        About::updateOrCreate(['id' => 1], [
            'eyebrow' => 'About',
            'heading' => 'Engineering thoughtful software',
            'paragraphs' => [
                'I am a full-stack developer focused on building maintainable systems with clean architecture.',
                'My work spans API design, database modeling, and polished front-end interfaces.',
            ],
            'fields' => [
                ['label' => 'Role', 'value' => 'Full-Stack Developer'],
                ['label' => 'Focus', 'value' => 'Laravel · React'],
                ['label' => 'Location', 'value' => 'Remote'],
            ],
        ]);

        Contact::updateOrCreate(['id' => 1], [
            'contact_info' => [
                ['label' => 'Email', 'value' => 'hello@example.com'],
                ['label' => 'Location', 'value' => 'Remote'],
            ],
            'social_links' => [
                ['label' => 'GitHub', 'url' => 'https://github.com/'],
                ['label' => 'LinkedIn', 'url' => 'https://linkedin.com/'],
            ],
            'whatsapp_number' => '10000000000',
            'whatsapp_default_message' => 'Hi! I found your portfolio and would like to connect.',
        ]);

        $services = [
            ['icon' => 'code', 'title' => 'Web Development', 'description' => 'End-to-end web applications built with modern, maintainable stacks.'],
            ['icon' => 'server', 'title' => 'API & Backend', 'description' => 'Robust REST APIs, database design, and third-party integrations.'],
            ['icon' => 'layout', 'title' => 'UI Engineering', 'description' => 'Accessible, responsive interfaces with careful attention to detail.'],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['title' => $service['title']], $service);
        }

        $categories = [
            'Backend' => [
                ['name' => 'Laravel', 'icon' => 'laravel', 'color' => '#FF2D20', 'level' => 'Expert'],
                ['name' => 'PHP', 'icon' => 'php', 'color' => '#777BB4', 'level' => 'Expert'],
                ['name' => 'MySQL', 'icon' => 'mysql', 'color' => '#4479A1', 'level' => 'Advanced'],
            ],
            'Frontend' => [
                ['name' => 'React', 'icon' => 'react', 'color' => '#61DAFB', 'level' => 'Advanced'],
                ['name' => 'Inertia', 'icon' => 'inertia', 'color' => '#9553E9', 'level' => 'Advanced'],
                ['name' => 'Tailwind CSS', 'icon' => 'tailwind', 'color' => '#06B6D4', 'level' => 'Expert'],
            ],
        ];

        foreach ($categories as $title => $skills) {
            $category = SkillCategory::updateOrCreate(['title' => $title]);

            foreach ($skills as $skill) {
                Skill::updateOrCreate(
                    ['skill_category_id' => $category->id, 'name' => $skill['name']],
                    $skill
                );
            }
        }

        Project::updateOrCreate(['title' => 'Enterprise Multi-Vendor E-Commerce Platform'], [
            'subtitle' => 'MENA Region · Client NDA Protected',
            'architecture_tag' => 'REST API · Event-Driven · Multi-Tenant',
            'description' => 'A scalable marketplace supporting multiple vendors, payments, and logistics integrations.',
            'highlights' => [
                'Built role-based access control across vendor and admin tiers.',
                'Integrated payment and shipping providers with webhook handling.',
            ],
            'stats' => [
                ['value' => '35%', 'label' => 'Query Speed'],
                ['value' => '99.9%', 'label' => 'Uptime'],
            ],
            'tech_stack' => ['Laravel', 'Stripe API', 'MySQL', 'Redis'],
            'is_featured' => true,
            'sort_order' => 1,
        ]);
    }
}
