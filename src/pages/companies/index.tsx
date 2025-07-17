// src/pages/companies/index.tsx
import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Button,
  Table,
  FormControl,
  InputGroup,
  Image,
} from 'react-bootstrap'
import { FaSearch, FaPlusCircle } from 'react-icons/fa'
import { getCompanies } from '../../api/companyService'
import Layout from "../../components/Layout";

type Company = {
  id: number
  companyName: string
  integrations: Array<{
    value: string
    label: string
    integrationLogo: string
  }>
}

const CompaniesDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getCompanies().then(setCompanies).catch(console.error)
  }, [])

  const filtered = companies.filter((c) =>
    c.companyName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout>
      {/* header row */}
      <Row className="align-items-center mb-3">
        <Col>
          <h5 className="mb-0">Companies ({filtered.length})</h5>
        </Col>

        <Col md={4}>
          <InputGroup>
            <FormControl
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Col>

        <Col md="auto">
          <Button variant="primary">
            <FaPlusCircle className="me-1" />
            Add Company
          </Button>
        </Col>
      </Row>

      {/* companies table */}
      <Table hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Integrations</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td>
                <div className="d-flex align-items-center">
                  <div
                    className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-2"
                    style={{ width: 32, height: 32 }}
                  >
                    {c.companyName
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                  <span>{c.companyName}</span>
                </div>
              </td>
              <td>
                {c.integrations.map((i) => (
                  <Image
                    key={i.value}
                    src={i.integrationLogo}
                    roundedCircle
                    width={24}
                    className="me-2"
                    alt={i.label}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  )
}

export default CompaniesDashboard
