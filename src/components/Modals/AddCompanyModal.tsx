// src/components/Modals/AddCompanyModal.tsx
import React, { useState } from 'react'
import {
  Button,
  Modal,
  Form,
  FormControl,
} from 'react-bootstrap'

interface AddCompanyModalProps {
  integrations: { id: string; name: string }[]
  onCreate: (data: { name: string; integration: string }) => void
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({
  integrations,
  onCreate,
}) => {
  const [show, setShow] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [selectedIntegration, setSelectedIntegration] = useState(
    integrations[0]?.id || ''
  )

  return (
    <>
      {/* Launch button */}
      <Button onClick={() => setShow(true)} variant="primary">
        + Add Company
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Company</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="companyName" className="mb-3">
              <Form.Label>Company Name *</Form.Label>
              <FormControl
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="Enter Company Name"
              />
            </Form.Group>

            <Form.Group controlId="integrationSelect">
              <Form.Label>Integrations</Form.Label>
              <Form.Select
                value={selectedIntegration}
                onChange={e => setSelectedIntegration(e.target.value)}
              >
                {integrations.map(int => (
                  <option key={int.id} value={int.id}>
                    {int.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="link" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // 1) call the handler passed from CompaniesPage
              onCreate({
                name: companyName.trim(),
                integration: selectedIntegration,
              })
              // 2) reset & close
              setCompanyName('')
              setSelectedIntegration(integrations[0]?.id || '')
              setShow(false)
            }}
            disabled={!companyName.trim()}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddCompanyModal
