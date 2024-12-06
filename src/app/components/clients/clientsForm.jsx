"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

const ClientForm = ({ onSubmit, initialValues}) => {
    const formik = useFormik({
        initialValues: initialValues ||{
            name: "",
            cif: "",
            street: "",
            number: "",
            postal: "",
            city: "",
            province: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("El nombre del cliente es obligatorio"),
            cif: Yup.string().required("El CIF es obligatorio"),
            street: Yup.string().required("La calle es obligatoria"),
            number: Yup.string().required("El número es obligatorio"),
            postal: Yup.string().required("El código postal es obligatorio"),
            city: Yup.string().required("La ciudad es obligatoria"),
            province: Yup.string().required("La provincia es obligatoria"),
        }),
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block font-medium text-gray-700"
                    >
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
                    />
                    {formik.errors.name && formik.touched.name && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.name}
                        </div>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="cif"
                        className="block font-medium text-gray-700"
                    >
                        CIF
                    </label>
                    <input
                        type="text"
                        name="cif"
                        id="cif"
                        value={formik.values.cif}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
                    />
                    {formik.errors.cif && formik.touched.cif && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.cif}
                        </div>
                    )}
                </div>

                {/* Repite para los demás campos */}
                <div>
                    <label
                        htmlFor="street"
                        className="block font-medium text-gray-700"
                    >
                        Calle
                    </label>
                    <input
                        type="text"
                        name="street"
                        id="street"
                        value={formik.values.street}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
                    />
                    {formik.errors.street && formik.touched.street && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.street}
                        </div>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="number"
                        className="block font-medium text-gray-700"
                    >
                        Número
                    </label>
                    <input
                        type="text"
                        name="number"
                        id="number"
                        value={formik.values.number}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
                    />
                    {formik.errors.number && formik.touched.number && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.number}
                        </div>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="postal"
                        className="block font-medium text-gray-700"
                    >
                        Código Postal
                    </label>
                    <input
                        type="text"
                        name="postal"
                        id="postal"
                        value={formik.values.postal}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
                    />
                    {formik.errors.postal && formik.touched.postal && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.postal}
                        </div>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="city"
                        className="block font-medium text-gray-700"
                    >
                        Ciudad
                    </label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
                    />
                    {formik.errors.city && formik.touched.city && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.city}
                        </div>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="province"
                        className="block font-medium text-gray-700"
                    >
                        Provincia
                    </label>
                    <input
                        type="text"
                        name="province"
                        id="province"
                        value={formik.values.province}
                        onChange={formik.handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-700"
                    />
                    {formik.errors.province && formik.touched.province && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.province}
                        </div>
                    )}
                </div>
            </div>
            <button
                type="submit"
                className="mt-4 py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
                Guardar Cliente
            </button>
        </form>
    );
};

export default ClientForm;
