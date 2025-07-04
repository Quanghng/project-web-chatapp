import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useGetUsersQuery, useModifyUserMutation, User } from "@/gql/generated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";


// We define a smaller type for the form data to avoid issues with __typename
type UserUpdateInput = Omit<Partial<User>, 'id' | '__typename' | 'email'>;

const UsersList = () => {
  // --- DATA FETCHING ---
  const { data, loading, error, refetch } = useGetUsersQuery();
  const [updateUser, { loading: isUpdating }] = useModifyUserMutation();

  // --- COMPONENT STATE ---
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserUpdateInput>({
    firstName: "",
    lastName: "",
  });

  // Refetch data on component mount to ensure it's fresh
  useEffect(() => {
    refetch();
  }, []);

  // --- EVENT HANDLERS ---

  // Open the edit modal and populate it with the user's data
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    });
    setEditModalOpen(true);
  };


  // Handle input changes in the edit form
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the submission of the user update form
  const handleUpdateSubmit = async () => {
    if (!selectedUser) return;
    try {
      await updateUser({
        variables: {
          inputs: {
            userId: selectedUser.id,
            firstName: formData.firstName ?? "",
            lastName: formData.lastName ?? "",
          },
        },
      });
      refetch(); // Refetch the user list to show the updated data
      setEditModalOpen(false); // Close the modal
    } catch (e) {
      console.error("Failed to update user:", e);
      // Here you could add a toast notification for the error
    }
  };



  // --- RENDER LOGIC ---

  if (loading) return <Layout><p className="text-center mt-10">Chargement des utilisateurs...</p></Layout>;
  if (error) return <Layout><p className="text-center text-red-500">Erreur : {error.message}</p></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h2>

        {/* --- USERS TABLE --- */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.users && data.users.length > 0 ? (
                data.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.firstName || "N/A"}</TableCell>
                    <TableCell>{user.lastName || "N/A"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(user as User)}>
                        Modifier
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    Aucun utilisateur trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>


      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="firstName" className="text-right">Prénom</label>
              <Input id="firstName" name="firstName" value={formData.firstName ?? ""} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="lastName" className="text-right">Nom</label>
              <Input id="lastName" name="lastName" value={formData.lastName ?? ""} onChange={handleFormChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Annuler</Button>
            </DialogClose>
            <Button onClick={handleUpdateSubmit} disabled={isUpdating}>
              {isUpdating ? "Sauvegarde..." : "Sauvegarder les modifications"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>



    </Layout>
  );
};

export default UsersList;