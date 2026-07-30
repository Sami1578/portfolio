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
        // $projects = [
        //     [
        //         'title' => 'E-Commerce Platform',
        //         'description' => 'A full-featured e-commerce platform with payment integration, inventory management, and real-time analytics.',
        //         'emoji' => '🛒',
        //         'tags' => ['Laravel', 'React', 'Tailwind CSS', 'Stripe'],
        //         'category' => 'fullstack',
        //         'demo_url' => '#',
        //         'code_url' => '#',
        //     ],
        //     [
        //         'title' => 'Task Management App',
        //         'description' => 'Collaborative task management tool with real-time updates, team workspaces, and progress tracking.',
        //         'emoji' => '✅',
        //         'tags' => ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
        //         'category' => 'fullstack',
        //         'demo_url' => '#',
        //         'code_url' => '#',
        //     ],
        //     [
        //         'title' => 'Portfolio Website',
        //         'description' => 'Modern, responsive portfolio website with dark mode, animations, and contact form integration.',
        //         'emoji' => '🎨',
        //         'tags' => ['React', 'Tailwind CSS'],
        //         'category' => 'frontend',
        //         'demo_url' => '#',
        //         'code_url' => '#',
        //     ],
        //     [
        //         'title' => 'API Development',
        //         'description' => 'RESTful API development with authentication, rate limiting, and comprehensive documentation.',
        //         'emoji' => '🔌',
        //         'tags' => ['Laravel', 'MySQL', 'JWT'],
        //         'category' => 'backend',
        //         'demo_url' => '#',
        //         'code_url' => '#',
        //     ],
        //     [
        //         'title' => 'Mobile Food Delivery App',
        //         'description' => 'Cross-platform food delivery app with real-time order tracking and payment integration.',
        //         'emoji' => '📱',
        //         'tags' => ['React Native', 'Node.js', 'Firebase'],
        //         'category' => 'mobile',
        //         'demo_url' => '#',
        //         'code_url' => '#',
        //     ],
        //     [
        //         'title' => 'Analytics Dashboard',
        //         'description' => 'Interactive dashboard with real-time data visualization, charts, and predictive analytics.',
        //         'emoji' => '📊',
        //         'tags' => ['React', 'D3.js', 'Python', 'FastAPI'],
        //         'category' => 'fullstack',
        //         'demo_url' => '#',
        //         'code_url' => '#',
        //     ],
        // ];

        // foreach ($projects as $project) {
        //     Project::create($project);
        // }

        Project::create([
            'title' => 'Enterprise Multi-Vendor E-Commerce Platform',
            'subtitle' => 'MENA Region · NDA Protected',
            'architecture_tag' => 'REST API · Event-Driven · Multi-Tenant',
            'description' => 'Architected a scalable multi-vendor e-commerce platform powering web and mobile apps. Engineered multi-role management dashboards, dynamic vendor payout systems, and localized 3PL shipping integrations.',
            'highlights' => [
                'Built multi-role portals (Admin, Seller, Buyer) with automated vendor onboarding and payout processing.',
                'Integrated Bosta Shipping API for automated shipment dispatch and regional tracking.',
                'Developed secure RESTful APIs to fuel native mobile app interactions.',
                'Implemented Stripe payment gateway alongside Cash-on-Delivery (COD) workflows.',
                'Leveraged Laravel Events/Listeners and Service classes to decouple business logic and optimize execution.',
                'Integrated Firebase Cloud Messaging (FCM) and real-time Buyer-to-Admin support chat.'
            ],
            'stats' => [
                ['value' => '3 Roles', 'label' => 'Admin / Seller / Buyer'],
                ['value' => '3PL API', 'label' => 'Bosta Shipping'],
                ['value' => 'Real-Time', 'label' => 'Firebase Push & Chat']
            ],
            'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'Stripe API', 'Bosta API', 'Firebase FCM', 'REST API'],
            'is_featured' => true,
            'sort_order' => 1
        ]);

        Project::create([
            'title' => 'Automotive Video E-Commerce & ERP Integration Engine',
            'subtitle' => 'Saudi Arabia (KSA) · NDA Protected',
            'architecture_tag' => 'Next.js · Django REST · Async Workers · ERP Sync',
            'description' => 'Engineered a video-first automotive e-commerce platform featuring TikTok-style video discovery, multi-tier checkout (Upfront & Installments), automated Odoo ERP synchronization, and background cron processing.',
            'highlights' => [
                'Built a video-driven car discovery feed with Next.js/React & Django REST Framework.',
                'Integrated MyFatoorah payment gateway supporting full payments, financing, and webhook lifecycle listeners.',
                'Engineered bidirectional Odoo ERP sync via custom webhooks and REST APIs for automated sales & inventory alignment.',
                'Designed background cron services & Celery tasks for automated email dispatches, WhatsApp notifications, and status polling.',
                'Architected specialized Content Management Dashboards for internal media teams to upload and manage vehicle catalog streams.',
                'Executed full platform migration from React.js to Next.js to enhance SEO and server-side performance.'
            ],
            'stats' => [
                ['value' => 'MyFatoorah', 'label' => 'Pay & Installments'],
                ['value' => 'Odoo ERP', 'label' => 'Bidirectional Sync'],
                ['value' => 'Cron & Webhooks', 'label' => 'Async Workflows'],
            ],
            'tech_stack' => [
                'Next.js',
                'React.js',
                'Python',
                'Django REST',
                'Odoo API',
                'MyFatoorah',
                'Cron / Celery',
                'WhatsApp API'
            ],
            'is_featured' => true,
            'sort_order' => 2,
        ]);

        Project::create([
            'title' => 'Automated Visa Processing & RPA Intelligence Engine',
            'subtitle' => 'Dubai, UAE · NDA Protected',
            'architecture_tag' => 'Python RPA · Google Vision OCR · Multi-Tenant RBAC',
            'description' => 'Engineered an end-to-end visa management ecosystem featuring OCR passport document parsing, custom Python RPA bots for automated government portal submissions, 2FA bypass handling, and multi-portal access control.',
            'highlights' => [
                'Integrated Google Cloud Vision API to perform OCR document scanning on passports for automated application field auto-filling.',
                'Developed custom Python RPA automation bots to execute headless portal logins and automated visa submissions under travel agent credentials.',
                'Engineered automated 2FA handling via Google Authenticator seed exports and integrated 3rd-party CAPTCHA solving services for uninterrupted bot execution.',
                'Architected a multi-tenant portal ecosystem for Companies, Agents, and Vendors with granular Role-Based Access Control (RBAC).',
                'Implemented background queue workers for automated transactional email dispatches, status polling, and system notifications.'
            ],
            'stats' => [
                ['value' => 'OCR Parsing', 'label' => 'Google Cloud Vision'],
                ['value' => 'RPA Bots', 'label' => 'Auto-Submission & 2FA'],
                ['value' => '3 Portals', 'label' => 'Company / Agent / Vendor']
            ],
            'tech_stack' => [
                'Python',
                'Laravel',
                'Google Vision API',
                'RPA Automation',
                '2FA / CAPTCHA APIs',
                'MySQL',
                'Queue Jobs'
            ],
            'is_featured' => true,
            'sort_order' => 3,
        ]);

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
