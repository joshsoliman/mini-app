import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
import googleIcon from '../../assets/gcp.png'
import microsoftIcon from '../../assets/microsoft.png'
import bitbucketIcon from '../../assets/bitbucket.png'
import oracleIcon from '../../assets/oracle.png'

export interface Company {
  name: string
  short: string
  integrations: string[] // URLs to icons
}

interface EditCompanyModalProps {
  show: boolean
  company: Company | null
  integrationsList: { id: string; name: string }[]
  onHide: () => void
  onSave: (updated: Company) => void
}

const iconForId = (id: string) =>
  id === 'gcp'
    ? googleIcon
    : id === 'azure'
    ? microsoftIcon
    : id === 'bitbucket'
    ? bitbucketIcon
    : oracleIcon

export const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  show,
  company,
  integrationsList,
  onHide,
  onSave,
}) => {
  const [name, setName] = useState('')
  const [intg, setIntg] = useState('')

  useEffect(() => {
    if (company) {
      setName(company.name)
      // derive id from first icon
      const first = company.integrations[0] || ''
      const found = integrationsList.find(i => iconForId(i.id) === first)
      setIntg(found?.id || '')
    }
  }, [company, integrationsList])

  const handleSubmit = () => {
    if (!company) return
    const short = name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 3)

    onSave({
      name,
      short,
      integrations: [iconForId(intg)],
    })
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Edit Company – {company ? company.name : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="companyName" className="mb-3">
            <Form.Label>
              Company Name<span className="text-danger">*</span>
            </Form.Label>
            <FormControl
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="companyIntegration" className="mb-3">
            <Form.Label>Integrations</Form.Label>
            <Form.Select
              value={intg}
              onChange={e => setIntg(e.target.value)}
            >
              <option value="">Select Integrations</option>
              {integrationsList.map(i => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="link" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!name || !intg}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
