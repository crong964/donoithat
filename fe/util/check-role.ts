import { iRole } from "@/components/role/interface";

const isSamrPermission = (clonePermission: string, permission: string) => {
  let clonePermissionSet = new Set<string>();
  clonePermission.split(" ").forEach((v) => {
    clonePermissionSet.add(v);
  });

  let permissions = permission.split(" ");
  for (let i = 0; i < permissions.length; i++) {
    const element = permissions[i];
    if (!clonePermissionSet.has(element)) {
      return false;
    }
  }
  return true;
};
const isSameRole = (cloneRole: iRole, role: iRole) => {
  if (cloneRole.roleName != role.roleName) {
    return false;
  }
  return isSamrPermission(cloneRole.permission, role.permission);
};
export default isSameRole;
