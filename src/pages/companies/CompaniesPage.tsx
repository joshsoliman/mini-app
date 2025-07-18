import React, { useState, useEffect, type KeyboardEvent } from 'react'
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Table,
  Dropdown,
} from 'react-bootstrap'
import { FaSearch, FaEllipsisV } from 'react-icons/fa'
import AddCompanyModal from '../../components/Modals/AddCompanyModal'
import EditCompanyModal from '../../components/Modals/EditCompanyModal'
import DeleteCompanyModal from '../../components/Modals/DeleteCompanyModal'

interface Integration {
  integrationName: string
  integrationLogo: string
}

interface Company {
  id?: number | string
  companyName: string
  integrations: Integration[]
}

type NewCompanyPayload = {
  name: string
  integrations: Array<{ name: string; logo: string }>
}

const CompanyAvatar: React.FC<{ name: string }> = ({ name }) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
  return (
    <div
      style={{
        width: 40,
        height: 40,
        backgroundColor: '#10475E',
        color: '#fff',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '0.9rem',
      }}
    >
      {initials}
    </div>
  )
}

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  useEffect(() => {
    document.title = 'Companies'
    loadAllCompanies()
  }, [])

  const loadAllCompanies = () => {
    setLoading(true)
    setError(null)
    fetch('/api/companies')
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json() as Promise<Company[]>
      })
      .then(data => setCompanies(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  const handleAdd = (payload: NewCompanyPayload) => {
    const postBody = {
      companyName: payload.name,
      integrations: payload.integrations.map(i => ({ integrationName: i.name, integrationLogo: i.logo })),
    }
    fetch('/api/companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody),
    })
      .then(res => {
        if (!res.ok) throw new Error(`Add failed: ${res.status}`)
        return res.json()
      })
      .then(() => {
        setShowAdd(false)
        loadAllCompanies()
      })
      .catch(console.error)
  }

  const handleEdit = (company: Company) => {
    if (!company.id) return
    fetch(`/api/companies/${company.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    })
      .then(res => {
        if (!res.ok) throw new Error(`Update failed: ${res.status}`)
        return res.json()
      })
      .then(() => {
        setShowEdit(false)
        setSelectedCompany(null)
        loadAllCompanies()
      })
      .catch(console.error)
  }

  const handleDelete = (company: Company) => {
    if (!company.id) return
    fetch(`/api/companies/${company.id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
      })
      .then(() => {
        setShowDelete(false)
        setSelectedCompany(null)
        loadAllCompanies()
      })
      .catch(err => alert(`Delete error: ${err.message}`))
  }

  const visibleCompanies = companies.filter(c =>
    c.companyName.toLowerCase().includes(searchText.toLowerCase())
  )

  const blockEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }

  return (
    <Container fluid className="pt-4 px-4">
      <Row className="mb-3">
        <Col>
          <h2>Companies ({visibleCompanies.length})</h2>
        </Col>
        <Col className="d-flex flex-column align-items-end gap-2">
          <Button onClick={() => setShowAdd(true)}>Add Company</Button>
          <InputGroup style={{ width: 280 }}>
            <InputGroup.Text
              style={{ backgroundColor: '#10475E', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              placeholder="Search companies"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyDown={blockEnter}
            />
          </InputGroup>
        </Col>
      </Row>

      {loading ? (
        <div>Loading companies…</div>
      ) : error ? (
        <div className="text-danger">Error: {error}</div>
      ) : (
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Integrations</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleCompanies.map(company => (
              <tr key={company.id ?? company.companyName}>
                <td>
                  <div className="d-flex align-items-center">
                    <CompanyAvatar name={company.companyName} />
                    <span className="ms-2" style={{ fontWeight: 600, fontSize: '1rem', color: '#1E3A5F' }}>
                      {company.companyName}
                    </span>
                  </div>
                </td>
                <td>
                  {company.integrations.map(intg => (
                    <img
                      key={intg.integrationName}
                      src={intg.integrationLogo}
                      alt={intg.integrationName}
                      style={{ height: 40, width: 40, objectFit: 'contain', marginRight: 12 }}
                    />
                  ))}
                </td>
                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="link"
                      className="p-0"
                      style={{ backgroundColor: 'transparent' }}
                    >
                      <FaEllipsisV style={{ color: '#10475E' }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedCompany(company)
                          setShowEdit(true)
                        }}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedCompany(company)
                          setShowDelete(true)
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <AddCompanyModal show={showAdd} onHide={() => setShowAdd(false)} onCreate={handleAdd} />
      {selectedCompany && (
        <EditCompanyModal
          show={showEdit}
          onHide={() => setShowEdit(false)}
          company={selectedCompany}
          onSave={handleEdit}
        />
      )}
      {selectedCompany && (
        <DeleteCompanyModal
          show={showDelete}
          companyName={selectedCompany.companyName}
          onHide={() => setShowDelete(false)}
          onDelete={() => handleDelete(selectedCompany)}
        />
      )}
    </Container>
  )
}

export default CompaniesPage