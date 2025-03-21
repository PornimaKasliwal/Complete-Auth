import { useFormik } from 'formik'
import *as yup from 'yup'
import handeleClasses from './share/handleClasses'
import { useState } from 'react'
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../redux/apis/todo.api'

const Dashboard = () => {

    const { data } = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    const [selectedTodo, setSelectedTodo] = useState()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            task: selectedTodo ? selectedTodo.task : "",
            desc: selectedTodo ? selectedTodo.desc : "",
            priority: selectedTodo ? selectedTodo.priority : "",
        },
        validationSchema: yup.object({
            task: yup.string().required("Enter Name"),
            desc: yup.string().required("Enter Name"),
            priority: yup.string().required("Enter Name"),
        }),
        onSubmit: (values, { resetForm }) => {
            if (selectedTodo) {
                // update
                updateTodo({ ...values, _id: selectedTodo._id })
                setSelectedTodo(null)
            } else {
                // create
                addTodo(values)
            }
            resetForm()
        }
    })
    return <div className='container'>
        <form onSubmit={formik.handleSubmit} >
            <div>
                <input type="text" {...formik.getFieldProps("task")} className={handeleClasses(formik, "task")} />
                <span className='invalid-feedback'>{formik.errors.task}</span>
                <span className='valid-feedback'>thank you</span>
            </div>

            <div>
                <input type="text" {...formik.getFieldProps("desc")} className={handeleClasses(formik, "desc")} />
                <span className='invalid-feedback'>{formik.errors.desc}</span>
                <span className='valid-feedback'>thank you</span>
            </div>

            <div>
                <select {...formik.getFieldProps("priority")} className={handeleClasses(formik, "priority")}>
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                </select>
                <span className='invalid-feedback'>{formik.errors.priority}</span>
                <span className='valid-feedback'>thank you</span>
            </div>
            {
                selectedTodo
                    ? <button type='submit' class="btn btn-warning w-100">Update Todo</button>
                    : <button type='submit' class="btn btn-primary w-100">Add Todo</button>
            }
        </form>
        {
            data && <table class="table table-dark ">
                <thead>
                    <tr>
                        <th>task</th>
                        <th>desc</th>
                        <th>priority</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.result.map(item => <tr key={item._id}>
                            <td>{item.task}</td>
                            <td>{item.desc}</td>
                            <td>{item.priority}</td>
                            <td>
                                <buttone onClick={e => setSelectedTodo(item)} className='btn btn-sm btn-outline-warning'>Edit</buttone>
                                <buttone onClick={e => deleteTodo(item._id)} className='btn btn-sm btn-outline-danger'>Delete</buttone>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        }
    </div>
}

export default Dashboard