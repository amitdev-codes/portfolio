<?php

namespace App\DataTables;

use App\Models\TechTalk;
use Illuminate\Database\Eloquent\Builder;


class TechTalkDataTable extends BaseDataTable
{
    protected string $dataKey = 'techTalks';

    protected function query(): Builder
    {
        return TechTalk::select(
            'id',
            'category',
            'category_color',
            'title',
            'excerpt',
            'date',
            'read_time',
            'sort_order',
            'cover_image',
            'video_link',
            'source_link',
            'is_published',
            'slug',
            'created_at');
    }

    protected function searchableColumns(): array
    {
        return ['category'];
    }

    protected function filterableColumns(): array
    {
        return ['category'];
    }

    protected function filterHandlers(): array
    {
        return [
            'category' => fn ($q, $v) => $q->where('category', 'like', "%$v%"),
        ];
    }

    protected function transform($techTalk): array
    {
        return [
            'id' => $techTalk->id,
            'category' => $techTalk->category,
            'category_color' => $techTalk->category_color,
            'title' => $techTalk->title,
            'excerpt' => $techTalk->excerpt,
            'date' => $techTalk->date,
            'read_time' => $techTalk->read_time,
            'sort_order' => $techTalk->sort_order,
            'cover_image' => $techTalk->cover_image,
            'video_link' => $techTalk->video_link,
            'source_link' => $techTalk->source_link,
            'is_published' => $techTalk->is_published,
            'slug' => $techTalk->is_publislugshed,
            'created_at' => $techTalk->created_at->format('Y-m-d H:i'),
        ];
    }

    public function extraProps(): array
    {
        return [];
    }
}
