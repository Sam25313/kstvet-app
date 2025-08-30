import { List, Datagrid, TextField, EditButton, } from 'react-admin';

const SermonList = () => (
    <List>
        <Datagrid>
             <TextField source="id" />
            <TextField source="topic" />
            <TextField source="speaker" />
            <TextField source="description" /> 
            <TextField source="video_url" /> 
            <TextField source="date" />
                <EditButton />
                
        </Datagrid>
    </List>
);
export default SermonList;