import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunkACurrentReviews } from '../../store/reviewsReducer';
import OpenModalButton from '../OpenModalButton'
