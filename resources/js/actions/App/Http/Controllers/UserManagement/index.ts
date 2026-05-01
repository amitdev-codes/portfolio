import UserController from './UserController'
import RoleController from './RoleController'
import PermissionController from './PermissionController'

const UserManagement = {
    UserController: Object.assign(UserController, UserController),
    RoleController: Object.assign(RoleController, RoleController),
    PermissionController: Object.assign(PermissionController, PermissionController),
}

export default UserManagement