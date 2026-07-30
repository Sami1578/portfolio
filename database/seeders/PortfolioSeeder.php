<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;
use App\Models\About;
use App\Models\Service;
use App\Models\SkillCategory;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Contact;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Profile
        Profile::create([
            'name' => 'Sami Ahmed',
            'initials' => 'SA',
            'title' => 'Full-Stack Developer',
            'tagline' => 'I design and build reliable, end-to-end web products — from the database to the deploy.',
            'available' => true,
            'availability_label' => 'Available for freelance work',
            'location' => 'Islamabad, Pakistan',
            'stack' => ['Laravel', 'Python Django', 'Flask', 'Vue', 'React'],
            'stats' => [
                ['value' => '10+', 'label' => 'Projects shipped'],
                ['value' => '5+', 'label' => 'Years experience'],
                ['value' => '10+', 'label' => 'Clients served'],
                ['value' => '5+', 'label' => 'Technologies'],
            ],
        ]);

        // 2. Seed About
        About::create([
            'eyebrow' => 'About',
            'heading' => 'What I do',
            'paragraphs' => [
                "I'm a full-stack developer with 5+ years building web applications end to end — from data modelling and APIs to the interfaces people actually use.",
                'I care about clean, maintainable code and about shipping things that hold up in production, not just in a demo.',
            ],
            'fields' => [
                ['label' => 'Role', 'value' => 'Full-Stack Developer'],
                ['label' => 'Focus', 'value' => 'Laravel · React · MySQL'],
                ['label' => 'Based in', 'value' => 'Islamabad, Pakistan'],
                ['label' => 'Availability', 'value' => 'Open to freelance & contract'],
            ],
        ]);

        // 3. Seed Services
        $services = [
            ['icon' => 'Code', 'title' => 'Frontend Development', 'description' => 'Responsive, accessible interfaces built with React and modern CSS tooling.'],
            ['icon' => 'Server', 'title' => 'Backend Development', 'description' => 'APIs and services built with Laravel, Node.js and Python.'],
            ['icon' => 'Database', 'title' => 'Database Design', 'description' => 'Schema design and query optimisation across MySQL, PostgreSQL and MongoDB.'],
            ['icon' => 'Smartphone', 'title' => 'Mobile Development', 'description' => 'Cross-platform apps built with React Native and Flutter.'],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        // 4. Seed Skill Categories & Skills
        $skillCategories = [
            [
                'title' => 'Frontend',
                'skills' => [
                    ['name' => 'React', 'icon' => 'SiReact', 'color' => '#61DAFB', 'level' => 'Core'],
                    ['name' => 'Vue.js', 'icon' => 'SiVuedotjs', 'color' => '#4FC08D', 'level' => 'Working knowledge'],
                    ['name' => 'Tailwind CSS', 'icon' => 'SiTailwindcss', 'color' => '#06B6D4', 'level' => 'Core'],
                    ['name' => 'JavaScript', 'icon' => 'SiJavascript', 'color' => '#F7DF1E', 'level' => 'Core'],
                ],
            ],
            [
                'title' => 'Backend',
                'skills' => [
                    ['name' => 'Laravel', 'icon' => 'SiLaravel', 'color' => '#FF2D20', 'level' => 'Core'],
                    ['name' => 'PHP', 'icon' => 'SiPhp', 'color' => '#777BB4', 'level' => 'Core'],
                    ['name' => 'Node.js', 'icon' => 'SiNodedotjs', 'color' => '#339933', 'level' => 'Working knowledge'],
                    ['name' => 'Python', 'icon' => 'SiPython', 'color' => '#3776AB', 'level' => 'Working knowledge'],
                ],
            ],
            [
                'title' => 'Database',
                'skills' => [
                    ['name' => 'MySQL', 'icon' => 'SiMysql', 'color' => '#4479A1', 'level' => 'Core'],
                    ['name' => 'PostgreSQL', 'icon' => 'SiPostgresql', 'color' => '#336791', 'level' => 'Working knowledge'],
                    ['name' => 'MongoDB', 'icon' => 'SiMongodb', 'color' => '#47A248', 'level' => 'Working knowledge'],
                ],
            ],
            [
                'title' => 'DevOps & Tools',
                'skills' => [
                    ['name' => 'Docker', 'icon' => 'SiDocker', 'color' => '#2496ED', 'level' => 'Working knowledge'],
                    ['name' => 'Git', 'icon' => 'SiGit', 'color' => '#F05032', 'level' => 'Core'],
                ],
            ],
        ];

        foreach ($skillCategories as $catData) {
            $category = SkillCategory::create(['title' => $catData['title']]);
            foreach ($catData['skills'] as $skill) {
                $category->skills()->create($skill);
            }
        }

        // 5. Seed Projects
        $projects = [
            [
                'title' => 'E-Commerce Platform',
                'description' => 'A full-featured e-commerce platform with payment integration, inventory management, and real-time analytics.',
                'emoji' => '🛒',
                'tags' => ['Laravel', 'React', 'Tailwind CSS', 'Stripe'],
                'category' => 'fullstack',
                'demo_url' => '#',
                'code_url' => '#',
            ],
            [
                'title' => 'Task Management App',
                'description' => 'Collaborative task management tool with real-time updates, team workspaces, and progress tracking.',
                'emoji' => '✅',
                'tags' => ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
                'category' => 'fullstack',
                'demo_url' => '#',
                'code_url' => '#',
            ],
            [
                'title' => 'Portfolio Website',
                'description' => 'Modern, responsive portfolio website with dark mode, animations, and contact form integration.',
                'emoji' => '🎨',
                'tags' => ['React', 'Tailwind CSS'],
                'category' => 'frontend',
                'demo_url' => '#',
                'code_url' => '#',
            ],
            [
                'title' => 'API Development',
                'description' => 'RESTful API development with authentication, rate limiting, and comprehensive documentation.',
                'emoji' => '🔌',
                'tags' => ['Laravel', 'MySQL', 'JWT'],
                'category' => 'backend',
                'demo_url' => '#',
                'code_url' => '#',
            ],
            [
                'title' => 'Mobile Food Delivery App',
                'description' => 'Cross-platform food delivery app with real-time order tracking and payment integration.',
                'emoji' => '📱',
                'tags' => ['React Native', 'Node.js', 'Firebase'],
                'category' => 'mobile',
                'demo_url' => '#',
                'code_url' => '#',
            ],
            [
                'title' => 'Analytics Dashboard',
                'description' => 'Interactive dashboard with real-time data visualization, charts, and predictive analytics.',
                'emoji' => '📊',
                'tags' => ['React', 'D3.js', 'Python', 'FastAPI'],
                'category' => 'fullstack',
                'demo_url' => '#',
                'code_url' => '#',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }

        // 6. Seed Contact & Social Info
        Contact::create([
            'contact_info' => [
                ['icon' => 'Mail', 'label' => 'Email', 'value' => 'sami.ahmed48@gmail.com', 'href' => 'mailto:sami.ahmed48@gmail.com'],
                ['icon' => 'Phone', 'label' => 'Phone', 'value' => '+92 332 5928377', 'href' => 'tel:+923325928377'],
                ['icon' => 'MapPin', 'label' => 'Location', 'value' => 'Islamabad, Pakistan', 'href' => null],
            ],
            'social_links' => [
                ['name' => 'GitHub', 'href' => 'https://github.com/Sami1578', 'icon' => 'Github'],
                ['name' => 'LinkedIn', 'href' => 'https://linkedin.com/in/sami-ahmed-3021b4287', 'icon' => 'Linkedin'],
            ],
            'whatsapp_number' => '1234567890',
            'whatsapp_default_message' => 'Hello! I would like to connect with you.',
        ]);
    }
}