// Libraries
import { FormEvent } from "react";

// Styles
import { Form, FieldText, FormButton } from "./styles";

interface FormSearchProps {
  queryText: string;
  setQueryText: (query: string) => void;
  handleSubmit: (e: FormEvent) => void;
}

const FormSearch = ({
  queryText,
  setQueryText,
  handleSubmit,
}: FormSearchProps) => {
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FieldText
        type="text"
        value={queryText}
        onInput={(e) => setQueryText(e.currentTarget.value)}
        placeholder="Enter your query..."
      />
      <FormButton>Search</FormButton>
    </Form>
  );
};

export default FormSearch;
