import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl } from 'react-bootstrap'
import Select from 'react-select'
import { FaChevronDown } from 'react-icons/fa'

import type {
  Company as ParentCompany,
  Integration as ParentIntegration,
} from '../../pages/companies/CompaniesPage'

import bitbucketIcon from '../../assets/bitbucket.png'
import microsoftIcon from '../../assets/microsoft.png'
import oracleIcon    from '../../assets/oracle.png'
import gcpIcon       from '../../assets/gcp.png'

export interface IntegrationOption {
  value: string
  label: string
  logo: string
}

export interface EditCompanyModalProps {
  show: boolean
  company: ParentCompany | null
  onHide: () => void
  onSave: (updated: ParentCompany) => void
}

const integrationOptions: IntegrationOption[] = [
  { value: 'Bitbucket', label: 'Bitbucket', logo: bitbucketIcon },
  { value: 'Microsoft', label: 'Microsoft', logo: microsoftIcon },
  { value: 'Oracle',    label: 'Oracle',    logo: oracleIcon },
  { value: 'GCP',       label: 'GCP',       logo: gcpIcon },
]

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  show,
  company,
  onHide,
  onSave,
}) => {
  const [name, setName] = useState('')
  const [selectedOpts, setSelectedOpts] = useState<IntegrationOption[]>([])

  useEffect(() => {
    if (!company) return

    setName(company.companyName)

    const pre = integrationOptions.filter(opt =>
      company.integrations.some(i => i.integrationName === opt.value)
    )
    setSelectedOpts(pre)
  }, [company])

  const handleSubmit = () => {
    if (!company) return

    const newIntegrations: ParentIntegration[] = selectedOpts.map(opt => ({
      integrationName: opt.value,
      integrationLogo:  opt.logo,
    }))

    onSave({
      id: company.id,
      companyName: name,
      integrations: newIntegrations,
    })
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Edit Company{company ? ` – ${company.companyName}` : ''}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="companyName" className="mb-3">
            <Form.Label>
              Company Name <span className="text-danger">*</span>
            </Form.Label>
            <FormControl
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="companyIntegrations" className="mb-3">
            <Form.Label>Integrations</Form.Label>
            <Select<IntegrationOption, true>
              isMulti
              options={integrationOptions}
              getOptionLabel={o => o.label}
              getOptionValue={o => o.value}
              formatOptionLabel={o => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={o.logo}
                    alt={o.label}
                    style={{ width: 20, marginRight: 8 }}
                  />
                  {o.label}
                </div>
              )}
              components={{
                DropdownIndicator: () => <FaChevronDown style={{ marginRight: 8 }} />,
                IndicatorSeparator: () => null,
              }}
              value={selectedOpts}
              onChange={opts => setSelectedOpts(opts ? [...opts] : [])}
              placeholder="Select integrations..."
              styles={{
                multiValue: base => ({
                  ...base,
                  backgroundColor: '#f1f1f1',
                }),
                control: base => ({
                  ...base,
                  minHeight: '40px',
                }),
              }}
            />
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
          disabled={!name}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditCompanyModal
