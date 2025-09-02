import React from 'react';
import {Resource} from 'react-admin';
import { 
  ListGuesser, 
  EditGuesser 
} from 'react-admin';

 function Resources(permissions) {
  return (
    <>
      <Resource name="ministries" list={ListGuesser} edit={EditGuesser} />
      <Resource name="sermons" list={ListGuesser} edit={EditGuesser} />

      {/* Only “admin” can see events and testimonies */}
      {permissions === 'admin' && (
        <>
          <Resource name="events" list={ListGuesser} edit={EditGuesser} />
          <Resource name="testimonies" list={ListGuesser} edit={EditGuesser} />
        </>
      )}
    </>
  );
}
export default Resources;