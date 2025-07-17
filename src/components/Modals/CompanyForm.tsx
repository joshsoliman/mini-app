// src/components/CompanyForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { Button, Form, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';

//
// 1. Validation schema
//
export const CompanySchema = Yup.object({
  companyName: Yup.string().required('Company name is required'),
  integrations: Yup.array().of(
    Yup.object({
      value: Yup.string(),            // react-select uses { value, label, ... }
      label: Yup.string(),
      integrationLogo: Yup.string().url('Must be a URL'),
    })
  ),
});

//
// 2. Example options for the React-Select dropdown
//
const integrationOptions = [
  { value: 'slack', label: 'Slack', integrationLogo: 'https://logo.clearbit.com/slack.com' },
  { value: 'github', label: 'GitHub', integrationLogo: 'https://logo.clearbit.com/github.com' },
  { value: 'jira', label: 'Jira', integrationLogo: 'https://logo.clearbit.com/atlassian.com' },
  // …your other integrations
];

export interface CompanyFormValues {
  companyName: string;
  integrations: Array<{ value: string; label: string; integrationLogo?: string }>;
}

interface Props {
  initial?: Partial<CompanyFormValues>;
  onSave: (values: CompanyFormValues) => void;
  onCancel: () => void;
}

const CompanyForm: React.FC<Props> = ({ initial, onSave, onCancel }) => {
  const formik = useFormik<CompanyFormValues>({
    initialValues: {
      companyName: initial?.companyName || '',
      integrations: initial?.integrations || [],
    },
    validationSchema: CompanySchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      {/* Company Name */}
      <FormGroup className="mb-3" controlId="companyName">
        <FormLabel>Company Name</FormLabel>
        <FormControl
          name="companyName"
          type="text"
          placeholder="Enter company name"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={!!(formik.touched.companyName && formik.errors.companyName)}
        />
        <FormControl.Feedback type="invalid">
          {formik.errors.companyName}
        </FormControl.Feedback>
      </FormGroup>

      {/* Integrations Multi-Select */}
      <FormGroup className="mb-3" controlId="integrations">
        <FormLabel>Integrations</FormLabel>
        <Select
          isMulti
          name="integrations"
          options={integrationOptions}
          value={formik.values.integrations}
          onChange={(opts) => formik.setFieldValue('integrations', opts)}
          onBlur={() => formik.setFieldTouched('integrations', true)}
        />
        {formik.touched.integrations && formik.errors.integrations ? (
          <FormText className="text-danger">{`${formik.errors.integrations}`}</FormText>
        ) : null}
      </FormGroup>

      {/* Buttons */}
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button type="submit" disabled={formik.isSubmitting}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default CompanyForm;
