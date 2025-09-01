import {
    Create,
    SimpleForm,
    TextInput,
    DateInput,
    TimeInput,
    required,
    useRefresh,
    useNotify,
    useRedirect
} from 'react-admin';

// Define the transform function to add missing fields
const transformEventData = (data) => {
    return {
        ...data,
        published_at: new Date().toISOString(),
        commentable: true,
    };
};

const EventCreate = (props) => {
    const refresh = useRefresh();
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = (data) => {
        notify(`Event "${data.title}" created successfully!`, { type: 'success' });
        redirect('list', 'events');
        refresh(); // Force a refresh of the list page
    };

    return (
        <Create {...props} mutationOptions={{ onSuccess }}>
            <SimpleForm transform={transformEventData}>
                <TextInput source="title" validate={required()} />
                <TextInput source="description" multiline fullWidth validate={required()} />
                <DateInput source="date" validate={required()} />
                <TimeInput source="time" validate={required()} />
                <TextInput source="location" validate={required()} />
            </SimpleForm>
        </Create>
    );
};

export default EventCreate;