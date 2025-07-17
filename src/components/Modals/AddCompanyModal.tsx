// src/components/Modals/AddCompanyModal.tsx
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'

import bitbucketIcon from '../../assets/bitbucket.png'
import gcpIcon       from '../../assets/gcp.png'
import microsoftIcon from '../../assets/microsoft.png'
import oracleIcon    from '../../assets/oracle.png'

interface IntegrationOption {
  value: string
  label: string
  logo: string
}

const integrationOptions = [
  { value: 'Bitbucket', label: 'Bitbucket', logo: bitbucketIcon },
  { value: 'GCP',       label: 'GCP',       logo: gcpIcon },
  { value: 'Microsoft', label: 'Microsoft', logo: microsoftIcon },
  { value: 'Oracle',    label: 'Oracle',    logo: oracleIcon },
]

export interface Integration {
  integrationName: string
  integrationLogo: string
}
export interface Company {
  companyName: string
  integrations: Integration[]
}

interface Props {
  show: boolean
  onHide: () => void
  onCreate: (company: Company) => void
}

const AddCompanyModal: React.FC<Props> = ({ show, onHide, onCreate }) => {
  const formik = useFormik({
    initialValues: {
      companyName: '',
      integrations: [] as IntegrationOption[],
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required('Company name is required'),
    }),
    onSubmit: (values) => {
      const payload: Company = {
        companyName: values.companyName,
        integrations: values.integrations.map(opt => ({
          integrationName: opt.value,
          integrationLogo: opt.logo,
        })),
      }
      onCreate(payload)
      formik.resetForm()
    },
  })

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="companyName" className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps('companyName')}
              isInvalid={!!formik.errors.companyName && formik.touched.companyName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.companyName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="integrations">
            <Form.Label>Integrations</Form.Label>
            <Select<IntegrationOption, true>
              isMulti
              options={integrationOptions}
              // simple string label for accessibility & filtering:
              getOptionLabel={(o) => o.label}
              getOptionValue={(o) => o.value}
              // here’s where you render the logo + text:
              formatOptionLabel={(o) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={o.logo}
                    alt={o.label}
                    style={{ width: 20, marginRight: 8 }}
                  />
                  {o.label}
                </div>
              )}
              onChange={(opts) => formik.setFieldValue('integrations', opts)}
              value={formik.values.integrations}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button type="submit">Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddCompanyModal
