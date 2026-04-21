<?php

namespace App\Http\Controllers\UserManagement;

use App\DataTables\PermissionDataTable;
use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionStoreRequest;
use App\Http\Requests\PermissionUpdateRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of permissions.
     */
    public function index(Request $request)
    {
        return Inertia::render('permissions/Index', (new PermissionDataTable($request))->response());
    }

    /**
     * Show the form for creating a new permission.
     */
    public function create()
    {
        return view('user-management.permissions.create');
    }

    /**
     * Store a newly created permission.
     */
    public function store(PermissionStoreRequest $request)
    {
        $resource = strtolower(trim($request->name));

        if (empty($resource)) {
            return back()->with('error', 'Resource name is required.');
        }

        $permissions = [
            "create-{$resource}",
            "view-{$resource}",
            "edit-{$resource}",
            "delete-{$resource}",
        ];

        $created = [];
        $guard = $request->guard_name ?? 'web';

        foreach ($permissions as $permissionName) {
            if (! Permission::where('name', $permissionName)->exists()) {
                Permission::create([
                    'name' => $permissionName,
                    'guard_name' => $guard,
                ]);
                $created[] = $permissionName;
            }
        }

        return redirect()->back()->with(
            'success',
            count($created)
                ? 'Permissions created successfully: '.implode(', ', $created)
                : 'All permissions already exist.'
        );
    }

    /**
     * Display the specified permission.
     */
    public function show(Permission $permission)
    {
        return view('user-management.permissions.show', compact('permission'));
    }

    /**
     * Show the form for editing the specified permission.
     */
    public function edit(Permission $permission)
    {
        return view('user-management.permissions.edit', compact('permission'));
    }

    /**
     * Update the specified permission.
     */
    public function update(PermissionUpdateRequest $request, Permission $permission)
    {
        $permission->update([
            'name' => $request->name,
            'guard_name' => $request->guard_name ?? $permission->guard_name,
        ]);

        return response()->json([
            'message' => 'Permission updated successfully!',
            'success' => true,
        ]);
    }

    /**
     * Remove the specified permission from storage.
     */
    public function destroy(Permission $permission)
    {
        // Prevent deletion of important system permissions (optional but recommended)
        if (in_array($permission->name, ['manage roles', 'manage permissions', 'manage users'])) {
            return redirect()
                ->route('admin.permissions.index')
                ->with('error', 'Cannot delete this system permission.');
        }

        $permission->delete();

        return redirect()
            ->route('admin.permissions.index')
            ->with('success', 'Permission deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = array_map('intval', (array) $request->input('ids', []));

        Permission::whereIn('id', $ids)->each(function ($permission) {
            $permission->delete();
        });

        return back()->with('success', 'Selected permissions deleted successfully!');
    }
}
