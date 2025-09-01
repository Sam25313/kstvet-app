import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  useNotify,
  useRefresh,
  useRedirect,
} from "react-admin";

const transformSermonData = (data) => {
  return {
    ...data,
    published_at: new Date().toISOString(),
    commentable: true,
  };
};
const SermonCreate = (props) => {
  const refresh = useRefresh();
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = (data) => {
    notify(`Sermon "${data.title}" created successfully!`, { type: "success" });
    redirect("list", "sermons");
    refresh(); 
  };
  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm transform={transformSermonData}>
        <TextInput source="topic" validate={required()} />
        <TextInput source="speaker" validate={required()} />
        <TextInput
          source="description"
          multiline
          fullWidth
          validate={required()}
        />
        <TextInput source="video_url" />
        <DateInput source="date" validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export default SermonCreate;
