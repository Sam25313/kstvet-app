import { List, DataTable, DateField, BooleanField, EditButton, BulkDeleteButton } from 'react-admin';
import SendSmsButton from '../Services/SendSmsButton';


const UsersBulkActions = () => (
    <>
        <SendSmsButton />
        <BulkDeleteButton  resource='users'/>
    </>
);

const UsersList = () => (
    <List>
        <DataTable bulkActionButtons={<UsersBulkActions/>}>
            <DataTable.Col source="name" />
            <DataTable.Col source="email" />
            <DataTable.Col source="phone" />
            <DataTable.Col source="published_at" field={DateField} />
            <DataTable.Col source="commentable" field={BooleanField} />
            <DataTable.Col>
               <EditButton />
             </DataTable.Col>
        </DataTable>
    </List>
);
export default UsersList;