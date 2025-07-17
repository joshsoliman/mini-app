// src/pages/companies/CompaniesPage.tsx
import React, { useState, useEffect } from 'react'
import type { KeyboardEvent } from 'react'
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

export interface Integration {
  integrationName: string
  integrationLogo: string
}
export interface Company {
  id?: number
  companyName: string
  integrations: Integration[]
}

const API_URL = 'http://localhost:5001'

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const [selected, setSelected] = useState<Company | null>(null)
  const [showEdit, setShowEdit]     = useState(false)
  const [showDelete, setShowDelete] = useState(false)

    useEffect(() => {
    document.title = 'Companies'
    loadCompanies()
  }, [])

  const loadCompanies = () => {
    fetch(`${API_URL}/companies`)
      .then(res => res.json())
      .then(setCompanies)
      .catch(console.error)
  }

  useEffect(() => {
    loadCompanies()
  }, [])

  const handleCreate = (company: Omit<Company, 'id'>) => {
    fetch(`${API_URL}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    })
      .then(res => res.json())
      .then(() => {
        setShowAdd(false)
        loadCompanies()
      })
      .catch(console.error)
  }

  const handleSave = (updated: Company) => {
    if (!updated.id) return
    fetch(`${API_URL}/companies/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
      .then(res => res.json())
      .then(() => {
        setShowEdit(false)
        setSelected(null)
        loadCompanies()
      })
      .catch(console.error)
  }

  const handleDelete = (toDelete: Company) => {
    if (!toDelete.id) return
    fetch(`${API_URL}/companies/${toDelete.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setShowDelete(false)
        setSelected(null)
        loadCompanies()
      })
      .catch(console.error)
  }

  // filter locally
  const filtered = companies.filter(c =>
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.preventDefault()
  }

  return (
    <Container fluid className="pt-4 px-4">
      {/* Header with Add + Search below */}
      <Row className="align-items-start mb-3">
        <Col>
          <h2>Companies ({filtered.length})</h2>
        </Col>
        <Col className="d-flex flex-column align-items-end">
          <Button onClick={() => setShowAdd(true)}>+ Add Company</Button>
          <InputGroup className="mt-2" style={{ width: 300 }}>
            <InputGroup.Text
              style={{
                backgroundColor: '#16324F',  // same as your Add button
                color: 'white',
                border: 'none',
                borderTopLeftRadius: '.375rem',
                borderBottomLeftRadius: '.375rem',
              }}
            >
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              placeholder="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={onKeyDown}
              style={{
                borderTopRightRadius: '.375rem',
                borderBottomRightRadius: '.375rem',
                borderLeft: 'none',
              }}
            />
          </InputGroup>

        </Col>
      </Row>

      {/* Table */}
      <Table hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Integrations</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td>{c.companyName}</td>
              <td>
                {c.integrations.map((i) => (
                  <img
                    key={i.integrationName}
                    src={i.integrationLogo}
                    alt={i.integrationName}
                    style={{ height: 24, marginRight: 8 }}
                  />
                ))}
              </td>
              <td>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    bsPrefix="p-0 border-0"
                    id={`actions-${c.id}`}
                   style={{ background: 'transparent' }}
                  >
                    <FaEllipsisV style={{ color: '#16324F' }} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setSelected(c)
                        setShowEdit(true)
                      }}
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setSelected(c)
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

      {/* Modals */}
      <AddCompanyModal
        show={showAdd}
        onHide={() => setShowAdd(false)}
        onCreate={handleCreate}
      />

    {selected && (
      <EditCompanyModal
        show={showEdit}
        company={selected}
        onHide={() => {
          setShowEdit(false)
          setSelected(null)
        }}
        onSave={handleSave}
      />
    )}

      {selected && (
        <DeleteCompanyModal
          show={showDelete}
          companyName={selected.companyName}
          onHide={() => {
            setShowDelete(false)
            setSelected(null)
          }}
          onDelete={() => handleDelete(selected)}
        />
      )}
    </Container>
  )
}

export default CompaniesPage
