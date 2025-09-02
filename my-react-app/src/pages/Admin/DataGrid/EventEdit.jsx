import {
  Edit,
  SimpleForm,
  TextInput,
  TimeInput,
  DateInput,
  required,
  useRefresh,
  useNotify,
} from "react-admin";

const EventEdit = (props) => {
  const refresh = useRefresh();
  const notify = useNotify();

  const onSuccess = (data) => {
    // You can use the notify hook to show a success message
    notify("Event updated successfully", { type: "success" });
    // Then, refresh the page to show the updated data
    refresh();
  };
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="title" validate={required()} />
        <TextInput
          source="description"
          multiline
          fullWidth
          validate={required()}
        />
        <DateInput source="date" validate={required()} />
        <TimeInput source="time" validate={required()} />
        <TextInput source="location" validate={required()} />
      </SimpleForm>
    </Edit>
  );
};

export default EventEdit;
