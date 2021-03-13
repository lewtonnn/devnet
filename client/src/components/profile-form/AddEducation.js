import React, { Fragment, useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = () => {

  const dispatch = useDispatch();

  const history = useHistory();

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [currentEducation, setCurrentEducation] = useState(false);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onCurrentEducationChange = e => {
    setFormData({
      ...formData,
      current: !formData.current,
    });
    setCurrentEducation(!formData.current);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(addEducation(formData, history));
  };

  return (
      <Fragment>
        <h1 className="large text-primary">
          Add Your Education
        </h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"/> Add any school, bootcamp,
          etc that you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
                type="text"
                placeholder="* School or Bootcamp"
                name="school"
                value={formData.school}
                onChange={e => onChange(e)}
                required
            />
          </div>
          <div className="form-group">
            <input
                type="text"
                placeholder="* Degree or Certificate"
                name="degree"
                value={formData.degree}
                onChange={e => onChange(e)}
                required
            />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Field Of Study"
                   value={formData.fieldofstudy}
                   onChange={e => onChange(e)}
                   name="fieldofstudy"/>
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from"
                   value={formData.from}
                   onChange={e => onChange(e)}/>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" name="current"
                     value={formData.current}
                     checked={currentEducation}
                     onChange={e => onCurrentEducationChange(e)}/> Current
              School or
              Bootcamp
            </label>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to"
                   value={formData.to}
                   disabled={currentEducation}
                   onChange={e => onChange(e)}/>
          </div>
          <div className="form-group">
          <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value={formData.description}
              onChange={e => onChange(e)}
          />
          </div>
          <input type="submit" className="btn btn-primary my-1"/>
          <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
        </form>
      </Fragment>
  );
}

export default AddEducation;