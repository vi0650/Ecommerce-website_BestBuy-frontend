import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { clearMessage, setSuccess } from "../../store/reducers/globalReducer";
import {
  useGetQuery,
  useDeleteCategoryMutation,
} from "../../store/services/categoryService";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AlertTitle from "@mui/material/AlertTitle";
import { DeleteOutlined } from "@ant-design/icons";
import IconButton from '@mui/material/IconButton';

const Categories = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { success } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const { data = [], isFetching } = useGetQuery(page);
  const [removeCategory, response] = useDeleteCategoryMutation();
  console.log(data);
  const deleteCat = (id) => {
    if (window.confirm("Are you really want to delete the category?")) {
      removeCategory(id);
    }
  };
  useEffect(() => {
    if (response.isSuccess) {
      dispatch(setSuccess(response?.data?.message));
    }
  }, [response?.data?.message]);
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, []);
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-category" className="btn-dark">
          add categories <i className="bi bi-plus"></i>
        </Link>
      </ScreenHeader>
      {success && (
        <Stack sx={{ width: "30%" }} spacing={2}>
          <Alert severity="success" onClose={() => {}}>
            <AlertTitle>Success</AlertTitle>
            {success} — <strong>check it out!</strong>
          </Alert>
        </Stack>
      )}

      {!isFetching ? (
        data?.categories?.length > 0 && (
          <>
            <div className="mt-10">
              <table className="w-full bg-gray-900 rounded-md">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 uppercase text-md font-medium text-gray-300">
                      name
                    </th>
                    <th className="p-3 uppercase text-md font-medium text-gray-300">
                      edit
                    </th>
                    <th className="p-3 uppercase text-md font-medium text-gray-300">
                      delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.categories?.map((category) => (
                    <tr key={category._id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {category.name}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <Link
                          to={`/dashboard/update-category/${category._id}`}
                          className="btn btn-warning"
                        >
                          edit
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteCat(category._id)}
                        >
                          Delete
                          {/* <DeleteFilled/> */}
                        </button>
                       
                          {/* <IconButton
                            aria-label="delete"
                            size="large"
                            className="btn"
                            onClick={() => deleteCat(category._id)}
                          >
                            <DeleteOutlined fontSize="inherit" />
                          </IconButton> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/categories"
            />
          </>
        )
      ) : (
        <Spinner className="mt-20" />
      )}
    </Wrapper>
  );
};
export default Categories;
