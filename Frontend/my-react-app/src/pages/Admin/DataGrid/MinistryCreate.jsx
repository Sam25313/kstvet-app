import {
    Create,
    SimpleForm,
    TextInput,
    required,
    useRefresh,
    useNotify,
    useRedirect
} from 'react-admin';

// Define the transform function to add missing fields
const transformMinistryData = (data) => {
    return {
        ...data,
        published_at: new Date().toISOString(),
        commentable: true,
    };
};

const MinistryCreate = (props) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = (data) => {
        notify(`Ministry "${data.title}" created successfully!`, { type: 'success' });
        redirect('list', 'ministries');
        refresh(); // Force a refresh of the list page
    };

    return (
        <Create {...props} mutationOptions={{ onSuccess }}>
            <SimpleForm transform={transformMinistryData}>
                <TextInput source="name" validate={required()} />
                <TextInput source="leader" validate={required()} />
                <TextInput source="description" multiline fullWidth validate={required()} />
            </SimpleForm>
        </Create>
    );
};

export default MinistryCreate;