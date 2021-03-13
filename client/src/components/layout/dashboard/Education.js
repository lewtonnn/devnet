import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../../actions/profile';

const Education = ({ education }) => {

  const dispatch = useDispatch();

  const educations = education.map(edu => {
    return (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td className="hide-sm">{edu.degree}</td>
          <td className="hide-sm">
            <Moment format="DD/MM/YYYY">{edu.from}</Moment> -
            {edu.to === null
                ? (' Now')
                : <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            }
          </td>
          <td>
            <button className="btn btn-danger"
                    onClick={() => dispatch(deleteEducation(edu._id))}> Delete
            </button>
          </td>
        </tr>
    );
  });

  return (
      <Fragment>
        <h2 className="my-2">Education Credentials</h2>
        <table className="table">
          <thead>
          <th>School</th>
          <th className="hide-sm">Degree</th>
          <th className="hide-sm">Years</th>
          <th/>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

export default Education;
