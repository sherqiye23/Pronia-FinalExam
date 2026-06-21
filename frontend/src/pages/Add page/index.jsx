import Helmet from 'react-helmet'
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDeletePlantMutation, useGetAllPlantQuery, usePostPlantMutation } from '../../rtk query/slice';
import swal from 'sweetalert';
import { RiDeleteBinLine } from "react-icons/ri";

let validationSchema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required().positive(),
    image: yup.string().url().required()
});


export default function AddPage() {
    let { data, isLoading, refetch } = useGetAllPlantQuery()
    let [postPlant] = usePostPlantMutation()
    let [deletePlant] = useDeletePlantMutation()

    const handleDelete = async (item) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this plant?",
            icon: "warning",
            dangerMode: true,
        })
            .then(async willDelete => {
                if (willDelete) {
                    await deletePlant(item._id)
                    refetch()
                    swal("Deleted!", `Deleted ${item.name}`, "success");
                }
            });
    }

    return (
        <>
            <Helmet>
                <title>Add Page - Pronia</title>
            </Helmet>
            <div className='add-wrapper'>
                {
                    isLoading ? (
                        <div className="is-loading">
                            <h1>...Loading</h1>
                        </div>
                    ) : (
                        <div className="container">
                            <div className="form-wrapper">
                                <h1>Add Form</h1>
                                <Formik
                                    initialValues={{ name: '', price: '', image: '' }}
                                    validationSchema={validationSchema}
                                    onSubmit={async (values) => {
                                        console.log(values);
                                        await postPlant(values)
                                        refetch()
                                        swal("Success", `Add ${values.name}`, "success");
                                        values.name = ''
                                        values.price = ''
                                        values.image = ''
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className='add-form'>
                                            <Field type="text" name="name" className="field" placeholder="...enter name" />
                                            <ErrorMessage name="name" component="div" />
                                            <Field type="number" name="price" className="field" placeholder="...enter price" />
                                            <ErrorMessage name="price" component="div" />
                                            <Field type="text" name="image" className="field" placeholder="...enter image" />
                                            <ErrorMessage name="image" component="div" />
                                            <button type="submit" disabled={isSubmitting}>
                                                Submit
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <div className="table-wrapper">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Id</td>
                                            <td>Image</td>
                                            <td>Name</td>
                                            <td>Price</td>
                                            <td>Delete</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data ? (
                                                data.length ? (
                                                    data.map((item) => (
                                                        <tr key={item._id}>
                                                            <td>{item._id}</td>
                                                            <td><img src={item.image} alt="." width={"100px"} height={"100px"} /></td>
                                                            <td>{item.name}</td>
                                                            <td>${item.price}</td>
                                                            <td><span onClick={() => handleDelete(item)}><RiDeleteBinLine /></span></td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <h1 style={{ margin: "20px" }}>Datada məlumat yoxdur!</h1>
                                                )
                                            ) : (
                                                <h1 style={{ margin: "20px" }}>Data not found!</h1>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
