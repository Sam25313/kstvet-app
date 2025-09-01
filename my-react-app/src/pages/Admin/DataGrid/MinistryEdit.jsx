import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  useRefresh,
  useNotify,
} from "react-admin";

const MinistryEdit = (props) => {
  const refresh = useRefresh();
  const notify = useNotify();

  const onSuccess = (data) => {
    // You can use the notify hook to show a success message
    notify("Ministry updated successfully", { type: "success" });
    // Then, refresh the page to show the updated data
    refresh();
  };
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <TextInput source="leader" validate={required()} />
        <TextInput
          source="description"
          multiline
          fullWidth
          validate={required()}
        />
      </SimpleForm>
    </Edit>
  );
};

export default MinistryEdit;
