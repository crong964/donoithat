import RoleAddForm from "@/components/route/admin/role/role-add-form";
import BackButton from "@/components/ui-custom/back-button";

const AddPermisionPage = () => {
  return (
    <div className="p-3.75">
      <BackButton />
      <h1 className="text-2xl font-bold mb-3">Thêm vai trò</h1>
      <RoleAddForm />
    </div>
  );
};

export default AddPermisionPage;
