<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\PortfolioService;

class PortfolioController extends Controller
{
    public function index(PortfolioService $portfolioService): Response
    {
        // Passes dynamic database data straight to React as Inertia Props
        return Inertia::render('Home', $portfolioService->getPortfolioData());
    }
}
