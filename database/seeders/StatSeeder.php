<?php

namespace Database\Seeders;

use App\Models\Stat;
use Illuminate\Database\Seeder;

class StatSeeder extends Seeder
{
    public function run(): void
    {
        Stat::truncate();

        $stats = [
            ['value' => '6+', 'label' => 'Years Experience'],
            ['value' => '25+', 'label' => 'Projects Shipped'],
            ['value' => '15+', 'label' => 'Happy Clients'],
            ['value' => '99%', 'label' => 'Uptime Delivered'],
        ];

        foreach ($stats as $index => $item) {
            Stat::create([
                'value' => $item['value'],
                'label' => $item['label'],
                'icon' => null,
                'sort_order' => $index + 1,
            ]);
        }
    }
}
