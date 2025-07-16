// src/pages/companies/CompaniesPage.tsx
import React, { useState } from 'react'
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Card,
  Table,
  Image,
  Modal,
} from 'react-bootstrap'
import { FaSearch, FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa'
import AddCompanyModal from '../../components/Modals/AddCompanyModal'
import { EditCompanyModal, type Company as CompanyType } from '../../components/Modals/EditCompanyModal'
import { DeleteCompanyModal } from '../../components/Modals/DeleteCompanyModal'

// Dummy integration icons
import googleIcon from '../../assets/gcp.png'
import microsoftIcon from '../../assets/microsoft.png'
import bitbucketIcon from '../../assets/bitbucket.png'
import oracleIcon from '../../assets/oracle.png'

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([
    {
      name: 'Hooli Software',
      short: 'MC',
      integrations: [googleIcon, microsoftIcon, bitbucketIcon, oracleIcon],
    },
    {
      name: 'MPH',
      short: 'M2',
      integrations: [],
    },
    {
      name: 'SaaSConsole',
      short: 'S',
      integrations: [googleIcon, microsoftIcon, bitbucketIcon, oracleIcon],
    },
  ])

  // Action menu
  const [showActionModal, setShowActionModal] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Edit/Delete modals
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const openActionModal = (idx: number) => {
    setActiveIndex(idx)
    setShowActionModal(true)
  }
  const closeActionModal = () => {
    setShowActionModal(false)
    setActiveIndex(null)
  }

  const openEditFlow = () => {
    setShowActionModal(false)
    setShowEditModal(true)
  }
  const openDeleteFlow = () => {
    setShowActionModal(false)
    setShowDeleteModal(true)
  }

  // handle saving from EditCompanyModal
  const handleSaveEdit = (updated: CompanyType) => {
    if (activeIndex === null) return
    const copy = [...companies]
    copy[activeIndex] = updated
    setCompanies(copy)
    setShowEditModal(false)
    setActiveIndex(null)
  }

  // handle confirmed delete
  const handleConfirmDelete = () => {
    if (activeIndex === null) return
    setCompanies(cs => cs.filter((_, i) => i !== activeIndex))
    setShowDeleteModal(false)
    setActiveIndex(null)
  }

  // For AddCompanyModal
  const integrationsList = [
    { id: 'gcp', name: 'GCP' },
    { id: 'azure', name: 'Azure' },
    { id: 'bitbucket', name: 'Bitbucket' },
    { id: 'oracle', name: 'Oracle' },
  ]
  const handleCreate = (data: { name: string; integration: string }) => {
    const newCompany: CompanyType = {
      name: data.name,
      short: data.name
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 3),
      integrations:
        data.integration === 'gcp'
          ? [googleIcon]
          : data.integration === 'azure'
          ? [microsoftIcon]
          : data.integration === 'bitbucket'
          ? [bitbucketIcon]
          : [oracleIcon],
    }

    const saasIndex = companies.findIndex(c => c.name === 'SaaSConsole')
    const updated = [...companies]
    updated.splice(saasIndex + 1, 0, newCompany)
    setCompanies(updated)
  }

  return (
    <Container fluid className="pt-4 px-4">
      {/* Header */}
      <Row className="align-items-center mb-2">
        <Col>
          <h2>Companies ({companies.length})</h2>
        </Col>
        <Col className="d-flex flex-column align-items-end">
          <AddCompanyModal
            integrations={integrationsList}
            onCreate={handleCreate}
          />
          <div style={{ marginTop: '0.75rem' }}>
            <InputGroup style={{ maxWidth: 300 }}>
              <Button
                variant="primary"
                style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <FaSearch />
              </Button>
              <FormControl
                placeholder="Search"
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
            </InputGroup>
          </div>
        </Col>
      </Row>

      {/* Companies Table */}
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <Table hover responsive className="m-0">
            <thead className="bg-light text-uppercase small">
              <tr>
                <th className="ps-4">Name</th>
                <th>Integrations</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c, idx) => (
                <tr key={idx}>
                  <td className="ps-4 py-3 d-flex align-items-center">
                    <div
                      className="me-3 d-flex justify-content-center align-items-center text-white fw-bold"
                      style={{
                        backgroundColor: '#0d5460',
                        width: 40,
                        height: 40,
                        borderRadius: 4,
                      }}
                    >
                      {c.short}
                    </div>
                    <span className="fw-semibold">{c.name}</span>
                  </td>
                  <td className="py-3">
                    {c.integrations.length > 0 ? (
                      c.integrations.map((icon, i) => (
                        <Image
                          key={i}
                          src={icon}
                          height={24}
                          className="me-2"
                          alt="integration-icon"
                        />
                      ))
                    ) : (
                      <span className="text-muted">--</span>
                    )}
                  </td>
                  <td className="py-3 text-end pe-4">
                    <Button
                      variant="link"
                      className="p-0"
                      style={{ color: '#1F3C51' }}
                      onClick={() => openActionModal(idx)}
                    >
                      <FaEllipsisV size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Action Menu */}
      <Modal show={showActionModal} onHide={closeActionModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Actions for{' '}
            {activeIndex !== null ? companies[activeIndex].name : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-around">
          <Button variant="outline-primary" onClick={openEditFlow}>
            <FaEdit className="me-1" />
            Edit
          </Button>
          <Button variant="outline-danger" onClick={openDeleteFlow}>
            <FaTrash className="me-1" />
            Delete
          </Button>
        </Modal.Body>
      </Modal>

      {/* Edit Company Modal */}
      <EditCompanyModal
        show={showEditModal}
        company={activeIndex !== null ? companies[activeIndex] : null}
        integrationsList={integrationsList}
        onHide={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
      />

      {/* Delete Company Modal */}
      <DeleteCompanyModal
        show={showDeleteModal}
        companyName={
          activeIndex !== null ? companies[activeIndex].name : ''
        }
        onHide={() => setShowDeleteModal(false)}
        onDelete={handleConfirmDelete}
      />
    </Container>
  )
}

export default CompaniesPage
