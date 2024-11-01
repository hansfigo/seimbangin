import { check } from "express-validator";

const validate = {
    register: [
        check("first_name").isString(),
        check("last_name").isString(),
        check("username").isString(),
        check("email").isEmail(),
        check("age").isNumeric(),
        check("password").isLength({ min: 3 }),
    ],
    login: [
        check("email").isEmail(),
        check("password").isLength({ min: 3 }),
    ],
}

export default validate;
