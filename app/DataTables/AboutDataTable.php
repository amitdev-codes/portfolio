<?php

namespace App\DataTables;

use App\Models\About;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Services\DataTable;

class AboutDataTable extends DataTable
{
    public function dataTable(QueryBuilder $query): EloquentDataTable
    {
        return (new EloquentDataTable($query))
            ->addColumn('action', function (About $row) {
                return view('components.datatable-actions', [
                    'editUrl'   => route('abouts.edit', $row),
                    'deleteUrl' => route('abouts.destroy', $row),
                ])->render();
            })
            ->setRowId('id')
            ->rawColumns(['action']);
    }

    public function query(About $model): QueryBuilder
    {
        return $model->newQuery();
    }

    public function html(): HtmlBuilder
    {
        return $this->builder()
            ->setTableId('abouts-table')
            ->columns($this->getColumns())
            ->minifiedAjax()
            ->orderBy(0)
            ->buttons([Button::make('reload')]);
    }

    public function getColumns(): array
    {
        return [
            Column::make('id'),
            // TODO: add your columns
            Column::computed('action')
                  ->exportable(false)
                  ->printable(false)
                  ->addClass('text-center'),
        ];
    }

    protected function filename(): string
    {
        return 'About_' . date('YmdHis');
    }
}