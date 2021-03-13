import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../../actions/profile';

const Experience = ({ experience }) => {

  const dispatch = useDispatch();

  const experiences = experience.map(exp => {
    return (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td className="hide-sm">{exp.title}</td>
          <td className="hide-sm">
            <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
            {exp.to === null
                ? (' Now')
                : <Moment format="DD/MM/YYYY">{exp.to}</Moment>
            }
          </td>
          <td>
            <button className="btn btn-danger"
                    onClick={() => dispatch(deleteExperience(exp._id))}>Delete
            </button>
          </td>
        </tr>
    );
  });

  return (
      <Fragment>
        <h2 className="my-2">Experience Credentials</h2>
        <table className="table">
          <thead>
          <th>Company</th>
          <th className="hide-sm">Title</th>
          <th className="hide-sm">Years</th>
          <th/>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default Experience;
