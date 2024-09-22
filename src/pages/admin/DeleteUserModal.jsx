const DeleteUserModal = ({ isOpen, closeModal, handleDelete, user }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex-center-center z-50">
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-8 max-w-sm w-full">
          <h2 className="text-xl mb-4">Delete User</h2>
          <p className="text-muted">
            Are you sure you want to delete <strong>{user?.name}</strong>? This action cannot be undone.
          </p>
          <div className="mt-6 flex justify-between">
            <button
              onClick={closeModal}
              className="btn btn-primary-light">
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-primary">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteUserModal;
  