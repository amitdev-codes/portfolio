<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TechTalkResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'number' => str_pad((string) $this->number, 2, '0', STR_PAD_LEFT), // 1 -> "01"
            'slug' => $this->slug,
            'category' => $this->category,
            'categoryColor' => $this->category_color, // hex, e.g. "#6366f1"
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'date' => $this->date?->format('M Y'), // "Mar 2025"
            'readTime' => $this->read_time,
        ];
    }
}
