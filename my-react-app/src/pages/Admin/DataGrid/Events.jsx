import {
    List,
    Datagrid,
    TextField,
    DateField,
    EditButton,
    Button
} from 'react-admin';
import { useDataProvider, useNotify } from 'react-admin';

const PublishButton = ({ record }) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();

    const handleClick = () => {
        dataProvider.publish('events', { id: record.id })
            .then(() => {
                notify('Event published!', { type: 'success' });
            })
            .catch((error) => {
                notify(`Error: ${error.message}`, { type: 'error' });
            });
    };

    return <Button onClick={handleClick}>Publish</Button>;
};

export const EventList = () => (
    <List>
        <Datagrid>
             <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <DateField source="date" />
            <DateField source="time" showTime />
            <TextField source="location" />
            <EditButton />
            <PublishButton/>
        </Datagrid>
    </List>
);

export default EventList;