const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Bookings = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3)Render that template using tour data from 1)
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' ws://127.0.0.1:*/ https://js.stripe.com/v3/  http://127.0.0.1:8000/bundle.js.map"
    )
    .render('overview', {
      title: 'All Tours',
      tours,
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }
  const connectSrc =
    'https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com ws://127.0.0.1:*/  https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js ';
  res
    .status(200)
    .set('Content-Security-Policy', `connect-src 'self' ${connectSrc}`)
    .render('tour', {
      title: tour.name,
      tour,
    });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com ws://127.0.0.1:*/ http://127.0.0.1:8000/bundle.js.map"
    )
    .render('login', {
      title: 'Log into your account',
    });
});

exports.getSignupForm = catchAsync(async (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com ws://127.0.0.1:*/ http://127.0.0.1:8000/bundle.js.map"
    )
    .render('signup', {
      title: 'Sign Up',
    });
});

exports.getActivate = catchAsync(async (req, res, next) => {
  const { activate } = req.query;
  if (!activate) return next();
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com ws://127.0.0.1:*/ http://127.0.0.1:8000/bundle.js.map"
    )
    .render('activate', {
      title: 'Activate your account',
      jwt: activate,
    });
});

exports.getAccount = catchAsync(async (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com ws://127.0.0.1:*/ http://127.0.0.1:8000/bundle.js.map"
    )
    .render('account', {
      title: 'Your account',
    });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
  //1)Find all bookings
  const bookings = await Bookings.find({ user: req.user.id });
  //2)Find tours with returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com ws://127.0.0.1:*/ http://127.0.0.1:8000/bundle.js.map"
    )
    .render('account', {
      title: 'Your account',
      user: updatedUser,
    });
});
