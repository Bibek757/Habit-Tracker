function DeleteModal({ habitName, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="modal">
        <div className="modal-header">
          <h3>Delete Habit</h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>
        <div className="modal-body">
          <div className="delete-confirm">
            <div className="delete-icon">⚠️</div>
            <h4>Are you sure?</h4>
            <p>You are about to delete <strong>"{habitName}"</strong>.</p>
            <p>This action cannot be undone.</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
