/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import styled from 'styled-components'
import axios from "axios";
import { login } from '../../utils/apiRoutes'
import useToast from 'hooks/useToast'

export default function UserList({users, showMessages, searchUsers, setLogin}) {
    const [keyword, setKeyword] = useState("");
    const [password, setPassword] = useState("");
    const [show_login, showLogin] = useState(false);
    const { toastSuccess, toastError } = useToast();

    useEffect(() => {
        if(!localStorage.getItem('chat-app-user')) {
            showLogin(true);
            setLogin(false);
        } else {
            setLogin(true);
        }
    }, );

    const getMessages = (e, user)=>{
        e.preventDefault();
        showLogin(true);
        showMessages(user);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(show_login) {
                loginAction();
            } else {
                searchUsers(keyword); 
            }
        }
    };

    const convertAddress = (address) => {
        return '0x'+address.slice(2, 6)+'....'+address.slice(-4)
    }

    const loginAction = () => {
        const loginServer = async () => {
            if (password) {
                const response = await axios.post(login, {
                  password: password
                });
                if(response.data.status) {
                    toastSuccess('You are logined now');
                    showLogin(false);
                    setLogin(true);
                    localStorage.setItem('chat-app-user', true);
                    setKeyword("");
                    setPassword("");
                } else {
                    toastError('Error', 'Login information is incrorrect!')
                }
            } else {
                toastError('Error', 'Password is required!')
            }
        }
        loginServer()
    }


    return (
        <Container> 
        <MDBRow>
            <MDBCol md="12">
                <MDBCard id="chat3" style={{ borderRadius: "15px" }}>
                    <MDBCardBody className="p-3">
                    <MDBRow>
                        <MDBCol className="mb-4 mb-md-0">
                            {
                                show_login ?
                                <div className="p-1">
                                    <MDBInputGroup className="rounded mb-3">
                                        <input
                                            className="form-control rounded"
                                            type="password"
                                            value={password} 
                                            onChange={(e)=>{e.preventDefault(); setPassword(e.target.value);}}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Please input the Password"
                                            style={{borderColor: 'red'}}
                                            autoFocus 
                                        />
                                        <button
                                            className="input-group-text rounded"
                                            style={{marginLeft: "10px", background: "red", color: "white"}}
                                            id="login-addon"
                                            onClick={loginAction}
                                        >
                                            login
                                        </button>
                                    </MDBInputGroup>
                                </div>
                                : 
                                <div className="p-1">
                                    <MDBInputGroup className="rounded mb-3">
                                        <input
                                            type="text"
                                            className="form-control rounded"
                                            value={keyword} 
                                            onChange={(e)=>{e.preventDefault(); setKeyword(e.target.value);}}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Search"
                                            autoFocus 
                                        />
                                        <span
                                            id="search-addon"
                                            className="input-group-text border-0"
                                            onClick={(e)=>{e.preventDefault(); searchUsers(keyword);}}
                                        >
                                            <MDBIcon fas icon="search" />
                                        </span>
                                    </MDBInputGroup>        
                                    <MDBTypography listUnStyled className="mb-0">
                                        {
                                            users && users.map((user, index) => {
                                                if(user && user.username) {
                                                    return (
                                                        <li className="p-2 border-bottom" key={index} onClick={(e) => getMessages(e, user)}>
                                                        <a
                                                            href="#"
                                                            className="d-flex justify-content-between user-item"
                                                        >
                                                            <div className="d-flex flex-row col-md-10">
                                                                <div className="col-md-2">
                                                                    <img
                                                                    src="/images/user2.png"
                                                                    alt="avatar"
                                                                    className="d-flex align-self-center me-3"
                                                                    width="60"
                                                                    height="60"
                                                                    />
                                                                    <span className="badge bg-success badge-dot"></span>
                                                                </div>
                                                                <div className="pt-1 col-md-10" style={{marginLeft: '15px'}}>
                                                                    <p className="fw-bold mb-0 ellipsis">{convertAddress(user.username)}</p>
                                                                    <p className="small text-muted ellipsis"></p>
                                                                </div>
                                                            </div>
                                                            <div className="pt-1 col-md-2">
                                                                <span className="badge bg-danger rounded-pill float-end">
                                                                    {user.count >0 ? 
                                                                    `+ ${user.count}` : user.total && user.total }
                                                                </span>
                                                            </div>
                                                        </a>
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </MDBTypography>
                                </div>   
                            }                                              
                        </MDBCol>
                    </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow> 
        </Container>
    );
}

const Container = styled.div`
    .ellipsis {
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .user-item:hover {
        color: red !important;
    }
`;