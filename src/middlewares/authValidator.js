import { body } from 'express-validator';

export const registerUserValidations = [
    body('firstname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long')
        .matches(/^[a-z]+(\s[a-z]+)?$/i)
        .withMessage('Name must only contain letters and a single space between words'),
    body('lastname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Lastname is required')
        .isLength({ min: 3 })
        .withMessage('Lastname must be at least 3 characters long')
        .matches(/^[a-z]+(\s[a-z]+)?$/i)
        .withMessage('Lastname must only contain letters and a single space between words'),
    body('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('Username must only contain letters'),
    body('birthdate')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Birthdate is required')
        .isDate()
        .withMessage('Please enter a valid date')
        .custom((value) => {
            const birthdate = new Date(value);
            const ageDiffMs = Date.now() - birthdate.getTime();
            const ageDate = new Date(ageDiffMs);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
            return age >= 13;
        })
        .withMessage('You must be at least 13 years old to register'),
    body('phone')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Phone is required')
        .isNumeric()
        .withMessage('Phone must be a number')
        .isLength({ min: 10, max: 10 })
        .withMessage('Phone must be 10 characters long'),
    body('email')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .normalizeEmail()
        .isEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter and one number')
        .not()
        .contains(' ')
        .withMessage('Password must not contain spaces'),
]