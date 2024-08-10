import React from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Ecomm from "$api/Ecomm";
import * as Yup from "yup";
import NavBar from "$components/NavBar";

const initialValues = { userName: "" };

const onSubmit = (values) => {
  Ecomm.post("/forgotPassword", { email: values.userName })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  console.log("Form Data", values);
};

const validationSchema = Yup.object({
  userName: Yup.string().email("Invalid Email Format").required("Required!"),
});

function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="flex flex-col min-h-screen bg-gradient-to-tr from-violet-100 to-pink-100">
          <div className="flex-grow flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
              <div className="bg-white rounded-3xl border-2 border-gray-200 overflow-hidden shadow-lg">
                <div className="animated-bg text-white pt-6 pb-2 text-center">
                  <h1 className="text-4xl font-bold">Forgot Password ?</h1>
                  <p className="text-center text-md py-4">
                    Enter registered mail for reset link
                  </p>
                </div>

                <div className="bg-gray-50 px-8 mt-8">
                  <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div className="form-control flex flex-col">
                      <label className="text-base font-semibold">Email:</label>
                      <input
                        name="userName"
                        type="email"
                        className={`py-2 rounded-md border-2 ${
                          formik.touched.userName && formik.errors.userName
                            ? "border-2 border-rose-500"
                            : "border-gray-200"
                        }`}
                        {...formik.getFieldProps("userName")}
                      />
                      {formik.touched.userName && formik.errors.userName && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.userName}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 py-4">
                      <button
                        type="submit"
                        className="w-full drop-shadow-lg active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-gradient-to-tr from-violet-400 to-pink-400 text-white text-lg font-bold"
                      >
                        Send Link
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default ForgotPassword;
