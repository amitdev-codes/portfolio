@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    {/* Hero Section */}
    <section class="relative bg-gray-50 dark:bg-gray-800 overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div>
                    <h1 class="text-4xl font-bold mb-6">
                        Building scalable web platforms with Laravel & React
                    </h1>
                    <p class="text-lg mb-8 max-w-xl text-gray-600 dark:text-gray-300">
                        From grievance systems and PMIS to real estate, recruitment, and municipal e-services.
                    </p>
                    <div class="flex space-x-4">
                        <button 
                            class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-colors"
                        >
                            Get Started
                        </button>
                        <button 
                            class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 transition-colors"
                        >
                            View Portfolio
                        </button>
                    </div>
                </div>
                
                {/* Image Content */}
                <div class="relative">
                    <img 
                        src="/images/hero-bg.svg" 
                        alt="Platform illustration" 
                        class="w-full h-auto transform -rotate-12 lg:rotate-0"
                    >
                </div>
            </div>
        </div>
    </section>