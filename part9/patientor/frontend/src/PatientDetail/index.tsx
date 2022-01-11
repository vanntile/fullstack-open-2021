import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from '../constants';
import { addPatient, useStateValue } from '../state';
import { Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import EntryDetail from './EntryDetails';

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  useEffect(() => {
    if (patients[id]?.ssn) return;

    const getPatientDetail = async () => {
      try {
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(addPatient(data));
      } catch (e) {
        console.error(e);
      }
    };

    void getPatientDetail();
  }, [dispatch]);

  return patients && patients[id] ? (
    <>
      <h1>
        {patients[id].name} <Icon name={patients[id].gender === 'female' ? 'woman' : 'man'} />
      </h1>
      <p>ssn: {patients[id].ssn}</p>
      <p>occupation: {patients[id].occupation}</p>
      {patients[id].entries.length !== 0 && <h2>Entries</h2>}
      {patients[id].entries.map((e) => (
        <EntryDetail key={e.id} entry={e} />
      ))}
    </>
  ) : (
    <>Loading...</>
  );
};

export default PatientDetail;
