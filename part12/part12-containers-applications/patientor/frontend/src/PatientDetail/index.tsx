import React, { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';

import { apiBaseUrl } from '../constants';
import { addPatient, useStateValue } from '../state';
import { Patient } from '../types';
import { Button, Icon } from 'semantic-ui-react';
import EntryDetail from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientDetail: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch({ type: 'ADD_PATIENT', payload: newPatient });
      closeModal();
    } catch (err) {
      const e = err as AxiosError;
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.message || 'Unknown error');
    }
  };

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
    <div>
      <h1>
        {patients[id].name} <Icon name={patients[id].gender === 'female' ? 'woman' : 'man'} />
      </h1>
      <p>ssn: {patients[id].ssn}</p>
      <p>occupation: {patients[id].occupation}</p>
      <div>
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
      {patients[id].entries.length !== 0 && <h2>Entries</h2>}
      {patients[id].entries.map((e) => (
        <EntryDetail key={e.id} entry={e} />
      ))}
      <AddEntryModal modalOpen={modalOpen} onSubmit={submitNewEntry} error={error} onClose={closeModal} />
    </div>
  ) : (
    <>Loading...</>
  );
};

export default PatientDetail;
