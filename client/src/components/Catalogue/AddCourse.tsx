import * as React from "react";
import axios from "axios";
import { Layout, Card, FormLayout, TextField, Button } from "@shopify/polaris";

export interface Props {
  readonly text: string;
  readonly onTextInput: (value: string) => void;
  readonly onAddCourse: (course: Course) => void;
}

const AddCourse = ({ text, onTextInput, onAddCourse }: Props): JSX.Element => {
  const handleAddCourse = (): void => {
    axios.get("http://localhost:7777/api/Catalogue").then(res => console.log(res.data));
    const course: Course = {
      name: text
    };
    onAddCourse(course);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleAddCourse();
  };

  return (
    <Layout.AnnotatedSection title="Add a course">
      <Card sectioned>
        <FormLayout>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Course name"
              type="text"
              name="add-course"
              value={text}
              autoFocus
              autoComplete
              placeholder="e.g. History 101"
              helpText="Type in the name and number of the course you want to add."
              onChange={onTextInput}
              maxLength={120}
            />
            <Button
              primary
              icon="add"
              onClick={handleAddCourse}
              accessibilityLabel="Add Course"
            >
              Add Course
            </Button>
          </form>
        </FormLayout>
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default AddCourse;