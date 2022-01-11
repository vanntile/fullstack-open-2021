import React from 'react';
import { Card, Icon, SemanticCOLORS } from 'semantic-ui-react';
import { Entry } from '../types';

interface Props {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const hearts: SemanticCOLORS[] = ['green', 'yellow', 'orange', 'red'];

const EntryDetail: React.FC<Props> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="hospital" />
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Card.Description>
              {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              )}
            </Card.Description>
            <Card.Description>
              {entry.discharge && (
                <div>
                  Discharge: {entry.discharge.date} {entry.discharge.criteria}
                </div>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      );
    case 'OccupationalHealthcare':
      return (
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="hospital" /> {entry.employerName}
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Card.Description>
              {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              )}
            </Card.Description>
            <Card.Description>
              {entry.sickLeave && (
                <div>
                  Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                </div>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      );
    case 'HealthCheck':
      return (
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              {entry.date} <Icon name="hospital" /> <Icon name="heart" color={hearts[entry.healthCheckRating]} />
            </Card.Header>
            <Card.Meta>{entry.description}</Card.Meta>
            <Card.Description>
              {entry.diagnosisCodes && (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
                </ul>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetail;
