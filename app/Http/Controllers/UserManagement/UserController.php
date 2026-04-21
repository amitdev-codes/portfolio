<?php

namespace App\Http\Controllers\UserManagement;

use App\DataTables\UserDataTable;
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('users/Index', (new UserDataTable($request))->response());
    }

    public function create()
    {
        return Inertia::render('users/UserForm', [
            'user' => null,
            'roles' => Role::pluck('name', 'id'),
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        $user = User::create($request->validated());
        $user->syncRoles($request->roles);

        return redirect()->route('admin.users.index')
            ->with('success', 'User created successfully!');
    }

    public function show(User $user)
    {
        $user->load('roles');

        return Inertia::render('users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'roles' => $user->roles->pluck('name')->toArray(),
                'role_names' => $user->roles->pluck('name')->implode(', '),
                'created_at' => $user->created_at->format('M d, Y'),
                'updated_at' => $user->updated_at->format('M d, Y'),
            ],
            'roles' => Role::pluck('name', 'id'),
        ]);
    }

    public function edit(User $user)
    {
        $user->load('roles');

        return Inertia::render('users/UserForm', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => optional($user->roles->first())->name,
            ],
            'roles' => Role::pluck('name', 'id'),
        ]);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $data = $request->validated();
        if (empty($data['password'])) {
            unset($data['password']); // prevents hashing null
        }
        $user->update($data);

        $role = Role::findByName($request->role);

        $user->syncRoles([$role->name]);

        return redirect()->route('admin.users.index')
            ->with('success', 'User updated successfully!');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully!');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = array_map('intval', (array) $request->input('ids', []));

        User::whereIn('id', $ids)->each(function ($user) {
            $user->roles()->detach();
            $user->delete();
        });

        return back()->with('success', 'Selected users deleted successfully!');
    }

    public function exportUsers(Request $request)
    {
        $type = $request->get('type', 'excel');

        if ($type === 'excel') {
            return Excel::download(new UsersExport, 'users_'.now()->format('Y-m-d').'.xlsx');
        }

        $users = User::with('roles')->get();

        return Inertia::render('users/Print', [
            'users' => $users->map(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name')->implode(', '),
            ]),
        ]);
    }
}
