import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import lock from "../assets/icons/lock.svg";
import { FaRegTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { registerUser, clearErrors, updateUser } from "../redux/action/users";
import SmallLoader from "../components/SmallLoader";
import { REGISTER_USER_RESET } from "../redux/type/users";
import Checkbox from "../components/Checkbox";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";

const Register = ({ editData, register, setRegister }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { userLoading, userError, success } = useSelector(
    (state) => state.users
  );

  const [fields, setFields] = useState([
    {
      title: "Personal information:",
      name: "personalInformation",
      fields: [
        {
          label: "Title",
          name: "title",
          type: "checkbox",
          options: ["Mr", "Mrs", "Ms"],
        },
        {
          label: "First Name",
          type: "text",
          name: "firstName",
        },
        {
          label: "Last Name",
          type: "text",
          name: "lastName",
        },
        {
          label: "Date Of Birth",
          type: "date",
          name: "dateOfBirth",
        },
        {
          label: "Place Of Birth",
          type: "text",
          name: "placeOfBirth",
        },
        {
          label: "Sex",
          name: "sex",
          type: "checkbox",
          options: ["Male", "Female"],
        },
        {
          label: "Status",
          name: "status",
          type: "checkbox",
          options: ["Single", "Married", "Window (er)", "Divorced"],
        },
        {
          label: "Email",
          type: "text",
          name: "email",
        },
        {
          label: "Phone number",
          type: "number",
          name: "phone",
        },
        {
          label: "Password",
          name: "password",
        },
        {
          label: "Confirm Password",
          name: "cpassword",
        },
      ],
    },
    {
      title: "Spouse:",
      name: "spouse",
      fields: [
        {
          label: "Name",
          type: "text",
          name: "name",
        },
        {
          label: "Date Of Birth",
          type: "date",
          name: "dateOfBirth",
        },
        {
          label: "Email",
          type: "text",
          name: "email",
        },
        {
          label: "Phone number",
          type: "number",
          name: "phone",
        },
      ],
    },
    {
      title: "Emergency Contact:",
      name: "emergencyContact",
      fields: [
        {
          label: "Name",
          type: "text",
          name: "name",
        },
        {
          label: "Date Of Birth",
          type: "date",
          name: "dateOfBirth",
        },
        {
          label: "Email",
          type: "text",
          name: "email",
        },
        {
          label: "Phone number",
          type: "number",
          name: "phone",
        },
      ],
    },
    {
      title: "Education:",
      name: "education",
      fields: [
        {
          label: "University",
          type: "text",
          name: "university",
        },
        {
          label: "Title",
          type: "text",
          name: "title",
        },
        {
          label: "Date of Graduation",
          type: "date",
          name: "dateOfGraduation",
        },
      ],
    },
    {
      title: "Position:",
      name: "position",
      fields: [
        {
          label: "Role",
          name: "role",
          type: "checkbox",
          options: ["Employee", "Logistic", "Executive"],
        },
        {
          label: "Contract entry date",
          type: "date",
          name: "contractEntryDate",
        },
        {
          label: "Contract end date",
          type: "date",
          name: "contractEndDate",
        },
      ],
    },
    {
      title: "Beneficiary:",
      name: "beneficiary",
      fields: [
        {
          label: "Last Name",
          type: "text",
          name: "lastName",
        },
        {
          label: "First Name",
          type: "text",
          name: "firstName",
        },
        {
          label: "Date Of Birth",
          type: "date",
          name: "dateOfBirth",
        },
        {
          label: "Email",
          type: "text",
          name: "email",
        },
        {
          label: "Phone number",
          type: "number",
          name: "phone",
        },
      ],
    },
  ]);
  const [benificiary, setBenificiary] = useState([]);
  const [registerHandle, setRegisterHandle] = useState({
    personalInformation: {
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      placeOfBirth: "",
      sex: "",
      status: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
    spouse: {
      name: "",
      dateOfBirth: "",
      email: "",
      phone: "",
    },
    emergencyContact: {
      name: "",
      dateOfBirth: "",
      email: "",
      phone: "",
    },
    education: {
      university: "",
      title: "",
      dateOfGraduation: "",
    },
    position: {
      role: "",
      contractEntryDate: "",
      contractEndDate: "",
    },
    beneficiary: {
      lastName: "",
      firstName: "",
      dateOfBirth: "",
      email: "",
      phone: "",
    },
  });

  const handleChange = (name, e) => {
    setRegisterHandle({
      ...registerHandle,
      [name]: {
        ...registerHandle[name],
        [e.target.name]: e.target.value,
      },
    });
  };

  const validate = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        const result = validate(obj[key]);
        if (result === false) {
          return false;
        }
      } else if (obj[key] === "") {
        return false;
      }
    }
    return true;
  };

  const addBenificiary = (data) => {
    const result = validate(data);

    if (result) {
      setBenificiary([...benificiary, data]);

      setRegisterHandle({
        ...registerHandle,
        beneficiary: {
          lastName: "",
          firstName: "",
          dateOfBirth: "",
          email: "",
          phone: "",
        },
      });
    } else {
      alert.error("Fill out the Benificiary");
    }
  };

  const deleteBenificiary = (data) => {
    const filteredArray = benificiary.filter((obj) => obj !== data);
    setBenificiary(filteredArray);
  };

  const editBenificiary = (data) => {
    const { lastName, firstName, dateOfBirth, email, phone } = data;

    setRegisterHandle({
      ...registerHandle,
      beneficiary: {
        lastName,
        firstName,
        dateOfBirth,
        email,
        phone,
      },
    });

    const filteredArray = benificiary.filter((obj) => obj !== data);
    setBenificiary(filteredArray);
  };

  const submit = (e) => {
    e.preventDefault();
    const {
      education,
      emergencyContact,
      personalInformation,
      position,
      spouse,
    } = registerHandle;

    const result = validate({
      education,
      emergencyContact,
      personalInformation,
      position,
      spouse,
    });

    const registerHandleObjectToSave = {
      ...registerHandle,
      beneficiary: benificiary,
    };

    if (editData) {
      dispatch(updateUser(registerHandleObjectToSave, editData._id, true));
    } else {
      if (result) {
        const { password, cpassword } = registerHandle.personalInformation;
        if (password && cpassword && password !== cpassword) {
          alert.error("Password doesn't match");
          return;
        }
        delete registerHandle.personalInformation.cpassword;

        dispatch(registerUser(registerHandleObjectToSave));
      } else {
        alert.error("All Fields are required");
      }
    }
  };

  useEffect(() => {
    if (userError) {
      alert.error(userError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("User created!");
      dispatch({ type: REGISTER_USER_RESET });
      setRegisterHandle({
        personalInformation: {
          title: "",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          placeOfBirth: "",
          sex: "",
          status: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
        },
        spouse: {
          name: "",
          dateOfBirth: "",
          email: "",
          phone: "",
        },
        emergencyContact: {
          name: "",
          dateOfBirth: "",
          email: "",
          phone: "",
        },
        education: {
          university: "",
          title: "",
          dateOfGraduation: "",
        },
        position: {
          role: "",
          contractEntryDate: "",
          contractEndDate: "",
        },
        beneficiary: {
          lastName: "",
          firstName: "",
          dateOfBirth: "",
          email: "",
          phone: "",
        },
      });
      setRegister(false);
      setBenificiary([]);
    }

    if (editData) {
      setFields([
        {
          title: "Personal information:",
          name: "personalInformation",
          fields: [
            {
              label: "Title",
              name: "title",
              type: "checkbox",
              options: ["Mr", "Mrs", "Ms"],
            },
            {
              label: "First Name",
              type: "text",
              name: "firstName",
            },
            {
              label: "Last Name",
              type: "text",
              name: "lastName",
            },
            {
              label: "Date Of Birth",
              type: "date",
              name: "dateOfBirth",
            },
            {
              label: "Place Of Birth",
              type: "text",
              name: "placeOfBirth",
            },
            {
              label: "Sex",
              name: "sex",
              type: "checkbox",
              options: ["Male", "Female"],
            },
            {
              label: "Status",
              name: "status",
              type: "checkbox",
              options: ["Single", "Married", "Window (er)", "Divorced"],
            },
            {
              label: "Email",
              type: "text",
              name: "email",
            },
            {
              label: "Phone number",
              type: "number",
              name: "phone",
            },
          ],
        },
        {
          title: "Spouse:",
          name: "spouse",
          fields: [
            {
              label: "Name",
              type: "text",
              name: "name",
            },
            {
              label: "Date Of Birth",
              type: "date",
              name: "dateOfBirth",
            },
            {
              label: "Email",
              type: "text",
              name: "email",
            },
            {
              label: "Phone number",
              type: "number",
              name: "phone",
            },
          ],
        },
        {
          title: "Emergency Contact:",
          name: "emergencyContact",
          fields: [
            {
              label: "Name",
              type: "text",
              name: "name",
            },
            {
              label: "Date Of Birth",
              type: "date",
              name: "dateOfBirth",
            },
            {
              label: "Email",
              type: "text",
              name: "email",
            },
            {
              label: "Phone number",
              type: "number",
              name: "phone",
            },
          ],
        },
        {
          title: "Education:",
          name: "education",
          fields: [
            {
              label: "University",
              type: "text",
              name: "university",
            },
            {
              label: "Title",
              type: "text",
              name: "title",
            },
            {
              label: "Date of Graduation",
              type: "date",
              name: "dateOfGraduation",
            },
          ],
        },
        {
          title: "Position:",
          name: "position",
          fields: [
            {
              label: "Contract entry date",
              type: "date",
              name: "contractEntryDate",
            },
            {
              label: "Contract end date",
              type: "date",
              name: "contractEndDate",
            },
          ],
        },
        {
          title: "Beneficiary:",
          name: "beneficiary",
          fields: [
            {
              label: "Last Name",
              type: "text",
              name: "lastName",
            },
            {
              label: "First Name",
              type: "text",
              name: "firstName",
            },
            {
              label: "Date Of Birth",
              type: "date",
              name: "dateOfBirth",
            },
            {
              label: "Email",
              type: "text",
              name: "email",
            },
            {
              label: "Phone number",
              type: "number",
              name: "phone",
            },
          ],
        },
      ]);

      function convertDateValues(obj) {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] instanceof Object) {
              convertDateValues(obj[key]);
            } else {
              if (
                key.toLowerCase().includes("date") &&
                typeof obj[key] === "string"
              ) {
                obj[key] = new Date(obj[key]).toISOString().slice(0, 10);
              }
            }
          }
        }
        return obj;
      }

      setRegisterHandle(convertDateValues(editData));
      setBenificiary(editData.beneficiary);
    }
  }, [dispatch, alert, success, userError, editData]);

  return (
    <div
      style={{ transform: (register && "scale(1)") || "scale(0)" }}
      className="register_container"
    >
      <div className="inner_register_container">
        <button
          onClick={() => setRegister(false)}
          className="cross bg-transparent border-0 p-0"
        >
          <FaRegTimesCircle />
        </button>

        <h2 className="text-center color2">
          {(editData && "Edit") || "Create"} a User
        </h2>

        <form onSubmit={submit} className="form_container pt-3">
          <div className="container-fluid">
            <div className="row gy-4">
              {fields.map((content, i) => (
                <div
                  key={content.name}
                  className="col-12 border border-light border-2 py-3 rounded-3"
                >
                  <h5 className="color2 mb-4">{content.title}</h5>
                  <div className="row gy-3">
                    {content.fields.map((content2) => {
                      if (content2.type === "checkbox") {
                        return (
                          <div
                            key={`${content.name}-${content2.name}`}
                            className="col-12"
                          >
                            <Checkbox
                              title={content2.label}
                              name={content2.name}
                              options={content2.options}
                              state={
                                registerHandle[content.name][content2.name]
                              }
                              onchange={(e) => handleChange(content.name, e)}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={`${content.name}-${content2.name}`}
                            className="col-12"
                          >
                            <Input
                              label={content2.label}
                              icon={
                                content2.label === "Password" ||
                                content2.label === "Confirm Password"
                                  ? lock
                                  : ""
                              }
                              type={content2.type}
                              name={content2.name}
                              value={
                                registerHandle[content.name][content2.name]
                              }
                              onChange={(e) => handleChange(content.name, e)}
                            />
                          </div>
                        );
                      }
                    })}

                    {fields.length - 1 === i && (
                      <div className="col-12">
                        <div
                          onClick={() =>
                            addBenificiary({
                              lastName: registerHandle.beneficiary.lastName,
                              firstName: registerHandle.beneficiary.firstName,
                              dateOfBirth:
                                registerHandle.beneficiary.dateOfBirth,
                              email: registerHandle.beneficiary.email,
                              phone: registerHandle.beneficiary.phone,
                            })
                          }
                          className="rounded-3 btn-lg bg_color2 rounded-3 border-0 f18 w-100 text-center color1 py-1 fw-bold pointer"
                        >
                          Add
                        </div>
                      </div>
                    )}

                    {(fields.length - 1 === i &&
                      benificiary.length &&
                      benificiary.map((benificiaryContent) => {
                        const {
                          lastName,
                          firstName,
                          dateOfBirth,
                          email,
                          phone,
                        } = benificiaryContent;
                        return (
                          <div className="d-flex justify-content-between bg_Color1 text-white">
                            <div>
                              <p>
                                {firstName} {lastName} | {dateOfBirth}
                              </p>
                              <p>{email}</p>
                              <p>{phone}</p>
                            </div>
                            <div className="align-self-end">
                              <div
                                onClick={() =>
                                  editBenificiary(benificiaryContent)
                                }
                                className="border-0 bg-transparent pointer"
                              >
                                <BiEdit
                                  className="text-warning"
                                  fontSize={24}
                                />
                              </div>
                              <div
                                onClick={() =>
                                  deleteBenificiary(benificiaryContent)
                                }
                                className="border-0 bg-transparent pointer"
                              >
                                <RiDeleteBin2Fill
                                  className="text-danger"
                                  fontSize={24}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })) ||
                      ""}
                  </div>
                </div>
              ))}

              <div className="col-12 pb-4">
                <button
                  disabled={(userLoading && true) || false}
                  type="submit"
                  className="rounded-3 btn-lg bg_color2 rounded-3 border-0 f18 w-100 text-center color1 py-2 fw-bold"
                >
                  {(userLoading && <SmallLoader />) || "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
