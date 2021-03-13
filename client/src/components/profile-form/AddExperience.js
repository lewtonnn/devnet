import React, { Fragment, useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = () => {

  const dispatch = useDispatch();

  const history = useHistory();

  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [currentExperience, setCurrentExperience] = useState(false);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onCurrentExperienceChange = () => {
    setFormData({
      ...formData,
      current: !formData.current,
    });
    setCurrentExperience(!formData.current);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(addExperience(formData, history));
  };

  return (
      <Fragment>
        <h1 className="large text-primary">
          Add An Experience
        </h1>
        <p className="lead">
          <i className="fas fa-code-branch"/> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="* Job Title" name="title"
                   value={formData.title} onChange={e => onChange(e)} required/>
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Company" name="company"
                   value={formData.company} onChange={e => onChange(e)}
                   required/>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Location" name="location"
                   value={formData.location} onChange={e => onChange(e)}/>
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from"
                   value={formData.from} onChange={e => onChange(e)}/>
          </div>
          <div className="form-group">
            <label><input type="checkbox" name="current"
                          value={formData.current}
                          checked={formData.current}
                          onChange={e => onCurrentExperienceChange(e)}
            /> Current Job</label>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to"
                   value={formData.to} onChange={e => onChange(e)}
                   disabled={currentExperience}
            />
          </div>
          <div className="form-group">
          <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={formData.description} onChange={e => onChange(e)}
          />
          </div>
          <input type="submit" className="btn btn-primary my-1"/>
          <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
        </form>
      </Fragment>
  );
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default AddExperience;