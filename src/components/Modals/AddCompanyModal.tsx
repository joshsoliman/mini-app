import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import type { MultiValue, GroupBase } from 'react-select'

import bitbucketLogo from '../../assets/bitbucket.png'
import gcpLogo       from '../../assets/gcp.png'
import microsoftLogo from '../../assets/microsoft.png'
import oracleLogo    from '../../assets/oracle.png'

interface IntegrationOption {
  value: string
  label: string
  logoUrl: string
}

const INTEGRATION_CHOICES: IntegrationOption[] = [
  { value: 'Bitbucket', label: 'Bitbucket', logoUrl: bitbucketLogo },
  { value: 'GCP',       label: 'GCP',       logoUrl: gcpLogo       },
  { value: 'Microsoft', label: 'Microsoft', logoUrl: microsoftLogo },
  { value: 'Oracle',    label: 'Oracle',    logoUrl: oracleLogo    },
]
interface AddCompanyModalProps {
  show: boolean
  onHide: () => void
  onCreate: (company: { name: string; integrations: { name: string; logo: string }[] }) => void
}


const IntegrationSelector: React.FC<{ selected: IntegrationOption[]; onChange: (opts: MultiValue<IntegrationOption>) => void }> = ({ selected, onChange }) => (
  <Form.Group controlId="integrations" className="mb-3">
    <Form.Label>Choose Integrations</Form.Label>
    <Select<IntegrationOption, true, GroupBase<IntegrationOption>>
      isMulti
      options={INTEGRATION_CHOICES}
      value={selected}
      getOptionLabel={(opt) => opt.label}
      formatOptionLabel={(opt) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={opt.logoUrl} alt={opt.label} style={{ width: 18, marginRight: 6 }} />
          {opt.label}
        </div>
      )}
      onChange={onChange}
      placeholder="Select one or more..."
    />
  </Form.Group>
)

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ show, onHide, onCreate }) => {
  const formik = useFormik({
    initialValues: { companyName: '', integrations: [] as IntegrationOption[] },
    validationSchema: Yup.object({ companyName: Yup.string().trim().required('Please enter a company name') }),
    onSubmit: ({ companyName, integrations }) => {
      onCreate({ name: companyName, integrations: integrations.map(opt => ({ name: opt.value, logo: opt.logoUrl })) })
      formik.resetForm()
      onHide()
    },
  })

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="companyName" className="mb-3">
            <Form.Label>Company Name *</Form.Label>
            <Form.Control
              type="text"
              
              {...formik.getFieldProps('companyName')}
              isInvalid={!!formik.errors.companyName && formik.touched.companyName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyName}
            </Form.Control.Feedback>
          </Form.Group>

          <IntegrationSelector
            selected={formik.values.integrations}
            onChange={(opts) => formik.setFieldValue('integrations', opts)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => { formik.resetForm(); onHide() }}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Company
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddCompanyModal