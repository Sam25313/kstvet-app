import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  useRefresh,
  useNotify,
} from "react-admin";

const SermonEdit = (props) => {
  const refresh = useRefresh();
  const notify = useNotify();

  const onSuccess = (data) => {
    notify("Sermon updated successfully", { type: "success" });
    
    refresh();
  };
  return (
    <Edit {...props} mutationOptions={{ onSuccess }}>
     <SimpleForm>
                <TextInput source="topic" validate={required()} />
                <TextInput source="speaker" validate={required()} />
                <TextInput
                    source="description" 
                    multiline
                    fullWidth
                    validate={required()}
                />
                <TextInput source="video_url"
                    validate={required()}
                />
                <DateInput source="date" validate={required()} />
            </SimpleForm>
    </Edit>
  );
};

export default SermonEdit;
