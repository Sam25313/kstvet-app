import { List, DataTable, DateField, BooleanField, EditButton } from 'react-admin';

const MinistryList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="leader" />
            <DataTable.Col source="description" />
            <DataTable.Col source="published_at" field={DateField} />
            <DataTable.Col source="commentable" field={BooleanField} />
            <DataTable.Col>
               <EditButton />
             </DataTable.Col>
        </DataTable>
    </List>
);
export default MinistryList;