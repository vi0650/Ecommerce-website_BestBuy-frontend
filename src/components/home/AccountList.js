import { NavLink } from "react-router-dom"
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";
import {useDispatch} from "react-redux"
import { logout } from "../../store/reducers/authReducer"
const AccountList = () => {
    const dispatch = useDispatch();
  return (
    <>
    <NavLink to="/user" className="account-list">
    <UserOutlined size={22}/> 
    <span className="account-list-title">my account</span>
    </NavLink>
    <NavLink to="/orders" className="account-list">
    <ShoppingCartOutlined size={22}/>
    <span className="account-list-title">orders</span>
    </NavLink>
    <span className="account-list cursor-pointer" onClick={() => dispatch(logout('userToken'))}>
    <LogoutOutlined size={22}/>
    <span className="account-list-title">logout</span>
    </span>
    </>
  )
}

export default AccountList