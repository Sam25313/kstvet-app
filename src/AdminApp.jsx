import { Admin, Resource, fetchUtils, CustomRoutes } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { ListGuesser, EditGuesser } from "react-admin";
import { defaultTheme } from "react-admin";
import { Route } from "react-router-dom";


import BookIcon from "@mui/icons-material/Book";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PeopleIcon from "@mui/icons-material/People";
import { FiCalendar } from "react-icons/fi";

import Dashboard from "./pages/Admin/Dashboard";
import authProvider from "./pages/Admin/AuthProvider";
import LoginForm from "./pages/Admin/LoginForm";
import Resources from "./pages/Admin/Resources";
import MyLayout from "./pages/Admin/Layout/SearchItems/MyLayout";
import MinistryList from "./pages/Admin/DataGrid/Ministries";
import SermonList from "./pages/Admin/DataGrid/Sermons";
import EventList from "./pages/Admin/DataGrid/Events";
import UsersList from "./pages/Admin/DataGrid/User";
import myTheme from "./pages/Admin/Layout/SearchItems/Theme";

import EventEdit from "./pages/Admin/DataGrid/EventEdit";
import EventCreate from "./pages/Admin/DataGrid/EventCreate";
import SermonEdit from './pages/Admin/DataGrid/SermonEdit';
import SermonCreate from "./pages/Admin/DataGrid/SermonCreate";
import MinistryEdit from "./pages/Admin/DataGrid/MinistryEdit";
import MinistryCreate from "./pages/Admin/DataGrid/MinistryCreate";

const httpClient = (url, options = {}) => {
  options.headers = new Headers(options.headers || {});
  const token = localStorage.getItem("token");
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};
const myDataProvider = simpleRestProvider(
  `${import.meta.env.VITE_API_URL}/api`,
  httpClient
);

const mappedDataProvider = {
  ...myDataProvider,
  getList: (resource, params) =>
        myDataProvider.getList(resource, params).then((response) => {
            const data = response.data.map((record) => ({
                ...record,
                id: record._id,
            }));

            // Return the correctly formatted data and total
            return {
                data,
                total: response.total,
            };
        }),
         getOne: (resource, params) => 
        myDataProvider.getOne(resource, params).then((response) => {
            const data = { ...response.data, id: response.data._id };
            return { data };
        }),

   create: (resource, params) =>
        myDataProvider.create(resource, params).then((response) => {
            const newRecord = { ...response.data, id: response.data._id };
            return { data: newRecord };
        }),

  update: (resource, params) => {
        const { id, data } = params;
        const newData = { ...data, _id: id }; 
        return myDataProvider.update(resource, { ...params, data: newData }).then((response) => {
            const updatedRecord = { ...response.data, id: response.data._id };
            return { data: updatedRecord };
        });
    },
    delete: (resource, params) =>
        myDataProvider.delete(resource, params).then((response) => {
            const deletedRecord = { ...response.data, id: response.data._id };
            return { data: deletedRecord };
        }),


      publish: (resource, params) => {
        const { id } = params;
       const url = `${import.meta.env.VITE_API_URL}/api/${resource}/${id}/publish`;

        return httpClient(url, {
            method: 'POST',
        }).then(({ json }) => ({ data: json }));
    },
    

  sendBulkSms: (resource, params) => {
   const url = `${import.meta.env.VITE_API_URL}/api/${resource}/send-sms`;

    const body = {
      userIds: params.data.userIds,
      message: params.data.message,
    };
    return httpClient(url, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((response) => {
      return { data: response.json };
    });
  },
};

const theme = {
  ...defaultTheme,
  sidebar: {
    width: 300, 
    closedWidth: 70, 
  },
};

const AdminApp = () => (
  <Admin
    basename="/admin"
    authProvider={authProvider}
    loginPage={LoginForm}
    layout={MyLayout}
    dashboard={Dashboard}
    theme={myTheme}
    dataProvider={mappedDataProvider}
  >
  
    <Resource
      name="ministries"
      list={MinistryList}
      edit={MinistryEdit}
      create={MinistryCreate}
      icon={BookIcon}
    />
    <Resource
      name="sermons"
      list={SermonList}
      edit={SermonEdit}
      create={SermonCreate}
      icon={ChatBubbleIcon}
    />
    <Resource
      name="events"
      list={EventList}
      edit={EventEdit}
      create={EventCreate}
      icon={FiCalendar}
    />
    <Resource
      name="users"
      list={UsersList}
      edit={EditGuesser}
      icon={PeopleIcon}
    />
  </Admin>
);

export default AdminApp;
