const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../../middlewares/auth');
const User = require('../../../models/User');
const Profile = require('../../../models/Profile');
const { check, validationResult } = require('express-validator');

router.get('/me', auth, async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar']);
    if (!userProfile) {
      return res.status(400).json({
        errors: [{ msg: 'No profile for this user' }],
      });
    }
    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [{ msg: 'Server error' }],
    });
  }
});

router.post('/', [
  auth,
  [
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
  ],
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const profileFields = {};
  profileFields.social = {};
  profileFields.user = req.user.id;

  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;
  if (req.body.skills) {
    profileFields.skills = req.body.skills
        .split(',')
        .map((skill) => skill.trim());
  }
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true },
      ).populate('user', ['name', 'avatar']);
      return res.json(profile);
    }
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [{ msg: 'Server error' }],
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [{ msg: 'Server error' }],
    });
  }
});

router.get('/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (profile) return res.json(profile);

    res.status(400).json({
      errors: [{ msg: `No profile for user (ID: ${req.params.user_id})` }],
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({
        errors: [{ msg: `No profile for user (ID: ${req.params.user_id})` }],
      });
    }
    res.status(500).json({
      errors: [{ msg: 'Server error' }],
    });
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.send(`User (ID: ${req.user.id}) deleted`);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [{ msg: 'Server error' }],
    });
  }
});

router.post(
    '/experience',
    [
      auth,
      [
        check('title', 'Title is required').notEmpty(),
        check('company', 'Company is required').notEmpty(),
        check('from', 'From date is required').notEmpty(),
      ],
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
          });
        }

        const newExperience = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExperience);
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          errors: [{ msg: 'Server error' }],
        });
      }
    },
);

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [{ msg: 'Server error' }],
    });
  }
});

router.post(
    '/education',
    [
      auth,
      [
        check('school', 'School is required').notEmpty(),
        check('degree', 'Degree is required').notEmpty(),
        check('fieldofstudy', 'Field of stufy is required').notEmpty(),
        check('from', 'From date is required').notEmpty(),
      ],
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
          });
        }

        const newEducation = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEducation);
        await profile.save();
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          errors: [{ msg: 'Server error' }],
        });
      }
    },
);

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [{ msg: 'Server error' }],
    });
  }
});

router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&`
          + `client_id=${config.get('GITHUB_CLIENT_ID')}&` +
          + `client_secret=${config.get('GITHUB_SECRET')}`,
      method: 'GET',
      headers: { 'User-Agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.log(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      errors: [{ msg: 'Server error' }],
    });
  }
});

module.exports = router;
