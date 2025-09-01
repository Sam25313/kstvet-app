import { Layout } from 'react-admin';
import MyAppBar  from './MyAppBar';
import MyMenu from './MyMenu';
import MySidebar from './MySideBar';





const MyLayout = ({ children }) => (
     
     <Layout appBar={MyAppBar} menu={MyMenu} sidebar={MySidebar} >
        {children}
    </Layout>
    
   
    
   
);
export default MyLayout;