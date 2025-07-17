// src/components/Modals/DeleteCompanyModal.tsx
import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export interface DeleteCompanyModalProps {
  show: boolean
  companyName: string
  onHide: () => void
  onDelete: () => void
}

const DeleteCompanyModal: React.FC<DeleteCompanyModalProps> = ({
  show,
  companyName,
  onHide,
  onDelete,
}) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>Delete {companyName}?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to permanently delete <strong>{companyName}</strong>?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="link" onClick={onHide}>
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={() => {
          onDelete()
          onHide()
        }}
      >
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
)

export default DeleteCompanyModal
